nuageModule.controller('appController', ['$rootScope', '$scope', '$state', 'cast', 'castReceiverManagerService', function($rootScope, $scope, $state, cast, castReceiverManagerService) {

    var appConfig = new cast.receiver.CastReceiverManager.Config();

    appConfig.maxInactivity = 30 * 60;
    appConfig.statusText = 'Application is starting';

    castReceiverManagerService.manager.start(appConfig);

    $scope.displayDebugInfo = true;

    $rootScope.$on('senderConnected', function() {

        console.log('senderConnected');
        $state.go('no-game');
    });

    $rootScope.$on('initiatorConnected', function(event, data) {

        console.log('initiatorConnected', data);
        $state.go('waiting-players', {
            initiator : data
        });
    });
}]);

