angular.module('nuage-sender').factory('chromecast',
    ['$rootScope', 'chrome', 'APP_ID', 'MESSAGE', 'debug',
        function($rootScope, chrome, APP_ID, MESSAGE, debug) {
    
    var applicationID = APP_ID;
    var session = null;

    function onInitSuccess() {

        debug.chromecast('onInitSuccess');
    }

    function onError(message) {

        debug.chromecast('onError : ' + JSON.stringify(message));
    }

    function onStopAppSuccess() {

        debug.chromecast('onStopAppSuccess');
    }

    function sessionListener(newSession) {

        debug.chromecast('New session ID : ' + newSession.sessionId);
        session = newSession;
        session.addUpdateListener(sessionUpdateListener);
        session.addMessageListener(MESSAGE.namespace, onReceiverMessage);
    }

    function sessionUpdateListener(isAlive) {

        var message = isAlive ? 'Session Updated' : 'Session Removed';
        message += ' : ' + session.sessionId;
        debug.chromecast(message);
        if (!isAlive) {
            session = null;
            $rootScope.$broadcast('RECEIVER_DEAD');
        }
    }

    function onReceiverMessage(namespace, message) {

        debug.receiver(message);
        $rootScope.$broadcast(message);
    }

    function receiverListener(status) {

        if (status === chrome.cast.ReceiverAvailability.AVAILABLE) {
            debug.chromecast('Receiver found');
            $rootScope.$broadcast('RECEIVER_AVAILABLE');
        } else {
            debug.chromecast('Receiver list empty');
        }
    }

    function stopApp() {

        session.stop(onStopAppSuccess, onError);
    }

    return {
        onSuccess : function(message) {

            debug.sender(message);
        },
        initializeCastApi : function() {

            var sessionRequest = new chrome.cast.SessionRequest(applicationID);
            var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

            chrome.cast.initialize(apiConfig, onInitSuccess, onError);
        },
        sendMessage : function(message) {

            var that = this;
            if (session != null) {
                session.sendMessage(MESSAGE.namespace, message, that.onSuccess(message), onError);
            } else {
                chrome.cast.requestSession(function(newSession) {

                    sessionListener(newSession);
                    session.sendMessage(MESSAGE.namespace, message, that.onSuccess(message), onError);
                }, onError);
            }
        }
    }
}]);