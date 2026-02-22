import { io } from 'socket.io-client';
import filter from 'leo-profanity';

filter.loadDictionary('en');
const socket = io();

export default socket;
export { filter };