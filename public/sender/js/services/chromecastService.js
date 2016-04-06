angular.module('nuage-sender').factory('chromecast',
    ['$rootScope', 'chrome', 'APP_ID', 'MESSAGE', 'debug',
        function($rootScope, chrome, APP_ID, MESSAGE, debug) {
    
    var applicationID = APP_ID;
    var session = null;

    function onInitSuccess() {

        debug.log('onInitSuccess');
    }

    function onError(message) {

        debug.log('onError : ' + JSON.stringify(message));
    }

    function onStopAppSuccess() {

        debug.log('onStopAppSuccess');
    }

    function sessionListener(newSession) {

        debug.log('New session ID : ' + newSession.sessionId);
        session = newSession;
        session.addUpdateListener(sessionUpdateListener);
        session.addMessageListener(MESSAGE.namespace, onReceiverMessage);
    }

    function sessionUpdateListener(isAlive) {

        var message = isAlive ? 'Session Updated' : 'Session Removed';
        message += ' : ' + session.sessionId;
        debug.log(message);
        if (!isAlive) {
            session = null;
            $rootScope.$broadcast('RECEIVER_DEAD');
        }
    }

    function onReceiverMessage(namespace, message) {

        debug.log('onReceiverMessage : ' + namespace + ', ' + message);
        $rootScope.$broadcast(message);
    }

    function receiverListener(status) {

        if (status === chrome.cast.ReceiverAvailability.AVAILABLE) {
            debug.log('Receiver found');
            $rootScope.$broadcast('RECEIVER_AVAILABLE');
        } else {
            debug.log('Receiver list empty');
        }
    }

    function stopApp() {

        session.stop(onStopAppSuccess, onError);
    }

    return {
        onSuccess : function(message) {

            debug.log('Message sent : ' + message);
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