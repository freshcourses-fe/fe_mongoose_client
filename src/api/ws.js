import { io } from 'socket.io-client';
import CONSTANTS from '../constants';
import store from '../redux';
import ChatActionCreators from '../redux/actions/chatActionCreators';

const socket = io(CONSTANTS.WS_SERVER_URL, {
  transports: ['websocket', 'polling'],
});

export const createMsg = message =>
  socket.emit(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE, message);

socket.on(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE, message => {
  console.log(message)
  store.dispatch(ChatActionCreators.createMsgSuccess(message));
});

socket.on(CONSTANTS.SOCKET_EVENTS.NEW_MESSAGE_ERROR, err => {
  store.dispatch(ChatActionCreators.createMsgErr(err));
});
