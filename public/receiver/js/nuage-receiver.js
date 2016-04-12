angular.module('nuage-receiver', ['ui.router', 'nuage-common', 'constants', 'debug'])

    .constant('cast', cast)

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('noGame', {
                templateUrl : 'receiver/views/no-game.html'
            })
            .state('waitingPlayers', {
                templateUrl : 'common/views/waiting-players.html',
                controller : 'waitingPlayersController',
                params : {
                    players : []
                }
            })
            .state('startGame', {
                url : '/startGame',
                templateUrl : 'receiver/views/start-game.html',
                controller : 'startGameController',
                params : {
                    players : []
                }
            });
    }])

    .run(['$state', 'messageBusService', function($state, messageBusService) {

        messageBusService.init();
    }]);