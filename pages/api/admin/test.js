import {createReadStream} from 'fs'
import mongoose, { mongo } from "mongoose";
import Joint from "../../../models/Joints";

const handler = async(req, res) => {
    switch(req.method){
        case 'GET':
            mongo.MongoClient.connect(process.env.MONGO_URI, (err, client) => {
              const bucket = new mongo.GridFSBucket(client.db('theMenu'), {bucketName: 'Menus'})
              createReadStream('./temp/1633807193632.json').
              pipe(bucket.openUploadStream('1633807193632.json', {contentType: 'application/json'})).
              on('error', function(error) {
                console.log(error);
              }).
              on('finish', function() {
                console.log('done!');
                res.json({message: "hello"})
              });
            })
            break;
        case 'PUT':
            mongo.MongoClient.connect(process.env.MONGO_URI, (err, client) => {
                const bucket = new mongo.GridFSBucket(client.db('theMenu'), {bucketName: 'Menus'})
                bucket.delete(mongoose.Types.ObjectId(req.query.id), (err) => {
                    if(!err){
                        createReadStream('./temp/1633844086472.json').
                        pipe(bucket.openUploadStreamWithId(mongoose.Types.ObjectId(req.query.id), '1633844086472.json', {contentType: 'application/json'})).
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