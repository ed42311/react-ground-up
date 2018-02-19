import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
mongoose.Promise = require('bluebird');

import Bear from './models/Bear';

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/',express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 8080;
const router = express.Router();

mongoose.connection.openUri('mongodb://localhost/bears');

router.use((res, req, next) => {
  console.log("something is happening");
  next();
});

router.get('/', (req, res) => {
  res.json({ message: "Hello, welcome to our api!"});
});

router.route('/bears')

  .post(({body}, res) => {
    const bear = new Bear();
    bear.name = body.name;
    bear.save(err => {
      if(err){
        res.send(err);
      } else {
        res.json({ message: "Bear is made, now is new Bear." });
      }
    });
  })

  .get((req, res) => {
    Bear.find((err, bears) => {
      if(err) {
        res.send(err);
      } else {
        res.json(bears);
      }
    });
  });

router.route('/bears/:bear_id')

  .get(({params}, res) => {
    Bear.findById(params.bear_id, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json(bear);
      }
    });
  })

  .put(({params, body}, res) => {
    Bear.findById(params.bear_id, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        bear.name = body.name;
        bear.save(err => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: "Bear was saved very good" });
          }
        });
      }
    });
  })

  .delete(({params}, res) => {
    Bear.remove({
      _id: params.bear_id
    }, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "Now is dead bear."});
      }
    });
  });

app.use('/api', router);

app.listen(port);
console.log(`magic happens on port${port}`);
