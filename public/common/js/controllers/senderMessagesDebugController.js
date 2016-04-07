angular.module('nuage-common').controller('senderMessagesDebugController',
    ['$rootScope', '$scope', 'EVENT', function($rootScope, $scope, EVENT) {

    $scope.messages = [];

    $rootScope.$on(EVENT.sender, function(event, message) {

        $scope.messages.push(message);
    });
}]);