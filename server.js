import express from 'express';
const app = express();
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

import Thought from './models/Thought';

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'src')));

const port = process.env.PORT || 8080;
const router = express.Router();

mongoose.connection.openUri('mongodb://localhost/thoughts');

router.use((res, req, next) => {
  console.log("something is happening");
  next();
});

router.get('/', (req, res) => {
  res.json({ message: "Hello, welcome to our api!"});
});

router.route('/thoughts')
  .post(({body}, res) => {
    const thought = new Thought();
    thought.title = body.name;
    thought.body = body.body;
    thought.author = body.author;
    thought.save(err => {
      if(err){
        res.send(err);
      } else {
        res.json({ message: "New Thought." });
      }
    });
  })

  .get((req, res) => {
    Thought.find((err, thoughts) => {
      if(err) {
        res.send(err);
      } else {
        res.json(thoughts);
      }
    });
  });

router.route('/bears/:thought_id')

  .get(({params}, res) => {
    Thought.findById(params.thought_id, (err, thought) => {
      if(err) {
        res.send(err);
      } else {
        res.json(thought);
      }
    });
  })

  .put(({params, body}, res) => {
    Thought.findById(params.bear_id, (err, thought) => {
      if(err) {
        res.send(err);
      } else {
        thought.name = body.name;
        thought.save(err => {
          if(err) {
            res.send(err);
          } else {
            res.json({ message: "Updated Thought." });
          }
        });
      }
    });
  })

  .delete(({params}, res) => {
    Thought.remove({
      _id: params.thought_id
    }, (err, bear) => {
      if(err) {
        res.send(err);
      } else {
        res.json({ message: "Forgot a thought."});
      }
    });
  });

app.use('/api', router);

app.listen(port);
console.log(`magic happens on port${port}`);
