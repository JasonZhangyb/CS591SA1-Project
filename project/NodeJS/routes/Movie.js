var express = require('express');
var router = express.Router();
var request = require('request');

const authorized = require('./authCheck');

const TMDb = require('../config/TMDb')

const TMDb_model = require('../models/MovieSearch');

router.post('/', function (req, res) {
    var celeb = req.body.name;

    request('https://api.themoviedb.org/3/search/person?api_key=' + TMDb.API_KEY + '&query=' + celeb +'&include_adult=false',
        function (err, response, body) {
        if(err) throw new Error(err);

        const result = JSON.parse(body);
        //if(result.total_results == 0)
        const IMDb_id = result.results[0].id;
        //console.log(IMDb_id);
        celeb = result.results[0].name;

        TMDb_model.findOne({ID: IMDb_id}, function (err, result) {
            //console.log(result);
            //console.log(IMDb_id);
            if(result == null){
                request('https://api.themoviedb.org/3/discover/movie?api_key=' + TMDb.API_KEY + '&with_people=' + IMDb_id,
                    function (err, response, body) {
                    if(err) throw new Error(err);

                    const result = JSON.parse(body);

                    var movie_list = [];
                    const movies = result.results;
                    for(i = 0; i < movies.length; i++){
                        movie_list.push({
                            title: movies[i].title,
                            id: movies[i].id,
                            rating: movies[i].vote_average,
                            poster: 'http://image.tmdb.org/t/p/w185' + movies[i].poster_path
                        })
                    }

                    var new_celeb = new TMDb_model({name: celeb, ID: IMDb_id, known_for: movie_list});
                    new_celeb.save(function (err) {
                        if(err) res.send(err);
                        res.send(new_celeb);
                        })
                    })
            }
            else{
                //console.log('found');
                res.json({name: result.name, ID: result.ID, known_for: result.known_for});}
        })
    })
})

module.exports = router;