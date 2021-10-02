import dbConnect from "../../../utils/dbConnect";
import mongoose, { mongo } from "mongoose";


dbConnect();

const handler = async (req, res) => {
    const { method, query: { mid }} = req;
    res.setHeader('Access-Control-Allow-Origin', '*')

    switch(method){
        case 'GET':
            // Menu.findById(mid, async (err, menu) => {
            //     if(!err){
            //         const lazyMenu = await menu
            //         const size = await Menu.aggregate([
            //             {
            //                 "$project": {
            //                     "size": {$bsonSize: "$$ROOT"}
            //                 }
            //             }
            //         ])
            //         console.log(size)
            //         res.status(200).json({data: lazyMenu, size})
            //     } else {
            //         res.status(500).json({message: "Internal Server Error."})
            //     }
            // })
            mongo.MongoClient.connect(process.env.MONGO_URI, (err, client) => {
                const bucket = new mongo.GridFSBucket(client.db('theMenu'), {bucketName: 'Menus'})
                const downloadStream = bucket.openDownloadStream(mongoose.Types.ObjectId(mid) )
                downloadStream.pipe(res)
            })
            break;
        default: 
        res.status(500).json({message: "Bad Request."})
    }
}

export const config = {
    api: {
      bodyParser: false,
    },
};

export default handler