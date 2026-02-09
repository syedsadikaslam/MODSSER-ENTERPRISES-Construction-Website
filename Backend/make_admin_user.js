require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user.model');

const makeAdmin = async () => {
    // Check for MONGO_URI
    if (!process.env.MONGO_URI) {
        console.error('❌ Error: MONGO_URI is not defined in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Get email from command line arguments
        const email = process.argv[2];

        if (!email) {
            console.error('❌ Error: Please provide an email address.');
            console.log('Usage: node make_admin_user.js <user_email>');
            process.exit(1);
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            console.error(`❌ Error: User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`✅ Success! User ${user.name} (${user.email}) is now an Admin.`);

    } catch (error) {
        console.error('❌ An error occurred:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

makeAdmin();
