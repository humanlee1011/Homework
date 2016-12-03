/* 
 * author: 15331169 lixiaoyun
 * Source: Web homework8 TableSorter 1.0
 *
 */

(function($) {
	'user strict';
	
	$(document).ready(function() {
		$('table').find('th').click(tableSorter);
	});

	function tableSorter() {
		var sortedBefore = $(this).parent().find('.sorted');
		sortedCheck.call(this);
		if (!$(this).hasClass('sorted') || !sortedBefore.length)
			sortedBefore.attr('class', null);
		$(this).addClass('sorted');
	}

	function sortedCheck() {
		var isAscend = true;//默认降序，则第一次排序为升序
		if ($(this).hasClass('sortAscend')) 
			$(this).removeClass('sortAscend').addClass('sortDescend');
		else if ($(this).hasClass('sortDescend')) {
			$(this).removeClass('sortDescend').addClass('sortAscend');
			isAscend = false;
		}
		else 
			$(this).addClass('sortDescend');
		Sort.call(this, isAscend);
	}

	function Sort(isAscend) {
		var factor = isAscend? -1: 1;//根据isAscend给予排序函数一个乘数因子
		var index = $(this).index(),
			$tbody = $(this).parent().parent().parent().find('tbody'),
			datas = $tbody.find('tr').get();
		datas.sort(function(dataA, dataB) {
			return factor * dataA.cells[index].textContent.localeCompare(dataB.cells[index].textContent);
		});
		$tbody.html('').append(datas);
	}
})(jQuery);