
import { ServerState, SyncTo, SyncType } from 'rivercut';
import { Board } from '../models/Board';

export class TicTacToeState extends ServerState {

  @SyncTo(Board, SyncType.AUTOMATIC) public board: Board = new Board();

  onInit() {
    if(!this.board.initialized) {
      this.board.initialized = true;
      this.board.reset();
    }

    setTimeout(() => {
      this.board.configuration[1][2] = true;
      this.forceSyncKey('board');
    }, 5000);
  }

  onTick() {}
  onUninit() {}
}
