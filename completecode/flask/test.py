from flask import Flask
from flask_cors import CORS

import pymongo
import time
app = Flask(__name__)
cors = CORS(app)


@app.route('/calculateRoute')

def get_current_time():
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    mydb = myclient["mydatabase"]
    mycol = mydb["customers"]

    mydict = { "name": "John", "address": "Highway 37" }

    mycol.insert_one(mydict)
    return {'time': time.time()}