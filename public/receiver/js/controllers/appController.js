angular.module('nuage').controller(
    'appController',
    ['$state', '$rootScope', '$scope', 'cast', 'castReceiverManagerService', 'MESSAGE',
    function($state, $rootScope, $scope, cast, castReceiverManagerService, MESSAGE) {

    var appConfig = new cast.receiver.CastReceiverManager.Config();

    appConfig.maxInactivity = 30 * 60;
    appConfig.statusText = 'Application is starting';

    castReceiverManagerService.manager.start(appConfig);

    $scope.displayDebugInfo = true;

    $scope.players = [];

    $rootScope.$on(MESSAGE.r2s.noGameAvailable, function() {

        console.log(MESSAGE.r2s.noGameAvailable);

        if (castReceiverManagerService.manager.getSenders().length == 1) {
            $state.go('noGame');
        }
    });

    $rootScope.$on('initiatorConnected', function(event, data) {

        console.log('initiatorConnected', data);
        $scope.players.push(data);
        $state.go('waitingPlayers', {
            initiator : data
        });
    });
}]);

