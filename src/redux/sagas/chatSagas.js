import { put, takeLatest } from 'redux-saga/effects';
import * as HTTP_API from '../../api/http';
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

function * createMsgSaga (action) {}

export default function * chatSagas () {
  yield takeLatest(ACTION_TYPES.GET_MESSAGES_REQ, getMsgsSaga);
  yield takeLatest(ACTION_TYPES.CREATE_MESSAGE_REQ, createMsgSaga);
}
