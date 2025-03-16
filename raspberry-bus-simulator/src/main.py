import time
import paho.mqtt.client as mqtt
import json
import random
from gps import GPS
from motor import Motor
from ai_prediction import AutoramaPrediction, update_prediction

class SmartAutorama:
    def __init__(self):
        self.predictor = AutoramaPrediction()
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.connect("localhost", 1883, 60)
        self.gps = GPS()
        self.motor = Motor()
        
        self.bus_id = "BUS001"
        self.route = {
            "start": {"lat": -23.550520, "lng": -46.633308},
            "end": {"lat": -23.555520, "lng": -46.638308}
        }

        # Carregar modelo pré-treinado
        self.predictor.load_model()

    def start_monitoring(self):
        while True:
            # Coletar dados dos sensores
            sensor_data = self.collect_sensor_data()
            
            # Atualizar previsão
            estimated_arrival = update_prediction(sensor_data)
            
            # Publicar dados
            self.publish_data(sensor_data, estimated_arrival)
            
            time.sleep(0.1)  # 100ms de intervalo

    def collect_sensor_data(self):
        return {
            'distance': self.gps.get_distance_to_next_stop(),
            'speed': self.motor.get_speed(),
            'track_condition': self.get_track_condition(),
            'other_vehicles': self.detect_other_vehicles()
        }

    def get_track_condition(self):
        # Implementar leitura de sensores de condição da pista
        pass

    def detect_other_vehicles(self):
        # Implementar detecção de outros veículos na pista
        pass

    def publish_data(self, sensor_data, estimated_arrival):
        message = {
            'bus_id': self.bus_id,
            'sensor_data': sensor_data,
            'estimated_arrival': estimated_arrival,
            'timestamp': time.time()
        }
        self.mqtt_client.publish('autorama/bus/status', json.dumps(message))

if __name__ == "__main__":
    autorama = SmartAutorama()
    autorama.start_monitoring() 