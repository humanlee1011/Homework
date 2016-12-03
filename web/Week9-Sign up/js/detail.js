// author: 15331169 lixiaoyun
// hw: week9 sign in

(function($) {
	$(document).ready(function() {
		$.ajax(window.location.href, {
			type: "POST",
			url: window.location.href,
			success: function(data, textStatus) {
				console.log(data);
				$('input[name=username]').val(data.username);
				$('input[name=idNumber]').val(data.idNumber);
				$('input[name=phoneNumber]').val(data.phoneNumber);
				$('input[name=mail]').val(data.mail);
				$('input').each(function() {
					$(this).attr('disabled', true);
				})
			}
		});  
	});
})(jQuery);