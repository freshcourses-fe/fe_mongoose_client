import { put, takeLatest } from 'redux-saga/effects';
import * as HTTP_API from '../../api/http';
import * as WS_API from '../../api/ws';
import ChatActionCreators from '../actions/chatActionCreators';
import ACTION_TYPES from '../actions/types';

function * getMsgsSaga (action) {
  try {
    const {
      data: { data: messages },
    } = yield HTTP_API.getMessages();

    yield put(ChatActionCreators.getMsgSuccess(messages));
  } catch (error) {
    yield put(ChatActionCreators.getMsgErr(error));
  }
}

function * createMsgSaga (action) {
  try {
    yield WS_API.createMsg(action.payload);
  } catch (error) {
    yield put(ChatActionCreators.createMsgErr(error));
  }
}

export default function * chatSagas () {
  yield takeLatest(ACTION_TYPES.GET_MESSAGES_REQ, getMsgsSaga);
  yield takeLatest(ACTION_TYPES.CREATE_MESSAGE_REQ, createMsgSaga);
}
