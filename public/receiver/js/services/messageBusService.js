nuageModule.service('messageBusService',
    ['$rootScope', 'cast', 'castReceiverManagerService', 'MESSAGE_NAMESPACE', 'tools',
    function($rootScope, cast, castReceiverManagerService, MESSAGE_NAMESPACE, tools) {

    this.messageBus = null;

    var that = this;

    this.init = function() {

        castReceiverManagerService.init();

        if (this.messageBus != null) { return false; }

        tools.debug('messageBusService.init');

        this.messageBus = castReceiverManagerService.manager.getCastMessageBus(MESSAGE_NAMESPACE);

        this.messageBus.onMessage = function(event) {

            tools.debug('Message is [' + event.senderId + '] : ' + event.data);
            that.parseMessage(event.data);
        };

        return true;
    };

    this.parseMessage = function(json) {

        var message;

        try {
            message = JSON.parse(json);
        } catch(e) {
            this.messageBus.broadcast('Failed to parse json : ' + json);
            return;
        }

        switch(message.service) {

            case 'connect' :
                $rootScope.$broadcast('senderConnected');
                that.messageBus.broadcast('senderConnected');
                break;
            case 'createGame' :
                $rootScope.$broadcast('initiatorConnected', message.username);
                that.messageBus.broadcast(message.username + ' created game' );
                break;
            case 'joinGame' :
                $rootScope.$broadcast('playerConnected', message.player);
                break;
            default :
                this.messageBus.broadcast('Unknown service : ' + message.service);
        }

        castReceiverManagerService.manager.setApplicationState(message.service)
    };

    return this;

}]);
