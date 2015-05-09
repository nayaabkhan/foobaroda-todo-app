# FooDo App Tutorial

In this tutorial, we walk through all the steps to get our final FooDo App ready that you could find [here](http://nayaabkhan.github.io/foobaroda-todo-app).

## Step 1: Adding basic markup and styling

First let's create the HTML and the CSS for our app. Create an `index.html` first.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>FooDo App</title>

    <link rel="stylesheet" href="app.css">
  </head>
  <body>

    <div class="app-header">
      <h1 class="app-header-title">FooDo App</h1>
      <h2 class="app-header-description">Collborative ToDo app for Foo Baroda Group</h2>
    </div>

    <div class="app-container"></div>

    <div class="app-footer">
      &copy; Copyright Foo Baroda.
      Code available on <a target="_blank" href="https://github.com/nayaabkhan/foobaroda-todo-app">Github</a>.
    </div>

  </body>
</html>
```

Here we have a basic HTML skeleton. We have also divided our app into 3 sections `app-header`, `app-container` and a `app-footer`. Nothing much happening here, our page looks very sad without any styling.

So next let's add a CSS to our app. Call it `app.css` and the following style declarations to it.

```css
* {
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Nueve', Arial, sans-serif;
  font-size: 15px;
  color: #444;
  background-color: #ececec;
}

.app-header,
.app-container,
.app-footer {
  margin: 0 auto;
  width: 480px;
}

.app-header,
.app-footer {
  text-align: center;
}

.app-header {
  margin-top: 90px;
  margin-bottom: 30px;
}

.app-header-title {
  margin: 0 0 4px;
  font-size: 27px;
}

.app-header-description {
  margin: 0;
  font-size: 15px;
  font-weight: normal;
}

.app-footer {
  font-size: 12px;
  color: #888;
}
```

We have added some font settings, color and a background color for the whole app. Rest is just some layout and margins to space things a bit. If you have worked with any CSS before, you'd find it to be very trivial.

Now our app looks pretty. But there isn't much happening here. Probably we should call it a page right now, not an app. In next step, we will add the all mighty AngularJS to our page and start making it more of an app than a mere page.

## Step 2: Adding AngularJS

In this step we won't be doing much, but we will do the all important thing– to add AngularJS and make our page into an Angular App.

So first open the `index.html` and add the following two script tags just after our footer.

```html
<div class="app-footer">
  &copy; Copyright Foo Baroda.
  Code available on <a target="_blank" href="https://github.com/nayaabkhan/foobaroda-todo-app">Github</a>.
</div>

<!-- add these two scripts -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
<script src="app.js"></script>

</body>
```

The first script tag adds AngularJS to our page. We are using the version `1.3.15` of Angular for our app. The next script tag add a script called `app.js`, which will hold our application code we will write. So let's create it and add the following code to it.

```javascript
// create fooDoApp module
var app = angular.module('foodoApp', []);
```

Now we can call it an app! The above lines create a new Angular Module called `foodoApp` and stores a reference to it in the `app` variable. We will use this `app` variable in the next steps.

Now before we move to the next step, we need to make just one more change to our `index.html`. We need to add an `ng-app` attribute, this tells Angular to hook it to the module we created in the `app.js` file.

```html
<div class="app-container" ng-app="foodoApp"></div>
```

Notice how the value of `ng-app` matches the name of module in the `app.js`, that is `foodoApp`.

You could add this attribute anywhere in your document. Only thing to be aware of– only the DOM Elements including and within the element having this attribute with act as an Angular App. You can have more than one such attribute. Meaning you could have more than one app. But usually it is common to have just one app.

## Step 3: Adding and listing Todos

So in the previous step, we didn't do much code-wise but learned the most basic thing about Angular– an App. In this step, we will start implementing our ToDo App.

In Angular, and most other MV\* Frameworks, the most important thing is a **Controller**, also called **ViewModel**. We would stick to using the term **Controller**. A Controller holds a unit of your App logic together. It consists of properties to store data and methods to respond to events.

So let's add a controller to our `app.js`.

```javascript
var app = angular.module('foodoApp', []);

app.controller('mainController', function ($scope) {
  // controller stuff goes here
});
```

So our Controller is called `mainController` and the recipe to declare it is `app.controller(name, function)`. Also notice we have "injected" a `$scope` "dependency" to our controller. `$scope` is the glue between a Controller and it's View. We will see how next.

Now, we will create some mock ToDos and see how we could display them in our App.

Each of our ToDo will have two properties– the text and whether it is done or not. So let's add a mock array of a few ToDos to our `app.js`, each having a `text` and `done` property.

```javascript
app.controller('mainController', function ($scope) {

  // mock todos
  $scope.todoList = [
    { text: 'Shave', done: false },
    { text: 'Clean the house', done: false },
    { text: 'Share selfies on FB', done: true }
  ];

});
```

You would notice here that we have added our ToDos to the `$scope`. Anything to add to the `$scope` will be available to you in the View and vice-versa.

To show our ToDos in the app, we need to create a View and tie our `mainController` to it. So let's do that.

```html
<div class="app-container" ng-app="foodoApp">

  <!-- declare our View and tie it to the Controller -->
  <ul ng-controller="mainController">

  </ul>

</div>
```

Now we are ready to show our ToDos. So let's see the power of Angular repeaters.

```html
<ul ng-controller="mainController">
  <li ng-repeat="todoItem in todoList">
    {{ todoItem.text }}
  </li>
</ul>
```

Here we use an Angular Directive called `ng-repeat` to repeat an element over an array in our controller. In this case `todoList`. The attribute value `todoItem in todoList` tells Angular to repeat for each item in `todoList` and store it in a local variable `todoItem` for us to use. The bit in the curly braces is the value to be put in our HTML. We would like to print the `text`, hence `todoItem.text`.

So now our app looks better, we could see our ToDos. Now let's show whether a ToDo is done or not.

```html
<ul ng-controller="mainController">
  <li ng-repeat="todoItem in todoList">
    <span ng-if="todoItem.done">✔︎</span>
    <span ng-if="!todoItem.done">✖︎</span>
    {{ todoItem.text }}
  </li>
</ul>
```

Here we use yet another Angular directive called `ng-if`. Using this we could conditionally show or hide an element. We show a ✔︎ when `done` is `true` for an item and a ✖︎ if it is `false`.

Let's add a bit of CSS to our `app.css` to make it look a bit better. Add the following just above the `app-footer` style declaration.

```css
.app-container {
  margin-bottom: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 5px;
}
```

## Step 4: Making the list better

At this point, we are able to display the ToDos well but this isn't the way it should look. So let's add some checkboxes so we could interact with our ToDo items. Let's replace the `ul` tag with the following markup.

```html
<div class="app-container" ng-app="foodoApp">

  <form ng-controller="mainController">
    <ul class="app-todo-list">
      <li ng-repeat="todoItem in todoList">
        <label ng-class="{'app-todo-item-done': todoItem.done}">
          <input type="checkbox" ng-model="todoItem.done">
          <span>{{todoItem.text}}</span>
        </label>
      </li>
    </ul>
  </form>

</div>
```

You would notice the same `ng-repeat` used again. But there are a couple of new directives we have used.

`ng-class` is used to conditionally apply a class to an element. The recipe looks like `ng-class="{'className': condition}"`. The `className` is applied when the `condition` becomes `true`. In our case, we apply the `app-todo-item-done` when our `todoItem` is done. We will style this class in our CSS to show the done ToDos a little differently, as we will see later.

`ng-model` is a directive used to "bind" an HTML control to a value. Here, we bind our `checkbox` to the `todoItem.done`. So it will be checked if it is done, otherwise not.

Okay now let's add a bit of styling to our `app.css` to make things pretty. Add this just above the `app-footer` style declaration.

```css
.app-todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app-todo-list li {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.app-todo-list li label {
  display: block;
  cursor: pointer;
}

.app-todo-list li:last-child {
  border-bottom: none;
}

.app-todo-item-done span {
  color: #888;
  text-decoration: line-through;
}
```

Notice the `.app-todo-item-done span` style declarations. We make it's color a little muted and add a strike-through to the text to indicate it is done.

Okay, so now our App looks much like what we expect it to look. In next step, we will see how to add new ToDos.

## Step 5: Adding new ToDos

In order to add new ToDos, we need to add an `input` to our view, from where the user will enter the text for the new ToDo. Let's do this in our `app.html`.

```html
<form ng-controller="mainController"
      ng-submit="addNewTodo()">
  <div class="app-add-todo">
    <input type="text"
           placeholder="What do you want to do?"
           autofocus
           ng-model="newTodoText">
    <button type="submit">+</button>
  </div>
  <ul class="app-todo-list">...
```

Most of the above is regular HTML. We have added a text `input` and a submit `button`. We have used `ng-model` again, this time we bind our text input with a property `newTodoText`. We will add this in our controller soon. But first we need to learn about a new directive we used, `ng-submit`.

`ng-submit` is a very simple directive. You need to pass a method on the scope to it and it will be executed whenever you submit the form. Here we give it a method named `addNewTodo()`. Let's add the required stuff in our controller now.

First let's add the `newTodoText` that will hold the text entered by the user. It is an empty string, because initially we dont need to show any text.

```js
app.controller('mainController', function ($scope) {

  // model to hold the new todo text
  $scope.newTodoText = '';

  // mock todos
  $scope.todoList = ...
```

Next, let's implement the `addNewTodo()` method. Add this just after the mock todos array.

```js
$scope.todoList = ...

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
```

You see, it is quite simple. We just to a basic validation check first to see it the text is empty and return if so. Otherwise, we add the new ToDo to our `todoList`. By default, we keep `done` as `false`. In the end, we want to reset our `newTodoText` to empty string.

Let's make it look better with some more styles.

```css
.app-add-todo {
  border-bottom: 1px solid #ccc;
}

.app-add-todo:after {
  content: "";
  display: table;
  clear: both;
}

.app-add-todo input {
  border: 0;
  padding: 8px;
  background-color: transparent;
  width: 90%;
  font-size: 16px;
  text-align: center;
  float: left;
}

.app-add-todo input:focus {
  outline: none;
}

.app-add-todo button {
  border: none;
  width: 10%;
  float: left;
  height: 39px;
  font-size: 18px;
  color: #1386EE;
  background-color: transparent;
  cursor: pointer;
}
```

In the next step, we will implement removal of ToDos.

## Step 6: Removing ToDos

For removing a ToDo, we add a "delete" button for each of the ToDo item we have. We then add a method to our controller to handle the removal of the item. So first, let's add the delete button in our view.

Add a `button` just below the `label` element that shows our Todo text.

```html
...
</label>
<button class="app-delete-todo"
        ng-click="deleteTodo($index)">DELETE</button>
```

Another new directive here– `ng-click`. You might have guessed it and guessed it right. It executes a method on our scope when you click the element. But there's some strange `$index` we've passed to our `deleteTodo` method. Where did it come from, you might ask. It comes from the `ng-repeat` directive and it is the array index of the current item. For deletion, we need this index to know which item is to be removed.

All right, so let's implement the `deleteTodo`. Add this after the `addTodo` method.

```javascript
// method to remove a todo from the todoList
$scope.deleteTodo = function (index) {
  $scope.todoList.splice(index, 1);
};
```

Simple JavaScript here. We just remove the item using the `splice` method and the `index` we passed. One last touch, a little CSS to style our delete buttons. Add this just before the `app-footer` again.

```css
.app-delete-todo {
  position: absolute;
  top: 9px;
  right: 10px;
  border: none;
  border-radius: 3px;
  color: #fff;
  background-color: red;
  cursor: pointer;
}
```

So our App is fully functional now and we could stop here. But our ToDos aren't being saved. If you make changes and reload the App, all your work is lost. In the next and our last step, we add Firebase to our App to store our ToDos in a Database.

## Step 7: Adding Firebase

[Firebase](http://firebase.com/) is a cloud based realtime data storage and it suits perfectly for our ToDo App. We could make our ToDo App into a realtime collaborative App. So let's add it to our App.

First we need to load the core Firebase library and the Angular library for Firebase. Add these in our `index.html` just above the script which includes our `app.js`.

```html
...
<script src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
<script src="https://cdn.firebase.com/libs/angularfire/1.0.0/angularfire.min.js"></script>
<script src="app.js"></script>
```

Here we load two new libraries– `firebase.js` and `angularfire.min.js`.

Next we need to tell Angular that we want to utilize Firebase in our App. This is done by specifying `firebase` as a module dependency. This is how it is done. Change the line in `app.js` like below.

```javascript
var app = angular.module('foodoApp', ['firebase']);
```

All we have to do is to add `'firebase'` to the array– the second argument to `angular.module`. Now we can start using Firebase in our app.

Now let's remove our mock ToDo list and make it so that it loads and saves to our Firebase Database.

```javascript
app.controller('mainController', function ($scope, $firebaseArray) {

  // reference to the firebase model
  var ref = new Firebase("https://foodo-app.firebaseio.com/todos");

  // model to hold the new todo text
  $scope.newTodoText = '';

  // firebase todos array
  $scope.todoList = $firebaseArray(ref);
  ...
```

The first thing we create is a Firebase reference using a Firebase URL `https://foodo-app.firebaseio.com/todos`. In this tutorial, we are using my Firebase account. You should create your own account and use it. Then we create a `$firebaseArray` and assign it to our `todoList` because now we want Firebase to manage them for us. Notice we injected `$firebaseArray` to our controller.


Now, as our `todoList` isn't a JavaScript array anymore, the `push` and `splice` functions used in `addNewTodo` and `deleteTodo` won't work anymore. We need to use methods specified by `$firebaseArray` instead, which are `$add` and `$remove`. So let's replace them.

```javascript
$scope.addNewTodo = function () {
  ...

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
```

Okay cool, so now if you try out our App you would see that your work is preserved if your reload the App. Adding new Todos and removing works fine but when you mark a ToDo as done or not done, it is not being saved. Looks like we need to tell Firebase explicitly when our ToDo changes.

```html
<input type="checkbox" ng-model="todoItem.done" ng-change="todoList.$save(todoItem)">
```

Here we use the `ng-change` directive which calls the `$save` method on the `todoList`. Our current ToDo `todoItem` is passed to the `$save` method so that it updates the existing record in it's database.

So now everything is being stored well and we have a functional collaborative app. How do we check it is realtime? Open the app in another browser or device and try it our yourself. You'd be awestruck.
