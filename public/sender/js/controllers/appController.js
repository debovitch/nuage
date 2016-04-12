angular.module('nuage-sender').controller('appController',
    ['$state', '$rootScope', '$scope', 'chromecast', 'EVENT', 'MESSAGE',
        function($state, $rootScope, $scope, chromecast, EVENT, MESSAGE) {

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

    $rootScope.$on(EVENT.readyToPlay, function() {

        var message = {
            service : MESSAGE.s2r.readyToPlay
        };
        chromecast.sendMessage(message);
    });

    $rootScope.$on(MESSAGE.r2s.startGame, function() {

        $state.go('startGame');
    });
}]);

