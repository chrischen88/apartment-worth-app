import requests

def test():
    url = "http://localhost:5000/predict"
    body = {
        'address': '504 W 35 St',
        'dogs_allowed': 1,
        'cats_allowed': 1,
        'trash_valet': 0,
        'ev_charging': 0,
        'washer_dryer': 1,
        'stainless_steel_appliances': 1,
        'bedrooms': 3,
        'bathrooms': 2,
        'sqft': 1248
    }
    res = requests.post(url, json=body, headers={'Content-Type': 'application/json'})
    print(res.json())

test()