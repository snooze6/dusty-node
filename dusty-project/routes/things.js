var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

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

// The connection
var Thing = mongoose.model('Thing', ThingSchema);


// Get things
router.get('/', auth, function(req, res, next) {
  var av = {$lte: 1}; var query={};
  if (req.query.avaliable) {
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

    // Todo: Eliminar esto
    console.log(' - Params: ');
    // http://localhost:1337/api/things?a%5Bb%5D=c => { a: { b: 'c' } }
    // avaliable%5B%24gt%5D=-1 => { a: { b: 'c' } }
    console.log(req.query);
    console.log(' - Query: ');
    console.log(query);

  Thing.find(query, function (err, things) {
        if (err) {
            return next(err);
        } else {
            return res.json(things)
        }
  })
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
