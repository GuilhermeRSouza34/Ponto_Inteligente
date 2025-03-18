import { io, Socket } from 'socket.io-client';

interface BusLocation {
    busId: string;
    latitude: number;
    longitude: number;
    timestamp: Date;
    speed: number;
}

class SocketService {
    private socket: Socket;
    private static instance: SocketService;

    private constructor() {
        this.socket = io('http://localhost:3000');
    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public subscribeToBusLocation(busId: string, callback: (location: BusLocation) => void) {
        this.socket.on(`bus:${busId}:location`, callback);
    }

    public unsubscribeFromBusLocation(busId: string) {
        this.socket.off(`bus:${busId}:location`);
    }

    public disconnect() {
        this.socket.disconnect();
    }
}

export default SocketService;