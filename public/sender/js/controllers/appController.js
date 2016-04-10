angular.module('nuage-sender').controller('appController',
    ['$state', '$rootScope', '$scope', 'MESSAGE', function($state, $rootScope, $scope, MESSAGE) {

    $scope.displayDebugInfo = true;

    $rootScope.$on(MESSAGE.r2s.noGameAvailable, function() {

        $state.go('createGame');
    });

    $rootScope.$on(MESSAGE.r2s.gameAvailable, function(event, data) {

        $state.go('gameAvailable', {
            initiator : data.initiator
        });
    });

    $rootScope.$on(MESSAGE.r2s.gameCreated, function(event, data) {

        $state.go('waitingPlayers', data);
    });

    $rootScope.$on(MESSAGE.r2s.gameJoined, function(event, data) {

        $state.go('waitingPlayers', data);
    });
}]);

