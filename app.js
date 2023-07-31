const express = require('express')
const router = require('./router/router')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const db = require('./model/model')
const passport = require('passport')
const session = require('express-session')
const app = express()

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

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
}
app.use(cookieParser('secretcode'));
app.use(cors(corsOptions));
app.use(session({
  secret: 'aksfskldgfjskfkjhb',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 99999999999999 }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))