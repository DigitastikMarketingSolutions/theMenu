import {createReadStream} from 'fs'
import mongoose, { mongo } from "mongoose";
import dbConnect from "../../../utils/dbConnect";

const handler = async(req, res) => {
  await dbConnect();
    res.setHeader('Access-Control-Allow-Origin', '*')
    switch(req.method){
        case 'GET':
            mongo.MongoClient.connect(process.env.MONGO_URI, (err, client) => {
              if(!err){
                const bucket = new mongo.GridFSBucket(client.db('theMenu'), {bucketName: 'Menus'})
                createReadStream('./temp/1637059797463.json').
                pipe(bucket.openUploadStream('1637059797463.json', {contentType: 'application/json'})).
                on('error', function(error) {
                  console.log(error);
                }).
                on('finish', function(data) {
                  console.log('done!');
                  res.status(200).json(data)
                });
              } else {
                res.status(500).json({err: err})
              }
            })
            break;
        case 'PUT':
            mongo.MongoClient.connect(process.env.MONGO_URI, (err, client) => {
                const bucket = new mongo.GridFSBucket(client.db('theMenu'), {bucketName: 'Menus'})
                bucket.delete(mongoose.Types.ObjectId(req.query.id), (err) => {
                    if(!err){
                        createReadStream('./temp/1637059797463.json').
                        pipe(bucket.openUploadStreamWithId(mongoose.Types.ObjectId(req.query.id), '1637059797463.json', {contentType: 'application/json'})).
                        on('error', function(error) {
                          console.log(error);
                        }).
                        on('finish', function() {
                          console.log('done!');
                          res.json({message: "hello"})
                        });
                    } else {
                        console.log(err)
                    }
                })
            })
            break;
        default:
            res.status(400).json({message: "Bad Request."})
            break;
    }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;









// MONGO_URI="mongodb+srv://Godlu1505:Dglaiihac1@cluster1.uerj9.mongodb.net/theMenu?retryWrites=true&w=majority"