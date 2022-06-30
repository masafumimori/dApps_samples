/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface VestingInterface extends ethers.utils.Interface {
  functions: {
    "addVestingInfo(bytes32,address,address,uint256,uint32,uint256)": FunctionFragment;
    "depositedToken()": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "modInfoVesting(bytes32)": FunctionFragment;
    "owner()": FunctionFragment;
    "release(bytes32)": FunctionFragment;
    "releaseAmount(bytes32)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "revoke(bytes32)": FunctionFragment;
    "setAgreementContractAddress(address)": FunctionFragment;
    "setDepoistedToken(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateVestingInfo(bytes32,uint256,uint32)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addVestingInfo",
    values: [
      BytesLike,
      string,
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "depositedToken",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "modInfoVesting",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "release", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "releaseAmount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "revoke", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "setAgreementContractAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setDepoistedToken",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "updateVestingInfo",
    values: [BytesLike, BigNumberish, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addVestingInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "modInfoVesting",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "release", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "releaseAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revoke", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setAgreementContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setDepoistedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateVestingInfo",
    data: BytesLike
  ): Result;

  events: {
    "AddVestingInfo(bytes32,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Released(bytes32,address)": EventFragment;
    "Revoked(bytes32,address)": EventFragment;
    "UpdateVestingInfo(bytes32)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddVestingInfo"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Released"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Revoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "UpdateVestingInfo"): EventFragment;
}

export type AddVestingInfoEvent = TypedEvent<
  [string, string] & { proofId: string; founder: string }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export type ReleasedEvent = TypedEvent<
  [string, string] & { proofId: string; mod: string }
>;

export type RevokedEvent = TypedEvent<
  [string, string] & { proofId: string; founder: string }
>;

export type UpdateVestingInfoEvent = TypedEvent<[string] & { proofId: string }>;

export class Vesting extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: VestingInterface;

  functions: {
    addVestingInfo(
      _proofId: BytesLike,
      _founderAddress: string,
      _modAddress: string,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    depositedToken(overrides?: CallOverrides): Promise<[string]>;

    initialize(
      _depositedToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    modInfoVesting(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber, number, BigNumber, boolean] & {
        founderAddress: string;
        modAddress: string;
        amount: BigNumber;
        released: BigNumber;
        jobEndTime: number;
        duration: BigNumber;
        completed: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    release(
      _proofId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    releaseAmount(
      _proofId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revoke(
      _proofId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setAgreementContractAddress(
      _contractAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setDepoistedToken(
      _depositedToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    updateVestingInfo(
      _proofId: BytesLike,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addVestingInfo(
    _proofId: BytesLike,
    _founderAddress: string,
    _modAddress: string,
    _amount: BigNumberish,
    _jobEndTime: BigNumberish,
    _duration: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  depositedToken(overrides?: CallOverrides): Promise<string>;

  initialize(
    _depositedToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  modInfoVesting(
    arg0: BytesLike,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, BigNumber, number, BigNumber, boolean] & {
      founderAddress: string;
      modAddress: string;
      amount: BigNumber;
      released: BigNumber;
      jobEndTime: number;
      duration: BigNumber;
      completed: boolean;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  release(
    _proofId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  releaseAmount(
    _proofId: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revoke(
    _proofId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setAgreementContractAddress(
    _contractAddr: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setDepoistedToken(
    _depositedToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  updateVestingInfo(
    _proofId: BytesLike,
    _amount: BigNumberish,
    _jobEndTime: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addVestingInfo(
      _proofId: BytesLike,
      _founderAddress: string,
      _modAddress: string,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      _duration: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    depositedToken(overrides?: CallOverrides): Promise<string>;

    initialize(
      _depositedToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    modInfoVesting(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, BigNumber, number, BigNumber, boolean] & {
        founderAddress: string;
        modAddress: string;
        amount: BigNumber;
        released: BigNumber;
        jobEndTime: number;
        duration: BigNumber;
        completed: boolean;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    release(_proofId: BytesLike, overrides?: CallOverrides): Promise<void>;

    releaseAmount(
      _proofId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    revoke(_proofId: BytesLike, overrides?: CallOverrides): Promise<void>;

    setAgreementContractAddress(
      _contractAddr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    setDepoistedToken(
      _depositedToken: string,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    updateVestingInfo(
      _proofId: BytesLike,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AddVestingInfo(bytes32,address)"(
      proofId?: BytesLike | null,
      founder?: string | null
    ): TypedEventFilter<[string, string], { proofId: string; founder: string }>;

    AddVestingInfo(
      proofId?: BytesLike | null,
      founder?: string | null
    ): TypedEventFilter<[string, string], { proofId: string; founder: string }>;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    "Released(bytes32,address)"(
      proofId?: BytesLike | null,
      mod?: string | null
    ): TypedEventFilter<[string, string], { proofId: string; mod: string }>;

    Released(
      proofId?: BytesLike | null,
      mod?: string | null
    ): TypedEventFilter<[string, string], { proofId: string; mod: string }>;

    "Revoked(bytes32,address)"(
      proofId?: BytesLike | null,
      founder?: string | null
    ): TypedEventFilter<[string, string], { proofId: string; founder: string }>;

    Revoked(
      proofId?: BytesLike | null,
      founder?: string | null
    ): TypedEventFilter<[string, string], { proofId: string; founder: string }>;

    "UpdateVestingInfo(bytes32)"(
      proofId?: BytesLike | null
    ): TypedEventFilter<[string], { proofId: string }>;

    UpdateVestingInfo(
      proofId?: BytesLike | null
    ): TypedEventFilter<[string], { proofId: string }>;
  };

  estimateGas: {
    addVestingInfo(
      _proofId: BytesLike,
      _founderAddress: string,
      _modAddress: string,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    depositedToken(overrides?: CallOverrides): Promise<BigNumber>;

    initialize(
      _depositedToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    modInfoVesting(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    release(
      _proofId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    releaseAmount(
      _proofId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revoke(
      _proofId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setAgreementContractAddress(
      _contractAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setDepoistedToken(
      _depositedToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    updateVestingInfo(
      _proofId: BytesLike,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addVestingInfo(
      _proofId: BytesLike,
      _founderAddress: string,
      _modAddress: string,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      _duration: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    depositedToken(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    initialize(
      _depositedToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    modInfoVesting(
      arg0: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    release(
      _proofId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    releaseAmount(
      _proofId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revoke(
      _proofId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setAgreementContractAddress(
      _contractAddr: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setDepoistedToken(
      _depositedToken: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    updateVestingInfo(
      _proofId: BytesLike,
      _amount: BigNumberish,
      _jobEndTime: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
