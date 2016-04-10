angular.module('nuage-receiver').service('messageBusService',
    ['$rootScope', 'castReceiverManagerService', 'gameManager', 'MESSAGE', 'debug',
    function($rootScope, castReceiverManagerService, gameManager, MESSAGE, debug) {

    this.messageBus = null;

    var that = this;

    this.init = function() {

        castReceiverManagerService.init();

        if (this.messageBus != null) { return false; }

        console.log('messageBusService.init');

        this.messageBus = castReceiverManagerService.manager.getCastMessageBus(MESSAGE.namespace);

        this.messageBus.onMessage = function(event) {

            debug.sender(event.senderId + ' : ' + event.data);
            that.processEvent(event);
        };

        return true;
    };

    this.processEvent = function(event) {

        var response = {};

        try {
            var message = JSON.parse(event.data);
        } catch(e) {
            response.service = 'Error';
            reponse.message = 'Failed to parse json : ' + event.data;
            that.messageBus.send(event.senderId, JSON.stringify(response));
            debug.receiver('To ' + event.senderId + ' : ' + response.message);
            return;
        }

        switch(message.service) {

            case MESSAGE.s2r.connect :

                gameManager.senders.push({
                    id : event.senderId
                });

                if (castReceiverManagerService.manager.getSenders().length == 1) {

                    response.service = MESSAGE.r2s.noGameAvailable;

                    $rootScope.$broadcast(response.service);

                } else if (castReceiverManagerService.manager.getSenders().length == 2) {

                    response.service = MESSAGE.r2s.gameAvailable;
                    response.initiator = gameManager.getInitiator().username;
                }
                break;

            case MESSAGE.s2r.createGame :

                var sender = gameManager.getSenderById(event.senderId);
                sender.username = message.username;
                sender.initiator = true;

                response.service = MESSAGE.r2s.gameCreated;
                response.players = gameManager.getPlayers();

                $rootScope.$broadcast(response.service, response);
                break;

            case MESSAGE.s2r.joinGame :

                var sender = gameManager.getSenderById(event.senderId);
                sender.username = message.username;
                sender.initiator = false;

                response.service = MESSAGE.r2s.gameJoined;
                response.players = gameManager.getPlayers();

                $rootScope.$broadcast(response.service, response);
                that.messageBus.broadcast(JSON.stringify(response));
                debug.receiver('To all : ' + response.service);
                castReceiverManagerService.manager.setApplicationState(message.service);
                return;

            default :
                response.service = 'Unknown service : ' + message.service;
        }

        that.messageBus.send(event.senderId, JSON.stringify(response));
        debug.receiver('To ' + event.senderId + ' : ' + response.service);

        castReceiverManagerService.manager.setApplicationState(message.service)
    };

    return this;

}]);
