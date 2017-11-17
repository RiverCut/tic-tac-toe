
import { Model } from 'rivercut';

import { cloneDeep } from 'lodash';

const BASE_CONFIG = {
  0: { 0: false, 1: false, 2: false },
  1: { 0: false, 1: false, 2: false },
  2: { 0: false, 1: false, 2: false }
};

export class Board extends Model {

  public initialized: boolean;
  public isStarted: boolean;
  public isComplete: boolean;

  public configuration: any = cloneDeep(BASE_CONFIG);

  public player1: string;
  public player2: string;

  public currentTurn: string;
  public currentMessage: string = 'Waiting for players';

  public reset() {
    this.configuration = cloneDeep(BASE_CONFIG);
  }

}
