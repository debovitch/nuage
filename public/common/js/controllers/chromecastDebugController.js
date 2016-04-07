angular.module('nuage-common').controller('chromecastDebugController',
    ['$rootScope', '$scope', 'EVENT', function($rootScope, $scope, EVENT) {

    $scope.messages = [];

    $rootScope.$on(EVENT.chromecast, function(event, message) {

        $scope.messages.push(message);
    });
}]);