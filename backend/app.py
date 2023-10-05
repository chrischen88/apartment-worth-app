from flask import Flask, request, jsonify
import torch
from utils import ApartmentModel
from requests import get
import math

def calc_distance(lat1, long1, lat2, long2):
    lat1 = math.radians(lat1)
    long1 = math.radians(long1)
    lat2 = math.radians(lat2)
    long2 = math.radians(long2)
    dlat = lat2 - lat1
    dlong = long2 - long1
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlong / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return 3958.8 * c

areas_of_interest = [
    ('city_hall', 30.2642, -97.7476),
    ('domain', 30.4012, -97.7263),
    ('lake_travis', 30.4205, -97.9103),
    ('zilker', 30.2669, -97.7729),
    ('east_austin', 30.2585, -97.7287)
]

app = Flask(__name__)
model = ApartmentModel(12)
model.load_state_dict(torch.load('model_300.pth'))
model.eval()

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    coords = get('https://nominatim.openstreetmap.org/search?q=' + data['address'] + '&format=json').json()[0]
    coords = (float(coords['lat']), float(coords['lon']))
    distances = []
    for area in areas_of_interest:
        distances.append(calc_distance(coords[0], coords[1], area[1], area[2]))
    features = distances + [data['dogs_allowed'], data['cats_allowed'], data['trash_valet'], data['ev_charging'], data['washer_dryer'], data['stainless_steel_appliances'], data['bedrooms'], data['bathrooms'], data['sqft']]
    tensor = torch.tensor(features, dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        prediction = model(tensor)
    return jsonify({'prediction': prediction.item()})


app.run(port=5000)