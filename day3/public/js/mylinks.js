var files = ['3_01.html'];
var files_div = document.getElementById('file_list');
var ordered_list = document.createElement('ol');
files_div.appendChild(ordered_list);
files.map(function(f){
  var list = document.createElement('li');
  var anchor = document.createElement('a');
  anchor.href = './' + f;
  anchor.innerHTML = f;
  list.appendChild(anchor);
  ordered_list.appendChild(list);
});
