angular.module('nuage-receiver').service('castReceiverManagerService',
    ['cast', 'debug', function(cast, debug) {

    this.manager = null;

    this.init = function() {

        if (this.manager != null) { return false; }

        console.log('castReceiverManagerService.init');

        cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.debug);

        this.manager = cast.receiver.CastReceiverManager.getInstance();

        this.manager.onReady = function(event) {

            debug.chromecast('onReady : ' + JSON.stringify(event.data));
            this.setApplicationState('Nuage is ready');
        };

        this.manager.onSenderConnected = function(event) {

            debug.chromecast('onSenderConnected : ' + JSON.stringify(event.data));
        };

        this.manager.onSenderDisconnected = function(event) {

            debug.chromecast('onSenderDisconnected : ' + JSON.stringify(event.data));
            if (this.getSenders().length == 0 &&
                event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
            }
        };

        return true;
    };

    return this;
}]);