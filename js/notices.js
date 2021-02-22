$(function () {
	var noticesSpeed = 200;
	notice = {
		tpl:	$('#notices .js-notices-tpl'),
		flow:	$('#notices .js-notices-flow'),
		add:	function(msg, ok = true) {
			var notice = this.tpl.clone();
			notice
				.addClass(ok ? 'notice-ok' : 'notice-err')
				.find('.js-msg').html(msg);

			this.flow.empty().prepend(notice);
			notice.show();
			setTimeout(function () {
				notice.slideUp(noticesSpeed, function () { notice.remove(); });
			}, 6000);
		}
	};

	$('body')
		.on('click', '.js-notice-close', function () {
			$(this).parents('.js-notices-tpl:first').slideUp(noticesSpeed);
		})
	;
});

