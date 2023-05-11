import Player, { DatabasePlayer } from '../player/Player';
import Database from './Database';

export default class InstanceStorage extends Database {
  private database: Map<string, DatabasePlayer>;

  public constructor() {
    super();
    this.database = new Map<string, DatabasePlayer>();
  }

  public async setPlayer(player: Player): Promise<void> {
    this.database.set(player.uuid, player.getDatabasePlayer());
  }

  public async getPlayer(uuid: string): Promise<DatabasePlayer> {
    return this.database.get(uuid);
  }

  public async getPlayerCount(): Promise<number> {
    return Object.keys(this.database).length;
  }
}
