angular.module('hello').factory('chromecast', ['$rootScope', 'chrome', 'debug', function($rootScope, chrome, debug) {
    
    var applicationID = 'BA07921F';
    var namespace = 'urn:x-cast:fr.duchassin.nuage';
    var session = null;

    window.__onGCastApiAvailable = function(loaded, errorInfo) {

        if (loaded) {
            debug.log('Cast API loaded');
            initializeCastApi();
        } else {
            debug.log(errorInfo);
        }
    };

    function initializeCastApi() {

        var sessionRequest = new chrome.cast.SessionRequest(applicationID);
        var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

        chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    }

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