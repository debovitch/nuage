nuageModule.controller('ConnectionController', ['$window', '$rootScope', '$scope', 'chromecast', 'tools', function($window, $rootScope, $scope, chromecast, tools) {

    $scope.chromecastStatus = 'Recherche de Chromecast';

    $rootScope.$on('RECEIVER_AVAILABLE', function() {

        $scope.$apply(function() {
            $scope.chromecastStatus = 'Chromecast disponible';
        });
    });

    $rootScope.$on('senderConnected', function() {

        $window.location.hash = 'create-game';
    });

    $scope.connect = function() {

        var message = {
            service : 'connect'
        };
        chromecast.sendMessage(JSON.stringify(message));
    };
}]);