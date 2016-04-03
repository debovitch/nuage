angular.module('hello', ['ui.router', 'debug', 'constants'])

    .constant('chrome', chrome)

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('connection', {
                url : 'connection',
                controller : 'connectionController',
                templateUrl : 'sender/views/connection.html'
            })
            .state('createGame', {
                url : 'create-game',
                controller : 'createGameController',
                templateUrl : 'sender/views/create-game.html'
            });
    }])

    .run(['$state', 'chromecast', 'debug', function($state, chromecast, debug) {

        window.__onGCastApiAvailable = function(loaded, errorInfo) {

            if (loaded) {
                debug.log('Cast API loaded');
                chromecast.initializeCastApi();
            } else {
                debug.log(errorInfo);
            }
        };

        $state.go('connection');
    }]);