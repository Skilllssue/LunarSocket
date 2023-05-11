import { Collection, MongoClient } from 'mongodb';
import Player, { DatabasePlayer } from '../player/Player';
import CallQueue from '../utils/CallQueue';
import getConfig from '../utils/config';
import logger from '../utils/logger';
import Database from './Database';

export default class Mongo extends Database {
  private isConnected: boolean;
  private client: MongoClient;
  private collection: Collection;
  private queue: CallQueue<Player, (player: Player) => Promise<void>>;

  public constructor() {
    super();

    this.isConnected = false;
    this.queue = new CallQueue(this.setPlayer);
    this.init().catch((reason) => {
      logger.error('An error occured while initializing Mongo\n', reason);
      logger.error("Can't proceed without a working database, exiting...");
      process.exit(1);
    });
  }

  private async init(): Promise<void> {
    const config = await getConfig();

    this.client = new MongoClient(config.database.config.mongo);
    await this.client.connect();
    const db = this.client.db('LunarSocket');
    this.collection = db.collection('players');

    this.isConnected = true;
    logger.log('Connected to MongoDB');

    this.queue.emptyQueue();
  }

  public async setPlayer(player: Player): Promise<void> {
    // If not connected, push the player instance into the queue
    // Once the connection will be established, the setPlayer
    // method will be called again with the player instance
    if (!this.isConnected) return void this.queue.push([player]);

    const existingPlayer = await this.getPlayer(player.uuid);

    if (existingPlayer)
      this.collection.updateOne(
        { uuid: player.uuid },
        {
          $set: player.getDatabasePlayer(),
          // Removing all fields
          $unset: { color: null, plusColor: null, premium: null },
        }
      );
    else
      await this.collection.insertOne({
        // Mango specific data, used to get the player
        uuid: player.uuid,
        ...player.getDatabasePlayer(),
      });
  }

  public async getPlayer(uuid: string): Promise<DatabasePlayer> {
    return await this.collection.findOne<DatabasePlayer>({ uuid });
  }

  public async getPlayerCount(): Promise<number> {
    return await this.collection.countDocuments();
  }
}
