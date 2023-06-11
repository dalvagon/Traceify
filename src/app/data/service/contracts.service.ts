import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { MessageService } from 'primeng/api';
import { contract } from 'src/contracts/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  private ethereum: any;
  private provider: any;

  constructor(private messageService: MessageService) {
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

  /**
   * Handle the ethereum object injected by metamask
   */
  private handleEthereum() {
    const ethereum = (window as any).ethereum;
    if (typeof ethereum !== 'undefined') {
      this.ethereum = ethereum;
      this.createProvider();
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please install MetaMask to use this dApp!',
      });
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
   * Get the signer from the provider
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

  /**
   * Get a contract instance
   * @returns a contract instance
   */
  public async getContractInstance() {
    const signer = await this.getSigner();

    if (typeof signer === 'undefined') {
      return;
    }

    return new ethers.Contract(contract.address, contract.abi, signer);
  }

  /**
   * Get a contract instance without signer
   * @returns a contract instance without signer
   */
  public async getContractInstanceWithoutSigner() {
    return new ethers.Contract(contract.address, contract.abi, this.provider);
  }

  /**
   * Check if the current user has a role
   * @param role the role to check
   * @returns true if the current user has the role
   */
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
