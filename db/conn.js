const { MongoClient } = require('mongodb');
const uri = process.env.ATLAS_URI;

let _db;

module.exports = {
    initializeConnection: async () => {
        const client = new MongoClient(uri);
        try {
            await client.connect();
            _db = client.db("data");
            console.log('Connected to MongoDB');
        } catch (err) {
            console.error('Error connecting to MongoDB:', err);
            throw err;
        }
    },
    getDb: () => {
        if (!_db) {
            throw new Error('Database is not connected. Call initializeConnection() first.');
        }
        return _db;
    },
};
