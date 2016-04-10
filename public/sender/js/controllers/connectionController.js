angular.module('nuage-sender').controller('connectionController', ['$state', '$rootScope', '$scope', 'chromecast', 'MESSAGE', 'debug', function($state, $rootScope, $scope, chromecast, MESSAGE, debug) {

    $scope.chromecastStatus = 'Recherche de Chromecast';

    $rootScope.$on('RECEIVER_AVAILABLE', function() {

        $scope.$apply(function() {
            $scope.chromecastStatus = 'Chromecast disponible';
        });
    });

    $rootScope.$on(MESSAGE.r2s.noGameAvailable, function() {

        $state.go('createGame');
    });

    $rootScope.$on(MESSAGE.r2s.gameAvailable, function() {

        $state.go('gameAvailable');
    });

    $scope.connect = function() {

        var message = {
            service : MESSAGE.s2r.connect
        };
        chromecast.sendMessage(message);
    };
}]);