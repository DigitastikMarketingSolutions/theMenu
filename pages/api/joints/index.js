import dbConnect from "../../../utils/dbConnect";
import Joint from "../../../models/Joints";

dbConnect();

export default async (req, res) => {
    const {method} = req;
    res.setHeader('Access-Control-Allow-Origin', '*')
    switch(method){
        case 'GET':
            Joint.find((err, joints) => {
                if(!err){
                    res.status(200).json(joints)
                } else {
                    res.status(500).json({message: "Internal Server Error."})
                }
            })            
            break;
        default:
            res.status(400).json({message: "Bad Request."});
            break;
    }
}