import produce from 'immer';
import ACTION_TYPES from '../actions/types';

const initialState = {
  messages: [],
  isLoading: false,
  err: null,
};

export default function chatReducer (state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.CLEAR_CHAT: return {
      ...initialState
    }
    case ACTION_TYPES.CREATE_MESSAGE_REQ:
    case ACTION_TYPES.GET_MESSAGES_REQ:
      return produce(state, draftState => {
        draftState.isLoading = true;
      });
    case ACTION_TYPES.GET_MESSAGES_SUCCESS:
      return produce(state, draftState => {
        draftState.isLoading = false;
        draftState.messages.push(...action.payload);
      });
    case ACTION_TYPES.CREATE_MESSAGE_SUCCESS:
      return produce(state, draftState => {
        draftState.isLoading = false;
        draftState.messages.push(action.payload);
      });
    case ACTION_TYPES.GET_MESSAGES_ERR:
    case ACTION_TYPES.CREATE_MESSAGE_ERR:
      return produce(state, draftState => {
        draftState.isLoading = false;
        draftState.err = action.payload;
      });
    default:
      return state;
  }
}
