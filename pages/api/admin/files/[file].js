
import mongoose, { mongo } from "mongoose";



const handler = async(req, res) => {
  mongo.MongoClient.connect(process.env.MONGO_URI, (err, client) => {
    const bucket = new mongo.GridFSBucket(client.db('theMenu'), {bucketName: 'Menus'})
    const downloadStream = bucket.openDownloadStream(mongoose.Types.ObjectId(req.query.file) )
    downloadStream.pipe(res)
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;