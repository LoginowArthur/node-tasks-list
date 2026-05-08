import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function connectDatabase() {
    try {
        await client.connect();
        const database = client.db('local_development');
        const collection = database.collection('system_logs');

        const adminDb = client.db().admin();
        const { databases } = await adminDb.listDatabases();
        
        console.log("--- Server Databases ---");
        console.table(databases);
        
        // const newEntry = {
        //     timestamp: new Date(),
        //     level: 'info',
        //     message: 'Database connection verified',
        //     metadata: {
        //         environment: 'development',
        //         source: 'node-application'
        //     }
        // };

        // const insertResult = await collection.insertOne(newEntry);
        
        // if (insertResult.acknowledged) {
        //     console.log(`Document inserted successfully. ID: ${insertResult.insertedId}`);

        //     // 4. Verify Entry Retrieval
        //     const verifiedEntry = await collection.findOne({ _id: insertResult.insertedId });
            
        //     if (verifiedEntry) {
        //         console.log('Verification successful: Document retrieved from collection.');
        //         return verifiedEntry;
        //     } else {
        //         throw new Error('Verification failed: Document not found after insertion.');
        //     }
        // }
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await client.close();
    }
}

connectDatabase();