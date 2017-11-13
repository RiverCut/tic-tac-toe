
import { ClientState, SyncFrom } from 'rivercut';

import { Board } from '../models/Board';

export class TicTacToeClientState extends ClientState {
  @SyncFrom(Board) public board: Board = new Board();
}
