import React, { useEffect } from 'react';
import { test } from '../api/http';

const ChatPage = () => {

  useEffect(()=> {
    test()
  }, [])
  return (
    <div>
      CHAT
    </div>
  );
}

export default ChatPage;
