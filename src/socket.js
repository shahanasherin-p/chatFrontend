import io from 'socket.io-client';
import store from './redux/chatStore';
import { addMessage } from './redux/chatSlice';

const socket = io('https://chatserver-k4cs.onrender.com');

socket.on('message', (message) => {
  store.dispatch(addMessage(message));
});

export const sendMessage = (message) => {
  socket.emit('message', message);
};

export default socket;