var nuageModule = angular.module('nuage', ['ngRoute']);

nuageModule.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            controller : 'ConnectionController',
            templateUrl : 'sender/views/connect.html'
        })
        .when('/create-game', {
            controller : 'CreateGameController',
            templateUrl : 'sender/views/create-game.html'
        })
        .otherwise({
            redirectTo:'/'
        });
});