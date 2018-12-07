var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

router.get('/', (req, res, next) => {
    request({headers: {'Accept-Language': 'fr-CA'}, uri: 'https://sports-decathlon.herokuapp.com/sports'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            // do more stuff
            const data = {
                title: "DECATHLON",
                sports: info.data.filter(e => [81, 134, 78, 302, 96, 283, 139, 89].includes(e.id)).map(e=>{if(e.relationships.images.data==null)e.relationships.images.data="https://place-hold.it/284x200?text=Image Manquante";else e.relationships.images.data = "https://sports-decathlon.herokuapp.com" + e.relationships.images.data; return e}).sort((a,b) => a.attributes.name.localeCompare(b.attributes.name)),
                types: info.data.filter(e => [286, 428, 224, 12].includes(e.id)).map(e=>{if(e.relationships.images.data==null)e.relationships.images.data="https://place-hold.it/284x200?text=Image Manquante";else e.relationships.images.data = "https://sports-decathlon.herokuapp.com" + e.relationships.images.data; return e}).sort((a,b) => a.attributes.name.localeCompare(b.attributes.name)),
            }
            req.vueOptions = { 
                rootPath: path.join(__dirname, '../views'),
                head: {
                    title: 'Page Title',
                    styles: [
                        { style: '/stylesheets/main.css' },
                        { style: 'https://fonts.googleapis.com/css?family=Acme|Oswald|Permanent+Marker' }
                    ]
                }    
            }
            res.renderVue('../../views/main.vue', data, req.vueOptions);
        }
    })
})
router.get('/all-sports', (req, res, next) => {
    request({headers: {'Accept-Language': 'fr-FR'}, uri: 'https://sports-decathlon.herokuapp.com/sports'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            if (req.query.id){
                let current_type = info.data.find(e => e.id == req.query.id);
                let list_id = []
                current_type.relationships.children.data.forEach (e=>list_id.push(e.id))
                const data = {
                    title: "DECATHLON",
                    sports: info.data.filter(e => list_id.includes(e.id)).map(e=>{if(e.relationships.images.data==null)e.relationships.images.data="https://place-hold.it/284x200/7f8fa6/000?text=Image Manquante";else e.relationships.images.data = "https://sports-decathlon.herokuapp.com" + e.relationships.images.data; return e}).sort((a,b) => a.attributes.name.localeCompare(b.attributes.name)),
                }
                req.vueOptions = { 
                    rootPath: path.join(__dirname, '../views'),
                    head: {
                        title: 'Page Title',
                        styles: [
                            { style: '/stylesheets/main.css' },
                            { style: 'https://fonts.googleapis.com/css?family=Leckerli+One|Acme|Oswald|Permanent+Marker' }
                        ]
                    }    
                }
                res.renderVue('../../views/allSports.vue', data, req.vueOptions);
            }
            else {
                const data = {
                    title: "DECATHLON",
                    sports: info.data.filter(e => e.relationships.children.data.length == 0).map(e=>{if(e.relationships.images.data==null)e.relationships.images.data="https://place-hold.it/284x200/7f8fa6/000?text=Image Manquante";else e.relationships.images.data = "https://sports-decathlon.herokuapp.com" + e.relationships.images.data; return e}).sort((a,b) => a.attributes.name.localeCompare(b.attributes.name)),
                }
                req.vueOptions = { 
                    rootPath: path.join(__dirname, '../views'),
                    head: {
                        title: 'Page Title',
                        styles: [
                            { style: '/stylesheets/main.css' },
                            { style: 'https://fonts.googleapis.com/css?family=Leckerli+One|Acme|Oswald|Permanent+Marker' }
                        ]
                    }    
                }
                res.renderVue('../../views/allSports.vue', data, req.vueOptions);
            }
            
        }
      })
});

router.get('/all-types', (req, res, next) => {
    request({headers: {'Accept-Language': 'fr-FR'}, uri: 'https://sports-decathlon.herokuapp.com/sports'}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            const data = {
                title: "SPORT'MAN",
                types: info.data.filter(e => e.relationships.children.data.length != 0).map(e=>{if(e.relationships.images.data==null)e.relationships.images.data="https://place-hold.it/284x200/7f8fa6/000?text=Image Manquante";else e.relationships.images.data = "https://sports-decathlon.herokuapp.com" + e.relationships.images.data; return e}).sort((a,b) => a.attributes.name.localeCompare(b.attributes.name)),
            }
            req.vueOptions = { 
                rootPath: path.join(__dirname, '../views'),
                head: {
                    title: 'Page Title',
                    styles: [
                        { style: '/stylesheets/main.css' },
                        { style: 'https://fonts.googleapis.com/css?family=Leckerli+One|Acme|Oswald|Permanent+Marker' }
                    ]
                }    
            }
            res.renderVue('../../views/allTypes.vue', data, req.vueOptions);
        }
      })
})
module.exports = router;