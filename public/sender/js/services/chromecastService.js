angular.module('hello').factory('chromecast', ['$rootScope', 'chrome', 'tools', function($rootScope, chrome, tools) {
    
    var applicationID = 'BA07921F';
    var namespace = 'urn:x-cast:fr.duchassin.nuage';
    var session = null;

    window.__onGCastApiAvailable = function(loaded, errorInfo) {

        if (loaded) {
            tools.debug('Cast API loaded');
            initializeCastApi();
        } else {
            tools.debug(errorInfo);
        }
    };

    function initializeCastApi() {

        var sessionRequest = new chrome.cast.SessionRequest(applicationID);
        var apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

        chrome.cast.initialize(apiConfig, onInitSuccess, onError);
    }

    function onInitSuccess() {

        tools.debug('onInitSuccess');
    }

    function onError(message) {

        tools.debug('onError : ' + JSON.stringify(message));
    }

    function onSuccess(message) {

        tools.debug('onSuccess : ' + message);
    }

    function onStopAppSuccess() {

        tools.debug('onStopAppSuccess');
    }

    function sessionListener(newSession) {

        tools.debug('New session ID : ' + newSession.sessionId);
        session = newSession;
        session.addUpdateListener(sessionUpdateListener);
        session.addMessageListener(namespace, onReceiverMessage);
    }

    function sessionUpdateListener(isAlive) {

        var message = isAlive ? 'Session Updated' : 'Session Removed';
        message += ' : ' + session.sessionId;
        tools.debug(message);
        if (!isAlive) {
            session = null;
            $rootScope.$broadcast('RECEIVER_DEAD');
        }
    }

    function onReceiverMessage(namespace, message) {

        tools.debug('onReceiverMessage : ' + namespace + ', ' + message);
        $rootScope.$broadcast(message);
    }

    function receiverListener(status) {

        if (status === chrome.cast.ReceiverAvailability.AVAILABLE) {
            tools.debug('Receiver found');
            $rootScope.$broadcast('RECEIVER_AVAILABLE');
        } else {
            tools.debug('Receiver list empty');
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