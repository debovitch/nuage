angular.module('hello').factory('chromecast',
    ['$rootScope', 'chrome', 'APP_ID', 'MESSAGE_NAMESPACE', 'debug',
        function($rootScope, chrome, APP_ID, MESSAGE_NAMESPACE, debug) {
    
    var applicationID = APP_ID;
    var namespace = MESSAGE_NAMESPACE;
    var session = null;

    function onInitSuccess() {

        debug.log('onInitSuccess');
    }

    function onError(message) {

        debug.log('onError : ' + JSON.stringify(message));
    }

    function onSuccess(message) {

        debug.log('onSuccess : ' + message);
    }

    function onStopAppSuccess() {

        debug.log('onStopAppSuccess');
    }

    function sessionListener(newSession) {

        debug.log('New session ID : ' + newSession.sessionId);
        session = newSession;
        session.addUpdateListener(sessionUpdateListener);
        session.addMessageListener(namespace, onReceiverMessage);
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

    function createGame() {

        var message = {
            service : 'createGame',
            player : $('#username').val()
        };
        sendMessage(JSON.stringify(message));
    }

    return {
        initializeCastApi : function() {

            var sessionRequest = new chrome.cast.SessionRequest(applicationID);
            var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

            chrome.cast.initialize(apiConfig, onInitSuccess, onError);
        },
        sendMessage : function(message) {

            if (session != null) {
                session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent : ' + message), onError);
            } else {
                chrome.cast.requestSession(function(newSession) {

                    sessionListener(newSession);
                    session.sendMessage(namespace, message, onSuccess.bind(this, 'Message sent : ' + message), onError);
                }, onError);
            }
        }
    }
}]);