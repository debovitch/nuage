angular.module('nuage-receiver').service('messageBusService',
    ['$rootScope', 'cast', 'castReceiverManagerService', 'MESSAGE', 'debug',
    function($rootScope, cast, castReceiverManagerService, MESSAGE, debug) {

    this.messageBus = null;

    var that = this;

    this.init = function() {

        castReceiverManagerService.init();

        if (this.messageBus != null) { return false; }

        debug.log('messageBusService.init');

        this.messageBus = castReceiverManagerService.manager.getCastMessageBus(MESSAGE.namespace);

        this.messageBus.onMessage = function(event) {

            debug.log('Message is [' + event.senderId + '] : ' + event.data);
            that.processEvent(event);
        };

        return true;
    };

    this.processEvent = function(event) {

        var message;

        try {
            message = JSON.parse(event.data);
        } catch(e) {
            this.messageBus.broadcast('Failed to parse json : ' + json);
            return;
        }

        switch(message.service) {

            case MESSAGE.s2r.connect :
                $rootScope.$broadcast(MESSAGE.r2s.noGameAvailable);
                that.messageBus.send(event.senderId, MESSAGE.r2s.noGameAvailable);
                break;
            case MESSAGE.s2r.createGame :
                $rootScope.$broadcast(MESSAGE.r2s.gameCreated, message.username);
                that.messageBus.send(event.senderId, MESSAGE.r2s.gameCreated);
                break;
            case 'joinGame' :
                $rootScope.$broadcast('playerConnected', message.player);
                break;
            default :
                that.messageBus.send(event.senderId, 'Unknown service : ' + message.service);
        }

        castReceiverManagerService.manager.setApplicationState(message.service)
    };

    return this;

}]);
