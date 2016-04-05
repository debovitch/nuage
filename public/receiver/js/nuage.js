angular.module('nuage', ['ui.router', 'debug', 'constants'])

    .constant('cast', cast)

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('noGame', {
                templateUrl : 'receiver/views/no-game.html',
                controller : 'noGameController'
            })
            .state('waitingPlayers', {
                templateUrl : 'receiver/views/waiting-players.html',
                controller : 'waitingPlayersController',
                params : { initiator : '' }
            });
    }])

    .run(['$state', 'messageBusService', function($state, messageBusService) {

        messageBusService.init();
    }]);