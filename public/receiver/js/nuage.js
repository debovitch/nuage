$(window).load(function() {

    cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    debug('Starting Receiver Manager');

    // Handler for the 'ready' event
    castReceiverManager.onReady = function(event) {
        debug('Received Ready event: ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState('Application status is ready...');
    };

    // Handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function(event) {

        debug('Received Sender Connected event: ' + event.data);
        //debug(window.castReceiverManager.getSender(event.data).userAgent);
    };

    // Handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function(event) {
        debug('Received Sender Disconnected event: ' + event.data);
        if (castReceiverManager.getSenders().length == 0 &&
            event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
            window.close();
        }
    };

    // Handler for 'systemvolumechanged' event
    castReceiverManager.onSystemVolumeChanged = function(event) {
        debug('Received System Volume Changed event: ' + event.data['level'] + ' ' +
            event.data['muted']);
    };

    // Create a CastMessageBus to handle messages for a custom namespace
    window.messageBus =
        window.castReceiverManager.getCastMessageBus(
            'urn:x-cast:fr.duchassin.nuage');

    // Handler for the CastMessageBus message event
    messageBus.onMessage = function(event) {
        debug('Message [' + event.senderId + ']: ' + event.data);
        // Display the message from the sender
        parseMessage(event.data);
        // Inform all senders on the CastMessageBus of the incoming message event
        // Sender message listener will be invoked
        window.messageBus.send(event.senderId, event.data);
    };

    // Initialize the CastReceiverManager with an application status message
    castReceiverManager.start({
        statusText : 'Application is starting',
        maxInactivity : 6000
    });
    debug('Receiver Manager started');
});

// Utility function to display the text message
function displayText(text) {

    debug(text);
    $('.content').html(text);
    castReceiverManager.setApplicationState(text);
}

function parseMessage(json) {

    var message;

    try {
        message = JSON.parse(json);
    } catch(e) {
        window.messageBus.broadcast('Failed to parse json : ' + json);
        return;
    }

    switch(message.service) {
        case 'createGame' :
            displayGameCreated(message.player);
            break;
        case 'joinGame' :
            joinGame(message.player);
        default :
            window.messageBus.broadcast('Unknown service : ' + message.service);
    }
    castReceiverManager.setApplicationState(message.service)
}

function displayGameCreated(player) {

    window.firstPlayer = player;
    var text = '<p class="bluesky">Partie créée par ' + player + '</p>' +
            '<p class="lightpurple">En attente de deux joueurs supplémentaires</p>';
    $('.content').html(text);
}

function joinGame(player) {

    window.secondPlayer = player;
    var text = '<p class="bluesky">Partie créée par ' + player + '</p>' +
            '<p class="lightpurple>' + player + ' a rejoint la partie</p>' +
            '<p class="lightpurple">En attente d\'un joueur supplémentaire</p>';
    $('.content').html(text);
}