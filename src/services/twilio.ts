import axios from 'axios';
import qs from 'qs';

import { env } from '../utils';

class Twilio {
  readonly #accountSid: string;

  readonly #apiKey: string;

  readonly #apiSecret: string;

  readonly #fromNumber: string;

  constructor() {
    this.#accountSid = env.getEnv('TWILIO_ACCOUNT_SID');
    this.#apiKey = env.getEnv('TWILIO_API_KEY');
    this.#apiSecret = env.getEnv('TWILIO_API_SECRET');
    this.#fromNumber = env.getEnv('TWILIO_NUMBER');
  }

  public sendMessage = async (body: string, to: string): Promise<void> => {
    await axios({
      method: 'POST',
      url: `https://api.twilio.com/2010-04-01/Accounts/${this.#accountSid}/Messages.json`,
      timeout: 1000 * 10,
      auth: {
        username: this.#apiKey,
        password: this.#apiSecret,
      },
      data: qs.stringify({
        From: this.#fromNumber,
        Body: body,
        To: to,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };
}

export default new Twilio();
