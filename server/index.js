import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const http = createServer(app);
const io = new Server(http, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

const PORT = 3000;

// Dados simulados
const mockRoutes = [
    {
        id: '1',
        number: '123',
        name: 'Terminal Central → Shopping',
        stops: [
            { id: '1', name: 'Terminal Central', latitude: -23.550520, longitude: -46.633308 },
            { id: '2', name: 'Ponto 2', latitude: -23.552520, longitude: -46.635308 },
            { id: '3', name: 'Shopping', latitude: -23.555520, longitude: -46.638308 }
        ],
        currentLocation: {
            latitude: -23.551520,
            longitude: -46.634308
        }
    },
    // ... outros ônibus
];

app.get('/api/routes', (req, res) => {
    res.json(mockRoutes);
});

// Simular movimento dos ônibus
setInterval(() => {
    mockRoutes.forEach(route => {
        if (route.currentLocation) {
            route.currentLocation.latitude += (Math.random() - 0.5) * 0.001;
            route.currentLocation.longitude += (Math.random() - 0.5) * 0.001;
            
            io.emit(`bus:${route.id}:location`, {
                busId: route.id,
                ...route.currentLocation,
                timestamp: new Date(),
                speed: 30 + Math.random() * 20
            });
        }
    });
}, 3000);

http.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});