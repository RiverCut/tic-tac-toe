
import { ServerState, SyncTo } from 'rivercut';
import { Board } from '../models/Board';

export class TicTacToeState extends ServerState {

  @SyncTo(Board) public board: Board = new Board();

  onInit() {
    if(!this.board.initialized) {
      this.board.initialized = true;
      this.board.reset();
    }
  }

  onTick() {}
  onUninit() {}

  public isMarked(x: number, y: number): boolean {
    if(x < 0 || x > 2 || y < 0 || y > 2) return false;
    return this.board.configuration[x][y];
  }

  public mark(x: number, y: number, mark: 'x'|'o'): void {
    this.board.configuration[x][y] = mark;
  }
}
