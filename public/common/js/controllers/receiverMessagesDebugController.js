angular.module('nuage-common').controller('receiverMessagesDebugController',
    ['$rootScope', '$scope', 'EVENT', function($rootScope, $scope, EVENT) {

    $scope.messages = [];

    $rootScope.$on(EVENT.receiver, function(event, message) {

        $scope.messages.push(message);
    });
}]);