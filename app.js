// create fooDoApp module
var app = angular.module('foodoApp', ['firebase']);

app.controller('mainController', function ($scope, $firebaseArray) {

  // reference to the firebase model
  var ref = new Firebase("https://foodo-app.firebaseio.com/todos");

  // model to hold the new todo text
  $scope.newTodoText = '';

  // firebase todos array
  $scope.todoList = $firebaseArray(ref);


  // method to add a new todo to the todoList
  $scope.addNewTodo = function () {
    if ($scope.newTodoText.trim() === '') {
      return;
    }

    $scope.todoList.$add({
      text: $scope.newTodoText,
      done: false
    });
    $scope.newTodoText = '';
  };

  // method to remove a todo from the todoList
  $scope.deleteTodo = function (index) {
    $scope.todoList.$remove(index);
  };

});
