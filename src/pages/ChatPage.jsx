import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatActionCreators from '../redux/actions/chatActionCreators';

const initialValues = {
  text: '',
};

const ChatPage = () => {
  const { messages, isLoading } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ChatActionCreators.getMsgReq());

    return () => {
      dispatch(ChatActionCreators.clearChat());
    };
  }, []);

  const onSubmit = ({ text }, utils) => {
    dispatch(ChatActionCreators.createMsgReq({ text, user: user._id }));
    utils.resetForm();
  };

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
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <Field name='text' />
          <button>Send message</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatPage;
