import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { contract } from 'src/contracts/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private ethereum: any;
  private provider: any;

  constructor() {
    this.createProvider();
  }

  /**
  * Connect to web3 using the ethereum object injected by metamask
  */
  private connectToWeb3() {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== 'undefined') {
      this.ethereum = ethereum;
      this.createProvider();
    } else {
      window.addEventListener('ethereum#initialized', this.handleEthereum, {
        once: true,
      });

      setTimeout(this.handleEthereum, 3000);
    }
  }

  private handleEthereum() {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== 'undefined') {
      this.ethereum = ethereum;
      this.createProvider();
    } else {
      console.log('No web3? You should consider trying MetaMask!');
    }
  }

  /**
   * Create a provider using the ethereum object injected by metamask
   */
  public createProvider() {
    if (typeof this.ethereum === 'undefined') {
      this.connectToWeb3();
    }

    this.provider = new ethers.providers.Web3Provider(this.ethereum);
  }

  /**
   * Returns the provider
   * @returns the provider
   */
  public getProvider() {
    return this.provider;
  }

  /**
   * Returns the signer if there is an account connected
   * @returns the signer
   */
  private getSigner() {
    return this.ethereum
      .request({ method: 'eth_accounts' })
      .then(async (accounts: any) => {
        if (accounts.length > 0) {
          return await this.provider.getSigner(accounts[0]);
        }
      });
  }

  public async getContractInstance() {
    const signer = await this.getSigner();

    if (typeof signer === 'undefined') {
      return;
    }

    return new ethers.Contract(contract.address, contract.abi, signer);
  }

  public async getContractInstanceWithoutSigner() {
    return new ethers.Contract(contract.address, contract.abi, this.getProvider());
  }

  public async hasRole(role: any) {
    const contract = await this.getContractInstance();

    if (typeof contract === 'undefined') {
      return false;
    }

    const address = await contract.signer.getAddress();
    const roleHash = await contract[role]();
    const canActivate = await contract['hasRole'](roleHash, address);

    return canActivate;
  }
}
