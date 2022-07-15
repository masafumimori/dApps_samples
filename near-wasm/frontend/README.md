## Start local node

```shell
sh ./launch.sh
```

Copy and paste like below

```
export NEAR_ENV="local"
export NEAR_CLI_LOCALNET_NETWORK_ID="localnet"
export NEAR_NODE_URL="http://127.0.0.1:8332"
export NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json"
export NEAR_WALLET_URL="http://127.0.0.1:8334"
export NEAR_HELPER_URL="http://127.0.0.1:8330"
export NEAR_HELPER_ACCOUNT="test.near"
export NEAR_EXPLORER_URL="http://127.0.0.1:8331"
```

Also like this one

```
alias local_near='NEAR_ENV="local" NEAR_CLI_LOCALNET_NETWORK_ID="localnet" NEAR_NODE_URL="http://127.0.0.1:8332" NEAR_CLI_LOCALNET_KEY_PATH="/Users/zerix/.neartosis/2022-06-03T18.04.32/validator-key.json" NEAR_WALLET_URL="http://127.0.0.1:8334" NEAR_HELPER_URL="http://127.0.0.1:8330" NEAR_HELPER_ACCOUNT="test.near" NEAR_EXPLORER_URL="http://127.0.0.1:8331" near'
```

Access to [wallet](http://127.0.0.1:8334)
Create an account and then

```
local_near login
export ACCOUNT_ID=YOUR_ACCOUNT_ID
local_near deploy --wasmFile PATH_TO_FILE/main.wasm --accountId $ACCOUNT_ID
```

## Test

To test if it is running

```
local_near state test.near
```

## Reset local node

```shell
kurtosis clean -a
```
