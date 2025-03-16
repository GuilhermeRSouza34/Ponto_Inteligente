import * as tf from '@tensorflow/tfjs';
import { BusLocation } from '../../types';

interface TrainingData {
  distance: number;
  speed: number;
  timeOfDay: number;
  dayOfWeek: number;
  weather: number;
  trafficLevel: number;
  actualArrivalTime: number;
}

export class PredictionService {
  private model: tf.LayersModel | null = null;
  private readonly historySize = 10; // Quantidade de pontos históricos para previsão
  private locationHistory: BusLocation[] = [];

  async initialize() {
    // Criar modelo sequencial
    this.model = tf.sequential({
      layers: [
        tf.layers.dense({ inputShape: [6], units: 12, activation: 'relu' }),
        tf.layers.dense({ units: 8, activation: 'relu' }),
        tf.layers.dense({ units: 1 })
      ]
    });

    // Compilar modelo
    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError'
    });
  }

  // Adicionar nova localização ao histórico
  addLocation(location: BusLocation) {
    this.locationHistory.push(location);
    if (this.locationHistory.length > this.historySize) {
      this.locationHistory.shift();
    }
  }

  // Treinar modelo com novos dados
  async train(trainingData: TrainingData[]) {
    if (!this.model) return;

    const inputs = trainingData.map(data => [
      data.distance,
      data.speed,
      data.timeOfDay,
      data.dayOfWeek,
      data.weather,
      data.trafficLevel
    ]);

    const outputs = trainingData.map(data => [data.actualArrivalTime]);

    const xs = tf.tensor2d(inputs);
    const ys = tf.tensor2d(outputs);

    await this.model.fit(xs, ys, {
      epochs: 10,
      batchSize: 32,
      validationSplit: 0.2
    });

    xs.dispose();
    ys.dispose();
  }

  // Prever tempo de chegada
  async predictArrivalTime(currentData: {
    distance: number;
    speed: number;
    timeOfDay: number;
    dayOfWeek: number;
    weather: number;
    trafficLevel: number;
  }): Promise<number> {
    if (!this.model) return 0;

    const input = tf.tensor2d([[
      currentData.distance,
      currentData.speed,
      currentData.timeOfDay,
      currentData.dayOfWeek,
      currentData.weather,
      currentData.trafficLevel
    ]]);

    const prediction = await this.model.predict(input) as tf.Tensor;
    const result = await prediction.data();

    input.dispose();
    prediction.dispose();

    return result[0];
  }

  // Salvar modelo treinado
  async saveModel() {
    if (!this.model) return;
    await this.model.save('localstorage://bus-prediction-model');
  }

  // Carregar modelo salvo
  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('localstorage://bus-prediction-model');
    } catch (error) {
      console.error('Erro ao carregar modelo:', error);
      await this.initialize();
    }
  }
}

export const predictionService = new PredictionService(); 