angular.module('hello').controller('ConnectionController', ['$state', '$rootScope', '$scope', 'chromecast', 'debug', function($state, $rootScope, $scope, chromecast, debug) {

    $scope.chromecastStatus = 'Recherche de Chromecast';

    $rootScope.$on('RECEIVER_AVAILABLE', function() {

        $scope.$apply(function() {
            $scope.chromecastStatus = 'Chromecast disponible';
        });
    });

    $rootScope.$on('senderConnected', function() {

        $state.go('create-game');
    });

    $scope.connect = function() {

        var message = {
            service : 'connect'
        };
        chromecast.sendMessage(JSON.stringify(message));
    };
}]);