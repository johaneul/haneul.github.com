angular.module('todoApp').controller("todoCtrl", function ($scope) {

	$scope.todos = [];
	
	if(localStorage.getItem('neulTodo') != null){
		
		var local = JSON.parse(localStorage.getItem('neulTodo'));		
		var newTodo ;		
		for(var i=0; i<local.length; i++){
			newTodo = {
				id: local[i].id,
				title: local[i].title,
				completed: local[i].completed
			};
			
			$scope.todos.push(newTodo);
		}
		
	}

	$scope.removeTodo = function (id) {
		if (!id) {
			return;
		}

		// 배열에서 제거할 인덱스를 검색
		var delTodoIndex = $scope.todos.findIndex(function (todo) {
			return todo.id === id;
		});

		if (delTodoIndex === -1) {
			return;
		}

		// 배열에서 제거
		$scope.todos.splice(delTodoIndex, 1);
		
		localStorage.setItem('neulTodo', JSON.stringify($scope.todos));

	}

	$scope.addTodo = function (todoTitle) {
		todoTitle = todoTitle.trim();
		if (!todoTitle) {
			return;
		}

		var newId = !$scope.todos.length ? 1 : $scope.todos[$scope.todos.length - 1].id + 1;
		var newTodo = {
			id: newId,
			title: todoTitle,
			completed: false
		};

		$scope.todos.push(newTodo);
		localStorage.setItem('neulTodo', JSON.stringify($scope.todos));
		
	};

	$scope.$watch('status', function () {
		if ($scope.status === 'completed') {
			$scope.statusFilter = {
				completed: true
			}
		} else if ($scope.status === 'active') {
			$scope.statusFilter = {
				completed: false
			}
		} else {
			$scope.statusFilter = {}
		}
	});
	$scope.clearCompleted = function () {
		var incompleteTodos = $scope.todos.filter(function (todo) {
			return !todo.completed;
		});
		angular.copy(incompleteTodos, $scope.todos);
	};
	
	$scope.completeTodo = function () {
		
		localStorage.setItem('neulTodo', JSON.stringify($scope.todos));

		
	};
	



});