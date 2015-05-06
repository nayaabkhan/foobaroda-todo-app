// create fooDoApp module
var app = angular.module('foodoApp', []);

app.controller('mainController', function ($scope) {

  // model to hold the new todo text
  $scope.newTodoText = '';

  // mock todos
  $scope.todoList = [
    { text: 'Shave', done: false },
    { text: 'Clean the house', done: false },
    { text: 'Share selfies on FB', done: true }
  ];


  // method to add a new todo to the todoList
  $scope.addNewTodo = function () {
    if ($scope.newTodoText.trim() === '') {
      return;
    }

    $scope.todoList.push({
      text: $scope.newTodoText,
      done: false
    });
    $scope.newTodoText = '';
  };

  // method to remove a todo from the todoList
  $scope.deleteTodo = function (index) {
    $scope.todoList.splice(index, 1);
  };

});
