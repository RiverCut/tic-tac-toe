
import { Room } from 'rivercut';
import { TicTacToeState } from './tictactoe.state';

export class TicTacToeRoom<TicTacToeState> extends Room {

  onSetup() {
    this.setState(new TicTacToeState());
  }

  onConnect(clientId: string) {
    this.sendMessage(clientId, { message: 'You joined!' });
    this.broadcast({ message: `${clientId} joined!`});
  }

  onDisconnect(clientId: string) {
    this.sendMessage(clientId, { message: 'You left!' });
    this.broadcast({ message: `${clientId} left!`});
  }

  onInit() {}
  onUninit() {}
  onDispose() {}
  onMessage() {}
  onTick() {}
}
