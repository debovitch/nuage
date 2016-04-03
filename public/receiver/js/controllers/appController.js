angular.module('nuage').controller('appController', ['$rootScope', '$scope', '$state', 'cast', 'castReceiverManagerService', function($rootScope, $scope, $state, cast, castReceiverManagerService) {

    var appConfig = new cast.receiver.CastReceiverManager.Config();

    appConfig.maxInactivity = 30 * 60;
    appConfig.statusText = 'Application is starting';

    castReceiverManagerService.manager.start(appConfig);

    $scope.displayDebugInfo = true;

    $scope.players = [];

    $rootScope.$on('senderConnected', function() {

        console.log('senderConnected');

        if (castReceiverManagerService.manager.getSenders().length == 1) {
            $state.go('no-game');
        }
    });

    $rootScope.$on('initiatorConnected', function(event, data) {

        console.log('initiatorConnected', data);
        $scope.players.push(data);
        $state.go('waiting-players', {
            initiator : data
        });
    });
}]);

