nuageModule.factory('tools', function() {

    return {
        /**
         * Append message to debug message window
         * @param {string} message A message string
         */
        debug : function(message) {

            console.log(message);
            var dw = $('.debug');
            dw.append('<p>' + (typeof(message) == 'string' ? message : JSON.stringify(message)) + '</p>');
        }
    };
});