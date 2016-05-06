var backendUrl = "http://localhost:16247/";
var apiUrl = backendUrl + "api";

var app = angular.module('angular-signalr', [])
    .controller('todoCtrl', ["$scope", "$http", "$timeout", "$rootScope", function ($scope, $http, $timeout, $rootScope) {
        $scope.todos = [];
        $scope.todoText = null;

        $scope.addTodo = function (todoItem) {
            if (todoItem == null || todoItem == '') return;
            $scope.todos.push(todoItem);
            $scope.todoText = null;
            postTodo(todoItem);
        };

        $scope.deleteTodoItem = function (todoItem) {
            $http({
                method: 'DELETE',
                url: apiUrl + '/todos',
                data: { value: todoItem }
            });
            deleteItemInList(todoItem);
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

        function deleteItemInList(todoItem) {
            var index = $scope.todos.indexOf(todoItem);
            if (index != -1) {
                $scope.todos.splice(index, 1);
                $scope.$apply();
            }
        }

        getTodos();

        $rootScope.$on('deletedtodo', function (event, data) {
            deleteItemInList(data.message);
        });
        $rootScope.$on('addedtodo', function (event, data) {
            if ($scope.todos.indexOf(data.message) == -1) {
                $scope.todos.push(data.message);
                $scope.$apply();
            }
        });


    }])
    
    .controller('chatCtrl', ["$scope", "$rootScope","$http", function ($scope, $rootScope,$http) {
        $scope.blockChat = function () {
            $http({
                method: 'POST',
                url: apiUrl + '/chats'
            });
        }
    }])
    
    .controller('homeCtrl', ["$scope", "$rootScope", function ($scope, $rootScope) {
        $scope.setUserName = function (name) {
            $rootScope.userName = name;
            $scope.showAll = true;

            $.connection.hub.url = backendUrl + '/signalr';
            connectSignalrTodo();
            connectSignalrChat();
            
            $.connection.hub.start().done(function () {
                 
            });
        }

        function connectSignalrTodo() {
                var todohub = $.connection.todoHub;
                // Create a function that the hub can call back to display messages.
                todohub.client.addTodoItem = function (name, message) {
                    // Add the message to the page.
                    $rootScope.$emit('addedtodo', { name: name, message: message });
                    $('#discussion').append('<li><strong>' + htmlEncode(name)
                         + '</strong>: ' + htmlEncode(message) + '</li>');
                };
                
                todohub.client.deleteTodoItem = function (name, message) {
                    // Add the message to the page.
                    $rootScope.$emit('deletedtodo', { name: name, message: message });
                    $('#discussion').append('<li><strong>' + htmlEncode(name)
                         + '</strong>: ' + htmlEncode(message) + '</li>');
                };           
               
        };

        function connectSignalrChat() {
            var chat = $.connection.chatHub;

            chat.client.addItem = function (name, message) {
                // Add the message to the page.
                $('#discussion').append('<li><strong>' + htmlEncode(name)
                    + '</strong>: ' + htmlEncode(message) + '</li>');
                $('#discussionchat').append('<li><strong>' + htmlEncode(name)
                    + '</strong>: ' + htmlEncode(message) + '</li>');
            };

            $scope.clickchat = function () {
                chat.server.send($rootScope.userName, $('#messagechat').val());
                // Clear text box and reset focus for next comment.
                $('#messagechat').val('').focus();
            }

        };

        function htmlEncode(value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
        }

    }])

app.config(function ($httpProvider) {
    $httpProvider.defaults.headers["delete"] = {
        'Content-Type': 'application/json;charset=utf-8'
    };
});
