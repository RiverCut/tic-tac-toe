
import { Model } from 'rivercut';

import { cloneDeep } from 'lodash';

const BASE_CONFIG = {
  0: { 0: false, 1: false, 2: false },
  1: { 0: false, 1: false, 2: false },
  2: { 0: false, 1: false, 2: false }
};

export class Board extends Model {

  public initialized: boolean;

  public configuration: any = cloneDeep(BASE_CONFIG);

  public reset() {
    this.configuration = cloneDeep(BASE_CONFIG);
  }

}
