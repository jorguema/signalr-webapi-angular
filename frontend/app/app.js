var backendUrl = "http://localhost:16247/";
var apiUrl = backendUrl + "api";

var app = angular.module('angular-signalr', [])
    .controller('todoCtrl', ["$scope", "$http", "$timeout", function ($scope, $http, $timeout) {
        $scope.todos = [];
        $scope.todoText = null;

        $scope.addTodo = function (todoItem) {
            if (todoItem == null || todoItem == '') return;
            $scope.todos.push(todoItem);
            $scope.todoText = null;
            postTodo(todoItem);
        };

        $scope.deleteTodoItem = function (todoItem) {
            deleteTodo(todoItem);
        }


        function getTodos() {
            $scope.loading = true;
            $http({
                method: 'GET',
                url: apiUrl + '/todos'
            }).then(function successCallback(response) {
                $scope.todos = response.data;
                $timeout(function () {
                    $scope.loading = false;
                }, 1500);
            });
        };

        function postTodo(todoItem) {
            $http({
                method: 'POST',
                url: apiUrl + '/todos',
                data: { value: todoItem }
            })
        }

        function deleteTodo(todoItem) {
            $http({
                method: 'DELETE',
                url: apiUrl + '/todos',
                data: { value: todoItem }
            })
        }

        function handleSignalrTodo() {

        }

        getTodos();

    }])

    .controller('homeCtrl', ["$scope", "$rootScope", function ($scope, $rootScope) {
        $scope.setUserName = function (name) {
            $rootScope.userName = name;
            $scope.showAll = true;
        }
        
        $.connection.hub.url = backendUrl + '/signalr';

        var chat = $.connection.todoHub;
        // Create a function that the hub can call back to display messages.
        chat.client.addTodoItem = function (name, message) {
            // Add the message to the page.
            $('#discussion').append('<li><strong>' + htmlEncode(name)
                + '</strong>: ' + htmlEncode(message) + '</li>');
        };
        chat.client.deleteTodoItem = function (name, message) {
            // Add the message to the page.
            debugger;
        };
        // Get the user name and store it to prepend to messages.
        $('#displayname').val(prompt('Enter your name:', ''));
        // Set initial focus to message input box.
        $('#message').focus();
        // Start the connection.
        $.connection.hub.start().done(function () {
            $('#sendmessage').click(function () {
                // Call the Send method on the hub.
                chat.server.send($('#displayname').val(), $('#message').val());
                // Clear text box and reset focus for next comment.
                $('#message').val('').focus();
            });
        });



        // var notification = $.connection.notificationHub;
        // // Create a function that the hub can call back to display messages.
        // notification.client.addNotification = function (name, message) {
        //     // Add the message to the page.
        //     $('#discussion2').append('<li><strong>' + htmlEncode(name)
        //         + '</strong>: ' + htmlEncode(message) + '</li>');
        // };
        // // Set initial focus to message input box.
        // $('#message2').focus();
        // // Start the connection.
        // $.connection.hub.start().done(function () {
        //     $('#sendmessage2').click(function () {
        //         // Call the Send method on the hub.
        //         notification.server.send($('#displayname').val(), $('#message2').val());
        //         // Clear text box and reset focus for next comment.
        //         $('#message2').val('').focus();
        //     });
        // });

        function htmlEncode(value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }

        $scope.connect = function (name) {

        }

    }])

app.config(function ($httpProvider) {
    // $httpProvider.defaults.headers.common = {};
    // $httpProvider.defaults.headers.post = {};
    // $httpProvider.defaults.headers.put = {};
    // $httpProvider.defaults.headers.patch = {};
    $httpProvider.defaults.headers["delete"] = {
        'Content-Type': 'application/json;charset=utf-8'
    };
});
