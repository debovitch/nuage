angular.module('constants', [])
    .constant('APP_ID', 'BA07921F')
    .constant('MESSAGE', {
        namespace : 'urn:x-cast:fr.duchassin.nuage',
        s2r : {
            connect : 's2r.connect',
            createGame : 's2r.createGame'
        },
        r2s : {
            noGameAvailable : 'r2s.noGameAvailable',
            gameCreated : 'r2s.gameCreated'
        }
    });