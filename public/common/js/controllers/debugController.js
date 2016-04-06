angular.module('nuage-common').controller('debugController', ['$rootScope', '$scope', function($rootScope, $scope) {

    $scope.messages = [];

    $rootScope.$on('debug', function(event, message) {

        $scope.messages.push(message);
    });
}]);