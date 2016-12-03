// mysterious code
//一行神秘的代码....

(function($) { var isAscend = 1;var headLine;if ($('table th').html() != null) headLine = $('table th'); else if ($('thead td').html() != null)	headLine = $('thead td');	headLine.click(function() {		isAscend *= -1;		var index = $(this).index(),		$tbody = $(this).parent().parent().parent().find('tbody'),		datas = $tbody.find('tr').get();		datas.sort(function(dataA, dataB) {			return isAscend * dataA.cells[index].textContent.localeCompare(dataB.cells[index].textContent);		});		$tbody.html('').append(datas);	});} )(jQuery);
