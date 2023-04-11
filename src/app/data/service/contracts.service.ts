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
    this.connectToWeb3();
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
      console.log('No web3? You should consider trying MetaMask!');
    }
  }

  /**
   * Create a provider using the ethereum object injected by metamask
   */
  public createProvider() {
    this.provider = new ethers.BrowserProvider(this.ethereum);
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
  public getSigner() {
    return this.ethereum
      .request({ method: 'eth_accounts' })
      .then((accounts: any) => {
        if (accounts.length > 0) {
          return this.provider.getSigner();
        }
      });
  }

  public getContractAddress() {
    return contract.address;
  }

  public getContractAbi() {
    return contract.abi;
  }

  public async addManager(address: string) {
    const signer = await this.getSigner();

    const contractInstance = new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );

    await contractInstance['addManager'](address);
  }

  public async createProduct(barcode: any, informationHash: any, parentBarcodes: any) {
    const signer = await this.getSigner();

    const contractInstance = new ethers.Contract(
      contract.address,
      contract.abi,
      signer
    );

    contractInstance.on("ProductCreated", (barcode: any, informationHash: any, parentBarcodes: any) => {
      console.log(barcode, informationHash, parentBarcodes);
    });

    await contractInstance['createProduct'](barcode, informationHash, parentBarcodes)
      .then(() => {
        console.log("Product created successfully");
      }
      ).catch((error: any) => {
        console.log(error);
      });
  }
}