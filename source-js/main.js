jQuery(document).ready(function () {
  function guid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  var storageToDo = localStorage.toDo;
  var toDoArr = [];

  if (storageToDo && JSON.parse(localStorage.toDo).length) {
    toDoArr = JSON.parse(localStorage.toDo);
  }

  jQuery('.todo-form').submit(function () {
    var text = jQuery('.todo-input').val();
    var buttons = jQuery('<div class="todo-container"><button class="btn-edit">Edit</button><button class="btn-delete">Delete</button></div>');
    var todoItemInput = jQuery('<input class="todo-element-input"/>');
    var textItem = jQuery('<span class="text"></span>');
    var liElement = jQuery('<li class="todo-item"></li>');
    var inputToDo = jQuery('.todo-input').val();
    if (!inputToDo) {
      alert('Enter text');
      return false;
    }

    var dataObj = {
      id: guid(),
      value: text
    };

    jQuery(textItem).text(text);
    jQuery(todoItemInput).val(text);

    toDoArr.push(dataObj);
    localStorage.setItem('toDo', JSON.stringify(toDoArr));

    liElement.append(textItem);
    liElement.append(todoItemInput);
    liElement.append(buttons);

    jQuery('.todo-input').val('');
  });

  jQuery.each(toDoArr, function (index, item) {
    var buttons = jQuery('<div class="todo-container"><button class="btn-edit">Edit</button><button class="btn-delete">Delete</button></div>');
    var liElement = jQuery('<li class="todo-item"></li>');
    var inputElement = jQuery('<input class="todo-item-input">');
    var textItem = jQuery('<span class="text"></span>');
    jQuery(inputElement).val(item.value);
    jQuery(textItem).text(item.value);
    jQuery(liElement).append(textItem);
    jQuery(liElement).append(inputElement);
    jQuery(liElement).attr('id', item.id);
    jQuery(liElement).append(buttons);

    jQuery('.todo-ol').append(liElement);
  });

  jQuery('.todo-ol').on('click', '.btn-delete', function (e) {
    e.preventDefault();
    var id = jQuery(this).parents('li').attr('id');

    toDoArr = toDoArr.filter(function (item) {
      return item.id !== id;
    });

    localStorage.setItem('toDo', JSON.stringify(toDoArr));

    jQuery(this).parents('li').remove();
  });
});
