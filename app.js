// create fooDoApp module
var app = angular.module('foodoApp', []);

app.controller('mainController', function ($scope) {

  // mock todos
  $scope.todoList = [
    { text: 'Shave', done: false },
    { text: 'Clean the house', done: false },
    { text: 'Share selfies on FB', done: true }
  ];

});
