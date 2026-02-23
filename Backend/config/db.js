const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,           // no longer needed in mongoose >=6
  // useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });

mongoose.connection.on('connected', () => console.log('Mongoose: connected'));
mongoose.connection.on('error', err => console.error('Mongoose: error', err.message));
mongoose.connection.on('disconnected', () => console.log('Mongoose: disconnected'));