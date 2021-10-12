import dbConnect from "../../../utils/dbConnect";
import Joint from "../../../models/Joints";

dbConnect();

const handler = async (req, res) => {
    const {method} = req;
    // console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', '*')
    switch(method){
        case 'GET':
            if(req.query.type==="restaurant"){
                Joint.find({type: {$eq: "restaurant"}}, (err, joints) => {
                    if(!err){
                        res.status(200).json(joints)
                    } else {
                        res.status(500).json({message: "Internal Server Error."})
                    }
                })
            } else if(req.query.type==="bakery"){
                Joint.find({type: {$eq: "bakery"}}, (err, joints) => {
                    if(!err){
                        res.status(200).json(joints)
                    } else {
                        res.status(500).json({message: "Internal Server Error."})
                    }
                })
            } else if(req.query.type==="cafe"){
                Joint.find({type: {$eq: "cafe"}}, (err, joints) => {
                    if(!err){
                        res.status(200).json(joints)
                    } else {
                        res.status(500).json({message: "Internal Server Error."})
                    }
                })
            } else if(req.query.type==="tapri"){
                Joint.find({type: {$eq: "tapri"}}, (err, joints) => {
                    if(!err){
                        res.status(200).json(joints)
                    } else {
                        res.status(500).json({message: "Internal Server Error."})
                    }
                })
            } else if(req.query.type==="cloud"){
                Joint.find({type: {$eq: "cloud"}}, (err, joints) => {
                    if(!err){
                        res.status(200).json(joints)
                    } else {
                        res.status(500).json({message: "Internal Server Error."})
                    }
                })
            } else {
                Joint.find((err, joints) => {
                    if(!err){
                        res.status(200).json(joints)
                    } else {
                        res.status(500).json({message: "Internal Server Error."})
                    }
                })
            }
            break;
        default:
            res.status(400).json({message: "Bad Request."});
            break;
    }
}

export default handler;