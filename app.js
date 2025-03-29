var app = angular.module("todoApp", []);
app.controller('inputCtrl', function($scope){
    $scope.userInput = "";
    if(localStorage.getItem("todos") !== null) {
        $scope.todolist = JSON.parse(localStorage.getItem("todos"));
    } else {
        $scope.todolist = [];
    }
    $scope.inputStyle = {
        "background-color": "lightblue"
    };
    $scope.handleSubmit = function() {
        if($scope.userInput.trim() !== "") {
            $scope.todolist.push({task: $scope.userInput, completed: false});
            $scope.userInput = "";
            $scope.saveTodos();
        }
    };
    $scope.deleteTodo = function(todo) {
        $scope.todolist.splice($scope.todolist.indexOf(todo), 1);
        $scope.saveTodos();
    };
    
    $scope.leftTasks = function() {
        return $scope.todolist.filter(function(todo) {
            return !todo.completed;
        }).length;
    };
    $scope.clearCompleted = function() {
        $scope.todolist = $scope.todolist.filter(function(todo) {
            return !todo.completed;
        });
        $scope.saveTodos();
    };
    $scope.saveTodos = function() {
        localStorage.setItem("todos", JSON.stringify($scope.todolist));
    };
    $scope.loadTodos = function() {
        $scope.todolist = JSON.parse(localStorage.getItem("todos"));
    };
    
});
