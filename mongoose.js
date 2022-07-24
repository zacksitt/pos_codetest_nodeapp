const mongoose = require('mongoose')

// mongodb_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/book_manager';
let mongodb_url = "mongodb://" + process.env.MONGO_HOST+ ":" + process.env.MONGO_PORT + "/" + process.env.MONGO_DATABASE + "?authSource=admin";
mongoose.connect(mongodb_url, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false,
    useUnifiedTopology: true
});