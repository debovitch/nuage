angular.module('nuage-receiver').controller(
    'appController',
    ['$state', '$rootScope', '$scope', 'cast', 'castReceiverManagerService', 'MESSAGE',
    function($state, $rootScope, $scope, cast, castReceiverManagerService, MESSAGE) {

        var appConfig = new cast.receiver.CastReceiverManager.Config();

        appConfig.maxInactivity = 30 * 60;
        appConfig.statusText = 'Application is starting';

        castReceiverManagerService.manager.start(appConfig);

        $scope.displayDebugInfo = true;

        $rootScope.$on(MESSAGE.r2s.noGameAvailable, function() {

            $state.go('noGame');
        });

        $rootScope.$on(MESSAGE.r2s.gameCreated, function(event, data) {

            $state.go('waitingPlayers', data);
        });

        $rootScope.$on(MESSAGE.r2s.startGame, function() {

            $state.go('startGame');
        });
    }]);

