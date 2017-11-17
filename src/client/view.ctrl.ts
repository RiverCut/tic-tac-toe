
import Vue from 'vue';
import { TicTacToeClientState } from './tictactoe.clientstate';

Vue.config.devtools = false;
Vue.config.silent = true;
Vue.config.productionTip = false;

export const init = (client, state: TicTacToeClientState) => {

  const vue = new Vue({
    el: '#app',
    data: {
      uid: client.uid,
      state,
      status: 'not connected'
    },
    methods: {
      takeTurn: (x, y) => client.emitFromState('taketurn', { x, y }, state),
      isMyTurn: () => state.board.currentTurn === client.uid
    }
  });

  state.onUpdate$.subscribe(data => console.log('Update:', data));
  client.connectionState$.subscribe(state => vue.status = state);
};
