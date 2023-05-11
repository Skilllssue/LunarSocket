import JoinServerPacket from '../../../packets/JoinServerPacket';
import Player from '../../Player';

export default function (player: Player, packet: JoinServerPacket): void {
  player.server = packet.data.server;
  player.writeToServer(packet);
}
