from flask import Flask, request, json

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>" 

from mongo import db
# from mongo import certificate_collection


@app.route("/certificate", methods=['POST','GET'])
def uploadCert():
    certificate_collection = db["Certs"]
    if(request.method == 'POST'):
        body = json.loads(request.data)
        print(body)
        certificate_collection.insert_one({
            "type": body.get("type"),
            "owner": body.get("owner"),
            "qty": body.get("qty")
        })
        return "Success"
    else: 
        aggr = certificate_collection.aggregate([
            {
                "$group": { "_id": "$type", "totalQuantity": { "$sum": "$qty" } }
            }
        ])
        list = []
        #i don't even know
        for document in aggr:
            print(document)
            list.append(document)
        return list