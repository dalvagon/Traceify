import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { contract } from 'src/contracts/contract';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  ETHSCAN_API_URL = 'https://api-sepolia.etherscan.io/api';
  ETHSCAN_API_KEY = 'ZQQQPWYWXDY1YK2RN711657UK1HNC5FZ18';
  CRYPTOCOMPARE_API_URL = 'https://min-api.cryptocompare.com/data/price';
  CRYPTOCOMPARE_API_KEY = 'a40790f89ad6e7851a58da2585e070b99d3e0db0b8f0e7ac532b67d836ddf3e1';

  constructor(private http: HttpClient) { }

  getTransactions() {
    const params = {
      module: 'account',
      action: 'txlist',
      address: contract.address,
      startblock: 0,
      endblock: 99999999,
      sort: 'asc',
      page: 1,
      offset: 100,
      apiKey: this.ETHSCAN_API_KEY
    }

    return this.http.get(this.ETHSCAN_API_URL, { params });
  }

  getBalance(account: string) {
    const params = {
      module: 'account',
      action: 'balance',
      address: account,
      tag: 'latest',
      apiKey: this.ETHSCAN_API_KEY
    }

    return this.http.get(this.ETHSCAN_API_URL, { params });
  }


  getUsdPrice() {
    const params = {
      fsym: 'ETH',
      tsyms: 'USD',
      api_key: this.CRYPTOCOMPARE_API_KEY
    }

    return this.http.get(this.CRYPTOCOMPARE_API_URL, { params });
  }
}
