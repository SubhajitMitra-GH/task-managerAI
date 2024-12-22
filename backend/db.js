const mongoose = require('mongoose');
// Ensure .env is loaded

const connectToDatabase = async () => {
    try {
        // Ensure DATABASE_URI is defined
        const uri = process.env.DATABASE_URI; // Fallback for local DB

        // Connect to MongoDB
        await mongoose.connect(uri, {
           
        });

        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error.message);
        process.exit(1); // Exit process if connection fails
    }
};

// Call the function to connect

// Export the connection function if needed elsewhere
module.exports = connectToDatabase;
