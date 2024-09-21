from flask import Flask, request, json
from flask-cors import CORS



app = Flask(__name__)

CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>" 

from mongo import db
from mongo import certificate_collection


@app.route("/certificate", methods=['POST','GET'])
def certificateHandler():
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

@app.route("/buy", methods=['POST'])
def buyHandler():
    amount = int((request.args.get("amount")))
    type = request.args.get("type")

    certs = certificate_collection.find({"type": type})
    print(amount)
    print(type)
    for cert in certs:
        print(cert)
        if(amount != 0):
            qty = cert.get("qty")
            print("qty:"+str(qty))
            if qty > amount:
                certificate_collection.update_one(
                    {"_id": cert.get("_id")},
                    {"$set": {"qty": qty - amount}}
                )
                amount = 0
                print(qty + "-" + str(amount))
            else:
                certificate_collection.delete_one(
                    {"_id": cert.get("_id")}
                )
                print("delete " + str(qty))
                amount -= qty
            print("amount: " + str(amount))
    return {"remainder": amount}

@app.route("/userCertificates", methods=['GET'])
def userCertsHandler():
    user = request.args.get(("user"))
    certs = certificate_collection.find(
        {"owner": user}
    )
    print(certs)
    list = []
    for cert in certs:
        cert["_id"]= str(cert["_id"])
        list.append(cert)
    return {"list": list}
