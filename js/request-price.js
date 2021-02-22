/* global notice, LOCALE */
$(function () {
	$('body')
		.on('click', '.js-request-price:not(.disabled)', function () {
			var $btn = $(this);
			$dot = $btn.parents('[data-did]:first');
			$.ajax({
				type: 'get',
				dataType: 'json',
				url: '/my/request-price/' + $dot.attr('data-did') + '/' + LOCALE,
				beforeSend: function () {
					$btn.addClass('loading');
				},
				success: function (data) {
					$btn.addClass('disabled');
					notice.add(data.message, data.status === 0);
				},
				error: function (data) {
					notice.add(data.message, 0);
				},
				complete: function (data) {
					$btn.removeClass('loading');
				}
			});
		})
	;
});