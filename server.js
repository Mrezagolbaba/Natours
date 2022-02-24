const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// Start Server
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
