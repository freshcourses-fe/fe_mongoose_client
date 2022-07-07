import ACTION_TYPES from './types';

class ChatActionCreators {
  static getMsgReq () {
    return {
      type: ACTION_TYPES.GET_MESSAGES_REQ,
    };
  }
  static getMsgSuccess (messages) {
    return {
      type: ACTION_TYPES.GET_MESSAGES_SUCCESS,
      payload: messages,
    };
  }
  static getMsgErr (err) {
    return {
      type: ACTION_TYPES.GET_MESSAGES_ERR,
      payload: err,
    };
  }
  static createMsgReq (message) {
    return {
      type: ACTION_TYPES.CREATE_MESSAGE_REQ,
      payload: message,
    };
  }
  static createMsgSuccess (message) {
    return {
      type: ACTION_TYPES.CREATE_MESSAGE_SUCCESS,
      payload: message,
    };
  }
  static createMsgErr (err) {
    return {
      type: ACTION_TYPES.CREATE_MESSAGE_ERR,
      payload: err,
    };
  }
}
export default ChatActionCreators;
