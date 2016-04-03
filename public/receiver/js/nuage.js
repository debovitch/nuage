angular.module('nuage', ['ui.router', 'debug', 'constants'])

    .constant('cast', cast)

    .config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('no-game', {
                templateUrl : 'receiver/views/no-game.html',
                controller : 'noGameController'
            })
            .state('waiting-players', {
                templateUrl : 'receiver/views/waiting-players.html',
                controller : 'waitingPlayersController',
                params : { initiator : '' }
            });
    }])

    .run(['$state', 'messageBusService', function($state, messageBusService) {

        messageBusService.init();
    }]);