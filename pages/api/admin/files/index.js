import mongoose from "mongoose";
import crypto from 'crypto'
import path from 'path'
import Grid from 'gridfs-stream';
import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import nextConnect from 'next-connect'

const handler = async(req, res) => {
    const conn = await mongoose.createConnection(process.env.MONGO_URI)
    var gfs
    conn.once('open', () => {
        gfs = Grid(conn.db, mongoose.mongo)
        gfs.collection('Menus')

        const {method} = req;
        res.setHeader('Access-Control-Allow-Origin', '*')
        switch(method){
            case 'GET':
                gfs.files.find().toArray((err, files) => {
                    if(!files || files.length===0){
                        return res.status(404).json({
                            err: "No files exist."
                        })
                    }

                    return res.json(files)
                })
                break;
            default:
                res.status(400).json({err: "Bad Request"})
                break;
        }
    })
}

export default handler

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
}