angular.module('nuage-sender').controller('createGameController', ['$rootScope', '$scope', '$state', 'chromecast', 'MESSAGE', function($rootScope, $scope, $state, chromecast, MESSAGE) {

    $scope.createGame = function() {

        console.log('Username', $scope.username);
        var message = {
            service : MESSAGE.s2r.createGame,
            username : $scope.username
        };
        chromecast.sendMessage(message);
    };

    $rootScope.$on(MESSAGE.r2s.gameCreated, function() {

        $state.go('waitingPlayers', {
            initiator : $scope.username
        });
    });
}]);