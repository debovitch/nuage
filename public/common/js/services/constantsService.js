angular.module('constants', [])

    .constant('APP_ID', 'BA07921F')
    .constant('EVENT', {
        chromecast : 'EVENT.chromecast',
        sender : 'EVENT.sender',
        receiver : 'EVENT.receiver',
        readyToPlay : 'EVENT.readyToPlay'
    })
    .constant('MESSAGE', {
        namespace : 'urn:x-cast:fr.duchassin.nuage',
        s2r : {
            connect : 's2r.connect',
            createGame : 's2r.createGame',
            joinGame : 's2r.joinGame',
            readyToPlay : 's2r.readyToPlay',
            sendWords : 's2r.sendWords'
        },
        r2s : {
            noGameAvailable : 'r2s.noGameAvailable',
            gameCreated : 'r2s.gameCreated',
            gameAvailable : 'r2s.gameAvailable',
            gameJoined : 'r2s.gameJoined',
            playerIsReady : 'playerIsReady',
            startGame : 'startGame'
        }
    });