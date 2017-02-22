var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var sanitizerPlugin = require('mongoose-sanitizer');

var auth = require('./users').check;

// The Schema
var ThingSchema = new mongoose.Schema({
    title: String,
    autor: String,
    url: String, 
    avaliable:  {
        type: Number,
        default: 0,
        min: 0,
        max: 2
    }
});
ThingSchema.plugin(sanitizerPlugin);


// The connection
var Thing = mongoose.model('Thing', ThingSchema);


// Get things
router.get('/', auth, function(req, res, next) {
  var av = {$lte: 1}; var query={};
  if (req.query.avaliable && req.query.avaliable != 2) {
      av = req.query.avaliable;
  }

  if (req.query.filter) {
      query = {
          $and: [
              {
              $or: [
                  {autor: new RegExp(req.query.filter, 'i')},
                  {title: new RegExp(req.query.filter, 'i')}
              ]
              },
              {avaliable: av}
          ]
      }
  } else {
      query = {
          avaliable: av
      }
  }

  Thing.find(query, function (err, things) {
        if (err) {
            return next(err);
        } else {
            return res.json(things)
        }
  })
});

// Create thing
router.post('/', auth, function (req, res, next) {
    if (req && req.decoded && req.decoded._doc &&  req.decoded._doc.rol == 1){
        var body = eval(req.body);

        if (body && body.has('title') && body.has('autor') && body.has('url')) {
            var instance = new Thing();

            instance.title = body.title;
            instance.autor = body.autor;
            instance.url = body.url;

            instance.save(function (err, data) {
                if (err) {
                    res.json({sucess: false, message: err.message})
                } else {
                    res.json({sucess: true, data: data})
                }
            });
        } else {
            res.status(400).json({sucess: false, message: 'No valid parameters'})
        }
    } else {
        res.status(403).json({sucess: false, message: 'No authentification provided'})
    }
});

// Reset function
reset = function () {
  Thing.remove({}, function(err){
      if (err){
          throw err;
      } else {
          console.log('Reseting things...');
          var data = [
              ['Yellow',            'Scandal',  '0.jpg', 0],
              ['Encore Show',       'Scandal',  '1.jpg', 0],
              ['Best Schandal',     'Scandal',  '2.jpg', 0],
              ['Baby Action',       'Scandal',  '3.jpg', 0],
              ['Queens are Trumps', 'Scandal',  '4.jpg', 0],
              ['Temptation Box',    'Scandal',  '5.jpg', 0],
              ['Scandal Show',      'Scandal',  '6.jpg', 0],
              ['R-Girls Show',      'Scandal',  '7.jpg', 0],
              ['Hello World',       'Scandal',  '8.jpg', 0],
              ['Plastic Beach',     'Gorillaz', '9.jpg', 1],
              ['Laica come Home',   'Gorillaz', '10.jpg',1],
              ['0x8433924927',      'Flag',     '11.jpg',2]
          ];

          data.forEach(function (item) {
              console.log(' - Insterting '+item);

              var instance = new Thing();

                instance.title = item[0];
                instance.autor = item[1];
                instance.url = item[2];
                instance.avaliable = item[3];

              instance.save();
          });
      }
  })
};

module.exports = {
    router: router,
    schema: Thing,
    reset: reset
};
