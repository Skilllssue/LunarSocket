import { RedisClientType } from '@redis/client';
import redisJson from '@redis/json';
import { createClient } from 'redis';
import Player, { DatabasePlayer } from '../player/Player';
import CallQueue from '../utils/CallQueue';
import getConfig from '../utils/config';
import logger from '../utils/logger';
import Database from './Database';

export default class Redis extends Database {
  private isConnected: boolean;
  private client: RedisClientType<{ json: typeof redisJson }>;
  private queue: CallQueue<Player, (player: Player) => Promise<void>>;

  public constructor() {
    super();

    this.isConnected = false;
    this.queue = new CallQueue(this.setPlayer);
    this.init().catch((reason) => {
      logger.error('An error occured while initializing Redis\n', reason);
      logger.error("Can't proceed without a working database, exiting...");
      process.exit(1);
    });
  }

  private async init(): Promise<void> {
    const config = await getConfig();

    this.client = createClient({
      url: config.database.config.redis,
      database: config.database.config.redisDatabase ?? 0,
      modules: {
        json: redisJson,
      },
    });

    await this.client.connect();

    if ((await this.client.exists('players')) === 0)
      await this.client.json.set('players', '$', {});

    this.isConnected = true;
    logger.log('Connected to Redis');

    this.queue.emptyQueue();
  }

  public async setPlayer(player: Player): Promise<void> {
    // See src/databases/Mongo.ts for the explanation
    if (!this.isConnected) return void this.queue.push([player]);
    await this.client.json.set(
      'players',
      player.uuid,
      player.getDatabasePlayer() as { [key: string]: any }
    );
  }

  public async getPlayer(uuid: string): Promise<DatabasePlayer> {
    return (await this.client.json.get('players', {
      path: uuid,
    })) as unknown as DatabasePlayer;
  }

  public async getPlayerCount(): Promise<number> {
    return await this.client.dbSize();
  }
}
