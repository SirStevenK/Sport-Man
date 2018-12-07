var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var YOUTUBE_KEY = "AIzaSyAI8tlK27fZolIEWPGCafN97QWh-mq486U"

router.get('/[a-zA-Z0-9-]+/', function(req, res, next) {
  request({uri: 'https://sports-decathlon.herokuapp.com/sports'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var sports = JSON.parse(body);
            var sport = sports.data.find(e => e.id == req.url.substring(1));
            var url_search = 'https://www.googleapis.com/youtube/v3/search?part=snippet&regionCode=FR&q=' + sport.attributes.name + '&maxResults=5&key=' + YOUTUBE_KEY;
            request({uri: 'https://sports-decathlon.herokuapp.com/sports/'+ sport.id +'/recommendations'}, function (error, response, body) {
              sport_recommandation = JSON.parse(body).map(x => parseInt(x))
              console.log(sport_recommandation);
              sport_recommandation = sports.data.filter(e => sport_recommandation.includes(e.id)).map(e=>{if(e.relationships.images.data==null)e.relationships.images.data="https://place-hold.it/284x200?text=Image Manquante";else e.relationships.images.data = "https://sports-decathlon.herokuapp.com" + e.relationships.images.data; return e})
              request({headers: {'Accept-Language': 'fr-FR', 'Content-Language': 'fr-FR'}, uri: url_search}, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      var videos = JSON.parse(body);
                      const data = {
                          mainVideo: videos.items[0].id.videoId,
                          videos: videos.items.slice(1),
                          sports: sport_recommandation.slice(0, 2)
                      }
                      req.vueOptions = { 
                          rootPath: path.join(__dirname, '../views'),
                          head: {
                              title: 'Page Title',
                              scripts: [
                                { src: '/javascripts/sports.js'}
                              ],  
                              styles: [
                                  { style: '/stylesheets/sports.css' },
                                  { style: 'https://fonts.googleapis.com/css?family=Acme|Oswald|Permanent+Marker' }
                              ]
                          }    
                      }
                      res.renderVue('../../views/sports.vue', data, req.vueOptions);
                  }
                });
            });
    }});
});

module.exports = router;