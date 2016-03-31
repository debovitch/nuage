var nuageModule = angular.module('nuage', ['ui.router']);

nuageModule.constant('cast', cast);
nuageModule.constant('MESSAGE_NAMESPACE', 'urn:x-cast:fr.duchassin.nuage');

nuageModule.config(['$stateProvider', function($stateProvider) {

    $stateProvider
        .state('splash', {
            templateUrl : 'receiver/views/splash.html',
            controller : 'splashController'
        })
        .state('no-game', {
            templateUrl : 'receiver/views/no-game.html',
            controller : 'noGameController'
        })
        .state('waiting-players', {
            templateUrl : 'receiver/views/waiting-players.html',
            controller : 'waitingPlayersController',
            params : { initiator : '' }
        });
}]);

nuageModule.run(['$state', 'messageBusService', function($state, messageBusService) {

    messageBusService.init();

    $state.go('splash');
}]);