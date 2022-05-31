import { task } from 'hardhat/config';
import { ConfigNames, loadPoolConfig } from '../../helpers/configuration';
import {
  deployLendingPool,
  deployLendingPoolConfigurator,
  deployLTokenImplementations,
  deployLTokensAndRatesHelper,
  deployStableAndVariableTokensHelper,
} from '../../helpers/contracts-deployments';
import {
  getLendingPool,
  getLendingPoolAddressesProvider,
  getLendingPoolConfiguratorProxy,
} from '../../helpers/contracts-getters';
import { insertContractAddressInDb } from '../../helpers/contracts-helpers';
import { waitForTx } from '../../helpers/misc-utils';
import { eContractid } from '../../helpers/types';

task('dev:deploy-lending-pool', 'Deploy lending pool for dev enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const addressesProvider = await getLendingPoolAddressesProvider();
    const poolConfig = loadPoolConfig(pool);

    const lendingPoolImpl = await deployLendingPool(verify);

    // Set lending pool impl to Address Provider
    await waitForTx(await addressesProvider.setLendingPoolImpl(lendingPoolImpl.address));
    console.log('lendingPoolImpl address : ' + lendingPoolImpl.address);

    const address = await addressesProvider.getLendingPool();
    const lendingPoolProxy = await getLendingPool(address);
    console.log('lendingPoolProxy address : ' + lendingPoolProxy.address);

    await insertContractAddressInDb(eContractid.LendingPool, lendingPoolProxy.address);

    const lendingPoolConfiguratorImpl = await deployLendingPoolConfigurator(verify);

    // Set lending pool conf impl to Address Provider
    await waitForTx(
      await addressesProvider.setLendingPoolConfiguratorImpl(lendingPoolConfiguratorImpl.address)
    );

    const lendingPoolConfiguratorProxy = await getLendingPoolConfiguratorProxy(
      await addressesProvider.getLendingPoolConfigurator()
    );
    await insertContractAddressInDb(
      eContractid.LendingPoolConfigurator,
      lendingPoolConfiguratorProxy.address
    );

    // Deploy deployment helpers
    const stable = await deployStableAndVariableTokensHelper(
      [lendingPoolProxy.address, addressesProvider.address],
      verify
    );
    console.log('deployStableAndVariableTokensHelper address : ' + stable.address);

    const token = await deployLTokensAndRatesHelper(
      [lendingPoolProxy.address, addressesProvider.address, lendingPoolConfiguratorProxy.address],
      verify
    );
    console.log('deployLTokensAndRatesHelper address : ' + token.address);

    await deployLTokenImplementations(pool, poolConfig.ReservesConfig, verify);
  });
