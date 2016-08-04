console.log('I live to serve');
$(document).ready(function(){
	$('#new-todo').submit(function(e) {
		 
		var todo = $(this).serialize();

		$.post('/todos', todo, function(data) {
			console.log(data);
			$('#todo-list').append('<li class="list-group-item">' + data.body + '</li>');
			$('#new-todo')[0].reset();
		});
	});


	// 	$.post('/todos', todo, function(data) {
	// 		console.log(data);
	// 		$('#todo-list').append('<li class="list-group-item">' + 
	// 		"<a href='/todos/" + data._id + ">" + data.body + "</a>" +
	// 		"<div class='remove-todo'> data-id='" + data._id + "'><i class='ion-ios-trash'" +
	// 		'</li>');
	// 		$('#new-todo')[0].reset();
	// 	});
	// });


	$('.remove-todo').click(function (e) {
		e.preventDefault();

		var todo = $(this);
		var todoId = todo.data('id');;

		console.log(todoId);

		$.ajax({
			url: '/todos/' + todoId,
			type: 'DELETE',
			success: function(data) {
				// do something with result
				todo.parent().remove();
			}
		});
	});
});