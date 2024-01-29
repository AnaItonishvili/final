const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

const dbConnection = require('./db/conn');

(async () => {
    try {
        await dbConnection.initializeConnection();
        const blogRoutes = require('./routes/blog');
        app.use('/api', blogRoutes);

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
})();
