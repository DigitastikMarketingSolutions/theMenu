import dbConnect from "../../../utils/dbConnect";
import Joint from "../../../models/Joints";

dbConnect();

const handler = async (req, res) => {
    const { method, query: { jid, type }} = req;
    console.log(method, jid)
    res.setHeader('Access-Control-Allow-Origin', '*')

    switch(method){
        case 'PUT':
            Joint.findById(jid, (err, joint) => {
                const date = [new Date().toDateString().split(' ')[1],new Date().toDateString().split(' ')[3]].join('')
                const newTraffic = {...JSON.parse(JSON.stringify(joint)).traffic}
                newTraffic[date][type] += 1
                if(!err){
                    Joint.findOneAndUpdate({_id: jid}, {traffic: newTraffic }, {new: true}, (err, update) => {
                        if(!err){
                            res.status(200).json({data: joint, message: "Traffic updated"})
                        } else {
                            res.status(200).json({data: joint, message: "Traffic could not be updated"})
                        }
                    })
                } else {
                    res.status(500).json({message: "Internal Server Error."})
                }
            })
            break;
        case 'GET':
            Joint.findById(jid, (err, joint) => {
                if(!err){
                    res.status(200).json(joint)
                } else {
                    res.status(500).json({message: "Internal Server Error."})
                }
            })
            break;
        default: 
            res.status(400).json({message: "Bad Request."})
            break;
    }
}

export default handler