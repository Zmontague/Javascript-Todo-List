var toDoList = {
    todos: [],
    addToDos: function(thingToDo) {
        this.todos.push({
            thingToDo: thingToDo,
            completed: false

        });
    },
    changeToDo: function (toDoNumber, thingToDo) {
        this.todos[toDoNumber].thingToDo = thingToDo;
    },
    deleteToDo: function(whatToDelete) {
        this.todos.splice(whatToDelete, 1);
    },
    toggleCompleted: function(toDoNumber) {
      let todo = this.todos[toDoNumber];
      todo.completed = !todo.completed;
    },
    toggleAll: function() {
      let totalTodos = this.todos.length;
      let completedTodos = 0;

      this.todos.forEach(function(todo) {
        if (todo.completed === true) {
          completedTodos++;
        }
      });
    this.todos.forEach(function() {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    toDoList.addToDos(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeToDo: function() {
    let changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    let changeTodoTextInput = document.getElementById("changeTodoTextInput");
    toDoList.changeToDo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoTextInput.value = "";
    changeTodoPositionInput.value = "";
    view.displayTodos();
  },
  deleteToDo: function(thingToDelete) {
    toDoList.deleteToDo(thingToDelete);
    view.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    toDoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value="";
    view.displayTodos();
  },
  toggleAll: function() {
    toDoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    let todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

    toDoList.todos.forEach(function(todo, position) {
      let todoLi = document.createElement("li");
      let todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.thingToDo;
      } else {
        todoTextWithCompletion = "( ) " + todo.thingToDo;
      }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    let todosUl = document.querySelector("ul");

    todosUl.addEventListener("click", function(event) {
      let elementClicked = event.target;
      if (elementClicked.className === 'deleteButton') {
          handlers.deleteToDo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

// Debugging Assist - very simple example of higher order function and call back
var debugging = {
    runWithDebugger: function(functionToDebug) {
      debugger;
      functionToDebug();
    }
};

// End of file function calls
view.setUpEventListeners();
