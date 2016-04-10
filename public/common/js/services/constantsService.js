angular.module('constants', [])

    .constant('APP_ID', 'BA07921F')
    .constant('EVENT', {
        chromecast : 'EVENT.chromecast',
        sender : 'EVENT.sender',
        receiver : 'EVENT.receiver'
    })
    .constant('MESSAGE', {
        namespace : 'urn:x-cast:fr.duchassin.nuage',
        s2r : {
            connect : 's2r.connect',
            createGame : 's2r.createGame',
            joinGame : 's2r.joinGame'
        },
        r2s : {
            noGameAvailable : 'r2s.noGameAvailable',
            gameCreated : 'r2s.gameCreated',
            gameAvailable : 'r2s.gameAvailable'
        }
    });