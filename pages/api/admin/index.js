import mongoose from "mongoose";
import crypto from 'crypto'
import path from 'path'
import Grid from 'gridfs-stream';
import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import nextConnect from 'next-connect'


const conn = mongoose.createConnection(process.env.MONGO_URI, {useMongoClient: true})
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('Menus')
})


const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = Date.now() + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'Menus'
                };
                resolve(fileInfo);
            });
        });
    }
});


const upload = multer({ storage });

const apiRoute = nextConnect({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.single('file'))
apiRoute.post((req,res) => {
    res.status(200).json({file: req.file})
    // res.redirect('/admin')
})

export default apiRoute;

// const handler = async(req, res) => {
//     await upload.single('file')
//     const {method} = req;
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     switch(method){
//         case 'POST':
//             res.json({file: req.file})
//             break;
//         default:
//             res.status(400).json({message: "Bad Request."});
//             break;
//     }
// }

// export default handler

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}