const express = require('express')
const router = require('./router/router')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const db = require('./model/model')

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'DatingApp'
  })
  .then(() => {
    console.log('--->>> Database Connected <<<---');
  })
  .catch((err) => {
    console.log('--->>> Database Disconnected <<<---');
    console.log(err);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
}
app.use(cors(corsOptions));

app.use('/', router);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))