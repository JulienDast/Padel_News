const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) =>{
  res.status(200).send(res.locals.user._id)
})

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
})