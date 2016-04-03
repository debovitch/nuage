angular.module('nuage').service('messageBusService',
    ['$rootScope', 'cast', 'castReceiverManagerService', 'MESSAGE_NAMESPACE', 'debug',
    function($rootScope, cast, castReceiverManagerService, MESSAGE_NAMESPACE, debug) {

    this.messageBus = null;

    var that = this;

    this.init = function() {

        castReceiverManagerService.init();

        if (this.messageBus != null) { return false; }

        debug.log('messageBusService.init');

        this.messageBus = castReceiverManagerService.manager.getCastMessageBus(MESSAGE_NAMESPACE);

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

            case 'connect' :
                $rootScope.$broadcast('senderConnected');
                that.messageBus.send(event.senderId, 'senderConnected');
                break;
            case 'createGame' :
                $rootScope.$broadcast('initiatorConnected', message.username);
                that.messageBus.send(event.senderId, message.username + ' created game' );
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
