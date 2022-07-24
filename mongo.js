const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const assert = require('assert');
var database = process.env.MONGO_DATABASE;

let connect_db = async function(url = null, db_name = null){
    
    url = "mongodb://" + process.env.MONGO_HOST+ ":" + process.env.MONGO_PORT + "/admin";
    const client = await MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true})
    .catch(err => { console.log(err); });
    if (!client) {
        return;
    }
    return client;
}

let getID = async function(collection){
    
    let client;
    let broadcastid = 1;
    try {

        client = await connect_db();
        const db = client.db(process.env.MONGO_DATABASE);
        let res = await db.collection('_data_counters')
            .findOneAndUpdate(
                {
                    "model":collection
                },
                {
                    "$inc":{'seq':1},
                },
                {
                 new : true,
                 upsert: true,
                 returnNewDocument:true
                }
                );
        if(res.value){
            broadcastid = res.value.seq + 1 ;
        }        

    } catch (err) {

        console.log(err);
    } finally {

        client.close();
    }

    return broadcastid;
}
module.exports = {

    connect_db:connect_db,
    getID
}