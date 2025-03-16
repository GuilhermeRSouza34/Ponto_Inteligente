import tensorflow as tf
import numpy as np
from typing import List, Dict
import joblib
from datetime import datetime

class AutoramaPrediction:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.history: List[Dict] = []
        self.history_size = 10

    def create_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(12, activation='relu', input_shape=(6,)),
            tf.keras.layers.Dense(8, activation='relu'),
            tf.keras.layers.Dense(1)
        ])
        
        model.compile(optimizer='adam', loss='mse')
        self.model = model

    def preprocess_data(self, data: Dict) -> np.ndarray:
        # Normalizar dados de entrada
        features = np.array([[
            data['distance'],
            data['speed'],
            data['time_of_day'],
            data['day_of_week'],
            data['track_condition'],
            data['traffic_level']
        ]])
        
        if self.scaler is None:
            self.scaler = joblib.load('scaler.pkl')
        
        return self.scaler.transform(features)

    def add_to_history(self, data: Dict):
        self.history.append(data)
        if len(self.history) > self.history_size:
            self.history.pop(0)

    def predict_arrival(self, current_data: Dict) -> float:
        if self.model is None:
            self.load_model()

        processed_data = self.preprocess_data(current_data)
        prediction = self.model.predict(processed_data)
        return float(prediction[0][0])

    def train(self, training_data: List[Dict]):
        X = []
        y = []

        for data in training_data:
            features = [
                data['distance'],
                data['speed'],
                data['time_of_day'],
                data['day_of_week'],
                data['track_condition'],
                data['traffic_level']
            ]
            X.append(features)
            y.append(data['actual_arrival_time'])

        X = np.array(X)
        y = np.array(y)

        if self.model is None:
            self.create_model()

        self.model.fit(X, y, epochs=10, batch_size=32, validation_split=0.2)

    def save_model(self):
        if self.model:
            self.model.save('autorama_model.h5')

    def load_model(self):
        try:
            self.model = tf.keras.models.load_model('autorama_model.h5')
        except:
            self.create_model()

# Uso no código principal do autorama
predictor = AutoramaPrediction()

def update_prediction(sensor_data):
    current_data = {
        'distance': sensor_data.distance,
        'speed': sensor_data.speed,
        'time_of_day': datetime.now().hour,
        'day_of_week': datetime.now().weekday(),
        'track_condition': sensor_data.track_condition,
        'traffic_level': len(sensor_data.other_vehicles)
    }

    predictor.add_to_history(current_data)
    estimated_arrival = predictor.predict_arrival(current_data)
    return estimated_arrival 