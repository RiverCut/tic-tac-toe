
import { ServerState, syncto } from 'rivercut';
import { Board } from '../models/Board';

export class TicTacToeState extends ServerState {

  @syncto() public board: Board = new Board();

  onInit() {
    if(!this.board.initialized) {
      this.board.initialized = true;
      this.board.reset();
    }
  }

  onTick() {}
  onUninit() {}
}
