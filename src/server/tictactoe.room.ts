
import { Room } from 'rivercut';
import { TicTacToeState } from './tictactoe.state';

export class TicTacToeRoom<TicTacToeState> extends Room {

  async canJoin() {
    return this.connectedClients.length < 2 && !this.state.board.isStarted;
  }

  onSetup() {
    this.setState(new TicTacToeState());
  }

  onConnect(clientId: string) {
    this.sendMessage(clientId, { message: 'You joined!' });
    this.broadcast({ message: `${clientId} joined!`}, [clientId]);

    this.checkIfEnoughPlayers();
  }

  onDisconnect(clientId: string) {
    this.sendMessage(clientId, { message: 'You left!' });
    this.broadcast({ message: `${clientId} left!`}, [clientId]);
  }

  onInit() {
    this.on('taketurn', (data, response) => {
      const success = this.takeTurn(data);
      if(!success) {
        response.error('That move is invalid, or it is not your turn.');
        return false;
      }

      return true;
    });
  }

  onUninit() {
    this.off('taketurn');
  }

  onDispose() {}

  onMessage() {}
  onTick() {}

  private takeTurn(data): boolean {
    if(data.$$userId !== this.state.board.currentTurn) return false;
    if(this.state.isMarked(data.x, data.y)) return false;

    this.state.mark(data.x, data.y, this.getMarkForPlayer(data.$$userId));
    this.changeTurn(this.pickNextPlayer());

    this.checkForVictory();
    return true;
  }

  private getMarkForPlayer(userId: string): 'x'|'o'|'-' {
    if(userId === this.state.board.player1) return 'x';
    if(userId === this.state.board.player2) return 'o';
    return '-';
  }

  private checkIfEnoughPlayers(): void {
    if(this.connectedClients.length !== 2) return;

    this.state.board.isStarted = true;
    this.state.board.player1 = this.connectedClients[0];
    this.state.board.player2 = this.connectedClients[1];

    this.changeTurn(this.state.board.player1);
  }

  private pickNextPlayer(): string {
    if(this.state.board.currentTurn === this.connectedClients[0]) return this.connectedClients[1];
    return this.connectedClients[0];
  }

  private changeTurn(uid: string): void {
    const playerNumber = this.connectedClients.indexOf(uid);
    this.state.board.currentTurn = uid;
    this.state.board.message = `Waiting for Player ${playerNumber + 1}`;
  }

  private checkForVictory(): void {
    const board = this.state.board.configuration;

    for(let obj of [{ index: 0, mark: 'x' }, { index: 1, mark: 'o' }]) {

      const { mark, index } = obj;

      // check vertical matches
      for(let x = 0; x <= 2; x++) {

        let numMatches = 0;

        for(let y = 0; y <= 2; y++) {
          if(board[x][y] === mark) numMatches++;
        }

        if(numMatches === 3) {
          this.declareVictory(this.connectedClients[index]);
          return;
        }
      }

      // check horizontal matches
      for(let y = 0; y <= 2; y++) {

        let numMatches = 0;

        for(let x = 0; x <= 2; x++) {
          if(board[x][y] === mark) numMatches++;
        }

        if(numMatches === 3) {
          this.declareVictory(this.connectedClients[index]);
          return;
        }
      }

      const firstDiagonal = board[0][0] === mark
                         && board[1][1] === mark
                         && board[2][2] === mark;

      const secondDiagonal = board[0][2] === mark
                          && board[1][1] === mark
                          && board[2][0] === mark;

      // check diagonal matches
      if(firstDiagonal || secondDiagonal) {
        this.declareVictory(this.connectedClients[index]);
        return;
      }
    }

    this.checkForDraw();
  }

  private checkForDraw(): void {
    for(let x = 0; x <= 2; x++) {
      for(let y = 0; y <= 2; y++) {
        if(!this.state.board.configuration[x][y]) return;
      }
    }

    this.declareDraw();
  }

  private declareVictory(uid: number): void {
    this.state.board.currentTurn = '';
    const playerNumber = this.connectedClients.indexOf(uid);
    this.state.board.message = `Player ${playerNumber + 1} wins`;
  }

  private declareDraw(): void {
    this.state.board.currentTurn = '';
    this.state.board.message = 'Draw';
  }
}
