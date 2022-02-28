import axios from 'axios';

import { env } from '../utils';

interface UnmineableInfo {
  coin: string;
  address: string;
  healthy: boolean;
}

class Unmineable {
  readonly #coin: string;

  readonly #address: string;

  #workerId: string = '';

  constructor() {
    this.#coin = env.getEnv('UNMINEABLE_COIN');
    this.#address = env.getEnv('UNMINEABLE_ADDRESS');
  }

  public isServiceUp = async (): Promise<boolean> => {
    const workerId = await this.getWorkerId();
    const resp = await axios({
      url: `https://api.unminable.com/v4/account/${workerId}/workers`,
      timeout: 1000 * 10,
    });

    return resp?.data?.data?.ethash?.workers?.length === 1;
  };

  public info = async (): Promise<UnmineableInfo> => {
    const healthy = await this.isServiceUp();

    return {
      healthy,
      coin: this.#coin,
      address: this.#address,
    };
  };

  private getWorkerId = async (): Promise<string> => {
    if (!this.#workerId) {
      const resp = await axios({
        url: `https://api.unminable.com/v4/address/${this.#address}?coin=${this.#coin}`,
        timeout: 1000 * 10,
      });
      this.#workerId = resp.data.data.uuid;
    }

    return this.#workerId;
  };
}

export default new Unmineable();
