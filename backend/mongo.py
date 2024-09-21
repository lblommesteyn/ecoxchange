from flask import Flask
from flask_pymongo import pymongo
from ecoXchange import app
from certifi import where

CONNECTION_STRING = "mongodb+srv://justinhltzemail:pennApps@ecoexchange.ngho8.mongodb.net/?retryWrites=true&w=majority&appName=EcoExchange"

client = pymongo.MongoClient(CONNECTION_STRING, tls=True, tlsCAFile=where())
db = client.get_database('EcoExchangeDB')

certificate_collection = db.get_collection('Certs')


