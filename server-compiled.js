'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Bear = require('./models/Bear');

var _Bear2 = _interopRequireDefault(_Bear);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.Promise = require('bluebird');

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

app.use('/', _express2.default.static(_path2.default.join(__dirname, "public")));

var port = process.env.PORT || 8080;
var router = _express2.default.Router();

_mongoose2.default.connection.openUri('mongodb://localhost/bears');

router.use(function (res, req, next) {
  console.log("something is happening");
  next();
});

router.get('/', function (req, res) {
  res.json({ message: "Hello, welcome to our api!" });
});

router.route('/bears').post(function (_ref, res) {
  var body = _ref.body;

  var bear = new _Bear2.default();
  bear.name = body.name;
  bear.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Bear is made, now is new Bear." });
    }
  });
}).get(function (req, res) {
  _Bear2.default.find(function (err, bears) {
    if (err) {
      res.send(err);
    } else {
      res.json(bears);
    }
  });
});

router.route('/bears/:bear_id').get(function (_ref2, res) {
  var params = _ref2.params;

  _Bear2.default.findById(params.bear_id, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      res.json(bear);
    }
  });
}).put(function (_ref3, res) {
  var params = _ref3.params,
      body = _ref3.body;

  _Bear2.default.findById(params.bear_id, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      bear.name = body.name;
      bear.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Bear was saved very good" });
        }
      });
    }
  });
}).delete(function (_ref4, res) {
  var params = _ref4.params;

  _Bear2.default.remove({
    _id: params.bear_id
  }, function (err, bear) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: "Now is dead bear." });
    }
  });
});

app.use('/api', router);

app.listen(port);
console.log('magic happens on port' + port);
