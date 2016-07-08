
app.on({page: 'storage', preventClose: false, content: 'storage.html', readyDelay: 1}, function(activity) {
	var db,dbName = 'todos.db',todosCount=0;

	var insertTodo = function(evt) {
		var todoText =  $('#todo_text').val();
	    deviceReady(function() {
		    db = window.sqlitePlugin.openDatabase({
		        name: dbName,
		        location: 'default'
		    }, function(res) {
		         var query = "INSERT INTO todos_list (text) VALUES (?)";
		        runQuery(query,[todoText],function(res) {
		          todosCount++;
		          console.log(JSON.stringify(res));
		          alert("New Todo Created");
				  $('#todos_list').prepend("<li class='padded-list'>"+todoText+"</li>");
				  $('#todo_text').val('');
		        }, function (err) {
		          alert("New Todo Creation Error");
		          alert(JSON.stringify(err));
		        });
		    },function(err){
		        console.log(err);
		    });
	    });
	};

	var getTodos = function(needsRefresh) {
	    deviceReady(function() {
	       db = window.sqlitePlugin.openDatabase({
	        name: dbName,
	        location: 'default'
	      }, function(res) {
			 if(needsRefresh){
				 $('#todos_list').html('');
			 }
	         var query = "SELECT * from todos_list";
	        runQuery(query,[],function(resultSet) {
	          var todosArr = [];
	          for(var i = 0;i<resultSet.rows.length;i++)
	          {
	            todosArr.push(resultSet.rows.item(i));
				var currentTodo = resultSet.rows.item(i);
				$('#todos_list').prepend("<li class='padded-list'>"+currentTodo.text+"</li>")
	          }
	          console.log(todosArr);
	        }, function (err) {
	          alert("Error in fetching Todos.");
			  alert(JSON.stringify(err));
	        });
	      },function(err){
	        console.log(err);
	      });
	    });
	}

	var refreshTodos = function(){
		getTodos(true);
	}

	activity.onCreate(function() {
		document.getElementById('insertTodoBtn').on('tap',insertTodo);
		document.getElementById('refreshTodosBtn').on('tap',refreshTodos);
		initDB();
		getTodos();
    });

	function initDB(){
		deviceReady(function() {
	       db = window.sqlitePlugin.openDatabase({
	        name: dbName,
	        location: 'default'
	      }, function(res) {
	        console.log(res);
	      },function(err){
	        console.log(err);
	      });

	       var query = "CREATE TABLE IF NOT EXISTS todos_list (text string)";
	        runQuery(query,[],function(res) {
	         console.log(JSON.stringify(res));
	         console.log("table created ");
	        }, function (err) {
	          alert(JSON.stringify(err));
	        });
    	});
	}

	function runQuery(query,params,successCb,errorCb){
	    db.executeSql(query, params, function (result) {
	      successCb(result);
	    }, function(error) {
	      console.log('SELECT error: ' + error.message);
	      errorCb(error);
	    });
	}

});
