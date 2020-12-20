import Portis from '@portis/web3';
import Web3 from 'web3';

export const portis = new Portis('176974dc-8da1-4ae3-8fe1-835afe777f84', 'matic');
export const web3 = new Web3(portis.provider);