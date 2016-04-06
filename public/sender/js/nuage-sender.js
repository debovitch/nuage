angular.module('nuage-sender', ['ui.router', 'nuage-common', 'constants', 'debug'])

    .constant('chrome', chrome)

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('connection', {
                url : '/connection',
                controller : 'connectionController',
                templateUrl : 'sender/views/connection.html'
            })
            .state('createGame', {
                url : '/createGame',
                controller : 'createGameController',
                templateUrl : 'sender/views/create-game.html'
            })
            .state('waitingPlayers', {
                url : '/waitingPlayers',
                templateUrl : 'common/views/waiting-players.html',
                controller : 'waitingPlayersController',
                params : {
                    initiator : ''
                }
            });
    }])

    .run(['$state', 'chromecast', 'debug', function($state, chromecast) {

        window.__onGCastApiAvailable = function(loaded, errorInfo) {

            if (loaded) {
                console.log('Cast API loaded');
                chromecast.initializeCastApi();
            } else {
                console.log('Cast API not loaded', errorInfo);
            }
        };

        $state.go('connection');
    }]);