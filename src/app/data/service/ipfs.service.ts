import { Injectable } from '@angular/core';
import { create } from 'ipfs-http-client';
import { environment } from 'src/environments/environment';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  client: any

  constructor() {
    this.createClient();
  }

  createClient() {
    const projectId = environment.infuraProjectId;
    const projectSecret = environment.infuraProjectSecret;
    const auth =
      'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

    this.client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: auth,
      },
    });
  }

  uploadData(data: any) {
    return this.client.add(data);
  }

  async downloadData(cid: string) {
    const resp = this.client.cat(cid);

    let data = [];
    for await (const chunk of resp) {
      data.push(chunk);
    }
    const buffer = Buffer.from(Buffer.concat(data)).toString('utf8');

    return JSON.parse(buffer);
  }

  async removeData(cid: string) {
    return this.client.pin.rm(cid);
  }
}
