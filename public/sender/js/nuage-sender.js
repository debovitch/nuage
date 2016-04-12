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
            .state('gameAvailable', {
                url : '/gameAvailable',
                templateUrl : 'sender/views/game-available.html',
                controller : 'gameAvailableController',
                params : {
                    initiator : ''
                }
            })
            .state('waitingPlayers', {
                url : '/waitingPlayers',
                templateUrl : 'common/views/waiting-players.html',
                controller : 'waitingPlayersController',
                params : {
                    players : []
                }
            })
            .state('startGame', {
                url : '/startGame',
                templateUrl : 'sender/views/start-game.html',
                controller : 'startGameController',
                params : {
                    players : []
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