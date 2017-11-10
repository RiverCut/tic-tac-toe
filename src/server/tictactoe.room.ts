
import { Room } from 'rivercut';
import { TicTacToeState } from './tictactoe.state';

export class TicTacToeRoom<TicTacToeState> extends Room {

  onSetup() {
    this.setState(new TicTacToeState());
  }

  onConnect(clientId: string) {}
  onDisconnect(clientId: string) {}
  onInit() {}
  onUninit() {}
  onDispose() {}
  onMessage() {}
  onTick() {}
}
