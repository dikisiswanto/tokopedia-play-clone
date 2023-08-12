/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { SOCKET_URL } from '@/lib/config';

const useSocket = () => {
  const [comments, setComments] = useState([]);
  const socket = io(SOCKET_URL);

  useEffect(() => {
    socket.connect();

    const onCommentEvent = (comment) => {
      setComments((prevComments) => [comment, ...prevComments]);
    };

    socket.on('connect', () => {
      console.info('Socket connected successfully');
    });

    socket.on('comment', onCommentEvent);

    return () => {
      socket.off('comment', onCommentEvent);
      socket.off('connect');
      socket.disconnect();
    };
  }, []);

  const sendComment = (comment) => {
    socket.emit('comment', comment);
  };

  const setInitialComments = (initialComments) => {
    setComments(initialComments);
  };

  return { comments, sendComment, setInitialComments };
};

export default useSocket;
