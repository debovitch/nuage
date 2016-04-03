angular.module('nuage').service('castReceiverManagerService', ['cast', 'tools', function(cast, tools) {

    this.manager = null;

    this.init = function() {

        if (this.manager != null) { return false; }

        console.log('castReceiverManagerService.init');

        cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.debug);

        this.manager = cast.receiver.CastReceiverManager.getInstance();

        this.manager.onReady = function(event) {

            tools.debug('Received Ready event: ' + JSON.stringify(event.data));
            this.setApplicationState('Nuage is ready');
        };

        this.manager.onSenderConnected = function(event) {

            tools.debug('Received Sender Connected event: ' + event.data);
        };

        this.manager.onSenderDisconnected = function(event) {

            tools.debug('Received Sender Disconnected event: ' + event.data);
            if (this.getSenders().length == 0 &&
                event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
            }
        };

        return true;
    };

    return this;
}]);