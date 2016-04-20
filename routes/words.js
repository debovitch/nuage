var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');

router.get('/', function(req, res) {

    var options = {
        uri : 'http://www.motsavec.com/mots-aleatoires.php?fs=10&fs2=0&Submit=Nouveau+mot',
        transform : function(body) {
            return cheerio.load(body, { decodeEntities : false });
        }
    };

    rp(options)
        .then(function($) {

            res.send($('table div').map(function() {
                return $(this).html();
            }).get().join());
        })
        .catch(function(err) {
            res.status(500);
            res.send(err.message);
        });
});

module.exports = router;
