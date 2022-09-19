import express, { Express } from 'express';
import dotenv from 'dotenv';


dotenv.config();

export const app: Express = express();
const port = 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async (req, res) =>{
  try {
      res.json('Test endpoint')
  } catch(error) {
      return res.status(500).end();
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

