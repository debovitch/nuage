angular.module('nuage-receiver').service('messageBusService',
    ['$rootScope', 'cast', 'castReceiverManagerService', 'MESSAGE', 'debug',
    function($rootScope, cast, castReceiverManagerService, MESSAGE, debug) {

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

        var message;

        try {
            message = JSON.parse(event.data);
        } catch(e) {
            that.messageBus.send(event.senderId, 'Failed to parse json : ' + event.data);
            debug.receiver('To ' + event.senderId + ' : Failed to parse json : ' + event.data);
            return;
        }

        switch(message.service) {

            case MESSAGE.s2r.connect :
                if (castReceiverManagerService.manager.getSenders().length == 1) {
                    $rootScope.$broadcast(MESSAGE.r2s.noGameAvailable);
                    that.messageBus.send(event.senderId, MESSAGE.r2s.noGameAvailable);
                    debug.receiver(event.senderId + ' : ' + MESSAGE.r2s.noGameAvailable);
                }
                break;
            case MESSAGE.s2r.createGame :
                $rootScope.$broadcast(MESSAGE.r2s.gameCreated, message.username);
                that.messageBus.send(event.senderId, MESSAGE.r2s.gameCreated);
                debug.receiver(event.senderId + ' : ' + MESSAGE.r2s.gameCreated);
                break;
            case 'joinGame' :
                $rootScope.$broadcast('playerConnected', message.player);
                break;
            default :
                that.messageBus.send(event.senderId, 'Unknown service : ' + message.service);
                debug.receiver('To ' + event.senderId + ' : Unknown service : ' + message.service);
        }

        castReceiverManagerService.manager.setApplicationState(message.service)
    };

    return this;

}]);
