import express from 'express';

const home = express.Router();

home.get('/', (req, res) => {
  res.send('auth')
});

export default home;
