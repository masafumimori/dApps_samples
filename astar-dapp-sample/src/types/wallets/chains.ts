import { ValueOf } from 'type-fest'
import { CHAIN_ID } from '../../constants/chains'

export type ChainId = ValueOf<typeof CHAIN_ID>
