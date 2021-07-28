import { MongoClient } from 'mongodb';

// POST /api/new-meetup
async function handler(req, res) {
    if (req.method === 'POST') {    //error handling shud be added here
        const data = req.body;
        
        //const { title, image, address, description } = data;

        const client = await MongoClient.connect("mongodb+srv://ekdemoM4ster:wGKChip6aYZaDaoj@cluster0.bj3w0.mongodb.net/ekdemo?authSource=admin&replicaSet=atlas-lry272-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");
        const db = client.db();

        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        
        console.log(result);
        client.close();

        res.status(201).json({message: 'Meetup created'});
    }
}

export default handler;