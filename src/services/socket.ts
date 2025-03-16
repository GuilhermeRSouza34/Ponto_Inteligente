import io from 'socket.io-client';
import { BusLocation } from '../types';

const SOCKET_URL = 'http://your-api-url.com';

class SocketService {
  private socket: any;

  connect() {
    this.socket = io(SOCKET_URL);
    
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
  }

  subscribeToBusUpdates(busId: string, callback: (location: BusLocation) => void) {
    this.socket.on(`bus:${busId}:location`, callback);
  }

  unsubscribeFromBusUpdates(busId: string) {
    this.socket.off(`bus:${busId}:location`);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketService(); 