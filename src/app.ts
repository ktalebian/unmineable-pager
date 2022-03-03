import { env } from './utils';
import { Twilio, Unmineable } from './services';

class App {
  readonly #intervalMs: number;

  readonly #pagerNumber: string;

  constructor() {
    this.#intervalMs = parseInt(env.getEnv('APP_INTERVAL_MS'), 10);
    this.#pagerNumber = env.getEnv('APP_PAGER_NUMBER');
  }

  public start() {
    setInterval(this.run, 5000);
  }

  private run = async (): Promise<void> => {
    const isHealth = await Unmineable.isServiceUp();
    if (isHealth) {
      return;
    }

    const info = await Unmineable.info();
    await Twilio.sendMessage(`Unmineable Service (${info.coin}:${info.address}) is unhealthy`, this.#pagerNumber);
  };
}

export default new App();
