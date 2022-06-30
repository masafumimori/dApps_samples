//SPDX-License-Identifier: 0BSD
// Copyright Knot, inc.
// Author tomo@knot.inc

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import {PoM} from "./PoM.sol";
import "./libs/Shared.sol";

enum AcceptedCurrency {
        DOT,
        ASTR
    }

    struct Agreement {
        string internalId;
        address client;
        string daoName;
        uint256 startTime;
        uint256 endTime;
        AcceptedCurrency rewardCurrency;
        uint256 rewardAmount;
        bool isCompleted;
        // bool cancelled; will be implemented in the future
    }

contract AgreementContract is Initializable, AccessControlUpgradeable, Shared {
    event CreateAgreement(
        address indexed moderator,
        string internalId,
        uint256 agreementId
    );

    event UpdateAgreement(
        address indexed moderator,
        uint256 indexed agreementId
    );
    event CompleteAgreement(
        address indexed moderator,
        uint256 indexed agreementId
    );
    event CancelAgreement(
        address indexed moderator,
        uint256 indexed agreementId
    );

    PoM private pom;

    // work agreements agreements[moderator]
    // To specify single agreement, both moderator address and agreementId (index of array) are needed
    mapping(address => Agreement[]) public agreements;

    // mapping for client offer to moderators
    // This should NOT hold duplicated moderator addresses in array
    mapping(address => address[]) public offers;

    // mapping for the count of client to moderator
    mapping(address => mapping(address => uint256)) public offerCounts;

    // mapping for client to their offer count
    // TODO: might not need this as this is only for when get all agreements by client
    mapping(address => uint256) public totalOfferCounts;

    /*
     * Modifier
     */
    modifier onlyClient(address moderator, uint256 agreementId) {
        require(
            agreements[moderator][agreementId].client == msg.sender,
            "Not authorized"
        );
        _;
    }
    modifier agreementExists(address moderator, uint256 agreementId) {
        require(agreementId < agreements[moderator].length, "Out of Bound");
        _;
    }

    /*
     * Functions
     */

    function initialize(address _pom) public initializer {
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        pom = PoM(_pom);
    }

    /**
     * @dev Create agreement
     * @param internalAgreementId address, the id of agreement
     * @param moderator address, moderator address
     * @param daoName string, DAO name
     * @param startTime uint256, start time of the agreement
     * @param endTime uint256, end time of the agreement
     * @param rewardCurrency enum, reward currency type
     * @param rewardAmount uint256, reward amount
     */
    function createAgreement(
        string calldata internalAgreementId,
        address moderator, // TODO: this may lead to a bug as this arg in agreement is client address not moderator
        string calldata daoName,
        uint256 startTime,
        uint256 endTime,
        AcceptedCurrency rewardCurrency,
        uint256 rewardAmount
    ) external {
        // check that agreement does not exist
        for (uint256 i = 0; i < agreements[moderator].length; i++) {
            if (
                matches(
                    agreements[moderator][i].internalId,
                    internalAgreementId
                )
            ) {
                revert("Agreement exists");
            }
        }

        // TODO: call vesting contract too
        // Below for mint in case where agreement is made
        // pom.mintToken(address(pom), internalAgreementId);

        agreements[moderator].push(
            Agreement({
                internalId: internalAgreementId, // 一意の値を送ってもらう必要あり？こちらで対応した方が良いか？
                client: msg.sender,
                daoName: daoName,
                startTime: startTime,
                endTime: endTime,
                rewardCurrency: rewardCurrency,
                rewardAmount: rewardAmount,
                isCompleted: false
            })
        );

        // prevent adding same mod address multiple times
        if (offerCounts[msg.sender][moderator] == 0) {
            offers[msg.sender].push(moderator);
        }
        offerCounts[msg.sender][moderator]++;
        totalOfferCounts[msg.sender]++;

        emit CreateAgreement(
            moderator,
            internalAgreementId,
            agreements[moderator].length - 1
        );
    }

    /**
     * @dev Update agreement (only propeties specified with non-zero value)
     * @param moderator address, moderator address
     * @param agreementId uint256, agreementId (index) of agreement
     * @param startTime uint256, start time of agreement
     * @param endTime uint256, end time of agreement
     * @param rewardAmount uint256, reward amount
     */
    function updateAgreement(
        address moderator,
        uint256 agreementId,
        uint256 startTime,
        uint256 endTime,
        uint256 rewardAmount
    )
        external
        onlyClient(moderator, agreementId)
        agreementExists(moderator, agreementId)
    {
        Agreement storage agreement = agreements[moderator][agreementId];
        if (startTime != 0) {
            agreement.startTime = startTime;
        }
        if (endTime != 0) {
            agreement.endTime = endTime;
        }
        if (rewardAmount != 0) {
            agreement.rewardAmount = rewardAmount;
        }
        emit UpdateAgreement(moderator, agreementId);
    }

    /// 140 chars review with 613652 gas tx/ex cost 533610
    /**
     * @dev Complete agreement
     * @notice Reverts if current time has not yet passed endTime of agreement
     * @param moderator address, moderator address
     * @param agreementId uint256, agreementId (index) of agreement
     * @param review string, client review about moderator work
     */
    function completeAgreement(
        address moderator,
        uint256 agreementId,
        string memory review // TODO: or string for review
    )
        external
        onlyClient(moderator, agreementId)
        agreementExists(moderator, agreementId)
    {
        require(
            block.timestamp > agreements[moderator][agreementId].endTime,
            "Contract not ended"
        );
        Agreement storage agreement = agreements[moderator][agreementId];
        agreement.isCompleted = true;

        // TODO: mint here for now (otherwise when agreement is made)
        pom.mintToken(moderator, agreement, review);

        emit CompleteAgreement(moderator, agreementId);
    }

    /**
     * @dev Gets agreements a moderator holds
     * @notice return values include completed agreement
     * @param moderator address, moderator address
     * @return agreements array of agreement info moderator holds
     */
    function getAllAgreementsOfModerator(address moderator)
        external
        view
        returns (Agreement[] memory)
    {
        return agreements[moderator];
    }

    /**
     * @dev Gets agreements a moderator holds
     * @notice return values include completed agreement
     * @param client address, moderator address
     * @return address[] array of moderator address that a client has agreements with
     */
    function getAllModeratorsOffered(address client)
        external
        view
        returns (address[] memory)
    {
        return offers[client];
    }

    /**
     * @dev Gets agreements a moderator holds
     * @notice index of returning agreements[] is not iterated "i" variable
     * @notice order of returning agreements[] is based on moderator address NOT time series when agreement added
     * @param client address, client address
     * @return Agreement[] array of agreement a client has agreements with
     */
    // TODO: might be written in a better way
    function getAllAgreementsOfClient(address client)
        external
        view
        returns (Agreement[] memory)
    {
        Agreement[] memory _agreements = new Agreement[](
            totalOfferCounts[msg.sender]
        );
        uint256 index = 0; // for duplicatetd moderator address
        for (uint256 i = 0; i < offers[client].length; i++) {
            address moderator = offers[client][i];
            uint256 offerCount = offerCounts[client][moderator];
            for (uint256 j = 0; j < agreements[moderator].length; j++) {
                if (agreements[moderator][j].client == client) {
                    Agreement memory agreement = agreements[moderator][j];
                    _agreements[index] = agreement;

                    // handling duplicated client address for same moderator
                    index++;
                    offerCount--;
                    if (offerCount == 0) {
                        break;
                    }
                }
            }
        }
        return _agreements;
    }

    /**
     * @dev Gets agreements a moderator holds
     * @notice return values include completed agreement
     * @param client address, client address
     * @param moderator address, moderator address
     * @return Agreement array of agreement a client has agreements with
     */
    // TODO: might not need this
    function getAgreementDetailWithClient(address client, address moderator)
        external
        view
        returns (Agreement memory)
    {
        for (uint256 i = 0; i < agreements[moderator].length; i++) {
            if (client == agreements[moderator][i].client) {
                return agreements[moderator][i];
            }
        }
        revert("Agreement not found");
    }

    /**
     * @dev Gets agreements a moderator holds
     * @notice return values include completed agreement
     * @param moderator address, moderator address
     * @param agreementId uint256, agreement id (index of agreement)
     * @return Agreement agreement info
     */
    function getAgreementDetailWithAgreementId(
        address moderator,
        uint256 agreementId
    )
        external
        view
        agreementExists(moderator, agreementId)
        returns (Agreement memory)
    {
        return agreements[moderator][agreementId];
    }

    /*
     * @dev Gets the array of provers
     * @param owner address, the id of proof
     * @return provers
     */
    // function proversByProof(address owner, uint256 proofId)
    //     public
    //     view
    //     returns (Endorsement[] memory)
    // {
    //     uint256 key = hash(owner, proofId);
    //     return endorsements[key];
    // }

    /*
     * Admin Only
     */

    // function grantAuth(address user) public onlyRole(DEFAULT_ADMIN_ROLE) {
    //     _setupRole(AUTH_ROLE, user);
    // }

    // function revokeAuth(address user) public onlyRole(DEFAULT_ADMIN_ROLE) {
    //     _revokeRole(AUTH_ROLE, user);
    // }

    // TODO: need to consider changed agreementId after cancelled (deleted from array)
    function cancelAgreement(address moderator, uint256 agreementId)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
        agreementExists(moderator, agreementId)
    {
        for (
            uint256 i = agreementId;
            i < agreements[moderator].length - 1;
            i++
        ) {
            agreements[moderator][i] = agreements[moderator][i + 1];
        }
        agreements[moderator].pop();

        // TODO: burn token if already minted
        emit CancelAgreement(moderator, agreementId);
    }

    /*
     * Utility
     */

    // TODO: could move to shared.sol
    function hash(address addr, uint256 num)
        internal
        pure
        returns (uint256 key)
    {
        return uint256(keccak256(abi.encodePacked(num, addr)));
    }

    function matches(string memory a, string memory b)
        internal
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }
}
