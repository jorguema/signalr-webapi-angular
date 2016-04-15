angular.module('angular-signalr', [])

    .controller('homeCtrl', ["$scope", function($scope) {

        $.connection.hub.url = 'http://localhost:59054/signalr';
        var chat = $.connection.chatHub;
        // Create a function that the hub can call back to display messages.
        chat.client.addNewMessageToPage = function(name, message) {
            // Add the message to the page.
            $('#discussion').append('<li><strong>' + htmlEncode(name)
                + '</strong>: ' + htmlEncode(message) + '</li>');
        };
        // Get the user name and store it to prepend to messages.
        $('#displayname').val(prompt('Enter your name:', ''));
        // Set initial focus to message input box.
        $('#message').focus();
        // Start the connection.
        $.connection.hub.start().done(function() {
            $('#sendmessage').click(function() {
                // Call the Send method on the hub.
                chat.server.send($('#displayname').val(), $('#message').val());
                // Clear text box and reset focus for next comment.
                $('#message').val('').focus();
            });
        });



        var notification = $.connection.notificationHub;
        // Create a function that the hub can call back to display messages.
        notification.client.addNotification = function(name, message) {
            // Add the message to the page.
            $('#discussion2').append('<li><strong>' + htmlEncode(name)
                + '</strong>: ' + htmlEncode(message) + '</li>');
        };
        // Set initial focus to message input box.
        $('#message2').focus();
        // Start the connection.
        $.connection.hub.start().done(function() {
            $('#sendmessage2').click(function() {
                // Call the Send method on the hub.
                notification.server.send($('#displayname').val(), $('#message2').val());
                // Clear text box and reset focus for next comment.
                $('#message2').val('').focus();
            });
        });

        function htmlEncode(value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }

        $scope.connect = function(name) {

        }

    }])