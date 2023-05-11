import Player, { DatabasePlayer } from '../player/Player';

export default class Database {
  public async setPlayer(player: Player): Promise<void> {
    console.warn('Database#setPlayer is not implemented');
  }

  public async getPlayer(uuid: string): Promise<DatabasePlayer> {
    console.warn('Database#getPlayer is not implemented');
    return null;
  }

  public async getPlayerCount(): Promise<number> {
    console.warn('Database#getPlayerCount is not implemented');
    return null;
  }
}
