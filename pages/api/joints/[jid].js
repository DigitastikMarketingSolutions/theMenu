import dbConnect from "../../../utils/dbConnect";
import Joint from "../../../models/Joints";

dbConnect();

const handler = async (req, res) => {
    const { method, query: { jid }} = req;
    console.log(method, jid)
    res.setHeader('Access-Control-Allow-Origin', '*')

    switch(method){
        case 'GET':
            Joint.findById(jid, (err, joint) => {
                const date = [new Date().toDateString().split(' ')[1],new Date().toDateString().split(' ')[3]].join('')
                const newTraffic = {...JSON.parse(JSON.stringify(joint)).traffic}
                newTraffic[date] = JSON.parse(JSON.stringify(joint)).traffic[date] + 1
                console.log(newTraffic)
                if(!err){
                    Joint.findOneAndUpdate({_id: jid}, { $set: {traffic: newTraffic} }, {new: true}, (err, update) => {
                        if(!err){
                            console.log(update)
                            res.status(200).json({data: joint, message: "Traffic updated"})
                        } else {
                            res.status(500).json({data: joint, message: "Traffic could not be updated"})
                        }
                    })
                } else {
                    res.status(500).json({message: "Internal Server Error."})
                }
            })
            break;
        case 'PUT':
            Joint.findByIdAndUpdate(jid, {$inc: { traffic: 1 }}, (err, update) => {
                if(!err){
                    res.status(200).json({message: "Traffic updated"})
                } else {
                    res.status(500).json({message: "Internal Server Error."})
                }
            })
        default: 
        res.status(400).json({message: "Bad Request."})
    }
}

export default handler