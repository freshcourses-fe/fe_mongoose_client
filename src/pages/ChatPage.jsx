import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatActionCreators from '../redux/actions/chatActionCreators';

const ChatPage = () => {
  const { messages, isLoading } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ChatActionCreators.getMsgReq());
  }, []);
  return (
    <div>
      CHAT
      <ul>
        {messages.map(msg => (
          <li
            key={msg._id}
          >{`${msg.user.firstName} ${msg.user.lastName}: ${msg.text}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
