/* global notice */

if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}
$(function () {
	window.slideSpeed = 200;
	$('body')
		.on('click', '[href$="sign-in"]', function () {
			document.cookie = 'next='+location.pathname+location.search+location.hash+';path=/';
		})
		.on('change', 'input[type="checkbox"][data-disabled], input[type="radio"][data-disabled]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-disabled')).length, 'there is no input with "'+$t.attr('data-disabled')+'"');
			$($t.attr('data-disabled')).prop('disabled', !$t.is(':checked'));
		})
		.on('change', 'select[data-disabled]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-disabled')).length, 'there is no input with "'+$t.attr('data-disabled')+'"');
			$($t.attr('data-disabled')).prop('disabled', !$t.val());
		})
		.on('click', '[data-reset]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-reset')).length, 'there is no elements with "'+$t.attr('data-reset')+'"');
			$($t.attr('data-reset')).trigger('reset');
		})
		.on('click', '[data-click]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-click')).length, 'there is no elements with "'+$t.attr('data-click')+'"');
			$($t.attr('data-click')).trigger('click');
		})
		.on('click', '[data-on]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-on')).length, 'there is no elements with "'+$t.attr('data-on')+'"');
			$($t.attr('data-on')).prop('checked', true).trigger('change');
		})
		.on('click', '[data-off]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-off')).length, 'there is no elements with "'+$t.attr('data-off')+'"');
			$($t.attr('data-off')).prop('checked', false).trigger('change');
		})
		.on('click', '[data-rm]', function () {
			var $t = $(this);
			var send = $($t.attr('data-send'));
			$($t.attr('data-rm')).slideUp(slideSpeed, function () {
				$(this).remove();
				if (send) send.submit();
			});
		})
		.on('click', '[data-rm-rf]', function () {
			var $t = $(this);
			var send = $($t.attr('data-send'));
			$($t.attr('data-rm-rf')).remove();
			if (send) send.submit();
		})
		.on('click', '[data-hide]', function () {
			var $t = $(this);
//			debug(DEV && !$($t.attr('data-hide')).length, 'there is no elements with "'+$t.attr('data-hide')+'"');
			$($t.attr('data-hide')).slideUp(slideSpeed);
		})
		.on('click', '[data-hide-now]', function () {
			var $t = $(this);
			$($t.attr('data-hide-now')).hide(true);
		})
		.on('click', '[data-show-now]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-show-now')).length, 'there is no elements with "'+$t.attr('data-show-now')+'"');
			debug(DEV && $t.is('[data-end]') && typeof window[$t.attr('data-end')] !== 'function', 'there is no function "'+$t.attr('data-end')+'"');
			if ($t.is('[data-end]') && typeof window[$t.attr('data-end')] === 'function') {
				$($t.attr('data-show-now')).show(0, window[$t.attr('data-end')]);
			} else
				$($t.attr('data-show-now')).show(true);
		})
		.on('click', '[data-show]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-show')).length, 'there is no elements with "'+$t.attr('data-show')+'"');
			debug(DEV && $t.is('[data-end]') && typeof window[$t.attr('data-end')] !== 'function', 'there is no function "'+$t.attr('data-end')+'"');
			if ($t.is('[data-end]') && typeof window[$t.attr('data-end')] === 'function') {
				$($t.attr('data-show')).slideDown(slideSpeed, window[$t.attr('data-end')]);
			} else
				$($t.attr('data-show')).slideDown(slideSpeed);
		})
		.on('click', '[data-slide]', function (e) {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-slide')).length, 'there is no elements with "'+$t.attr('data-slide')+'"');
			debug(DEV && $t.is('[data-end]') && typeof window[$t.attr('data-end')] !== 'function', 'there is no function "'+$t.attr('data-end')+'"');
			if ($t.is('[data-end]') && typeof window[$t.attr('data-end')] === 'function') {
				$($t.attr('data-slide')).slideToggle(slideSpeed, window[$t.attr('data-end')]);
			} else {
				$($t.attr('data-slide')).slideToggle(slideSpeed);
			}
			e.stopPropagation();
		})
		.on('click', '[data-stop]', function (e) {
			e.stopPropagation();
		})
		.on('click', '[data-example]', function () {
			var $t = $(this);
			debug(DEV && !$($t.attr('data-example')).length, 'there is no input with "'+$t.attr('data-example')+'"');
			var $target = $($t.attr('data-example'));
			if ($target.data('select2')) {
				$target.data('select2').selection.$search.val($t.text()).trigger('keyup');
			} else {
				$target.val($t.text());
			}
		})
		.on('click', '.js-load-more a[data-url], .js-load-more *[data-form], .js-load-one', function () {
			return loadMore($(this));
		})
		.on('submit', '.ajax-submit form', function (){
			return formInteractive($(this));
		}).on('click', '.js-change-lang', function () {
			lang(LOCALE, $(this).attr('data-lang'), USER);
		}).on('keyup', '.js-change-pass input[type="password"]', function () {
			var cp = $('.js-change-pass [name$="[current_password]"]');
			var np = $('.js-change-pass [name$="[plainPassword][first]"]');
			var an = $('.js-change-pass [name$="[plainPassword][second]"]');
			var btn = $('.js-change-pass button[type="submit"]');
			if (cp.length)
				btn.prop('disabled', !(cp.val().length > 2 && np.val().length > 2 && np.val() === an.val() && np.val() !== cp.val()));
			else
				btn.prop('disabled', !(np.val().length > 2 && np.val() === an.val() ));
		})
		.on('click', '[data-load]', function () {
			var $t = $(this);
			$.getJSON($t.attr('data-load'), function (data) {
				if (typeof data.status !== 'undefined' && data.status === 0) {
					if (data.html) {
						$($t.is('[data-target]') ? $t.attr('data-target') : '#ajax-submit').empty().append(data.html);
					} else {
						notice.add(data.message);
					}
					if ($t.is('[data-info]')) {
						var map = $t.attr('data-info').split(';').forEach(function (i) {
							i = i.split(':');
							var $targetNode = $('#ajax-submit form '+i[0]);
							if ($targetNode.is(':input')) {
								$targetNode.val(i[1]);
							} else {
								$targetNode.text(i[1]);
							}
						});
					}
				} else {
					notice.add(data.message, 0);
				}
			}).fail(function() {
				notice.add($t.attr('data-msg'), 0);
			});
		})
		.on('click', '[data-fav]', function () {
			var $t = $(this);
			var url = $t.attr('data-fav');
			$t.attr('data-fav', '');
			$.getJSON(url, function (data) {
				if (data.status === 0) {
					$t.attr('data-fav', data.url);
					if (data.message === 'added') {
						$t.addClass('fadded');
					} else if (data.message === 'removed') {
						$t.removeClass('fadded');
					}
				}
			});
		})
		.on('click', '[data-copy]', function () {
			var $t = $(this);
			var $tmp = $("<input>");
			$("body").append($tmp);
			$tmp.val($t.attr('data-copy')).select();
			document.execCommand("copy");
			$tmp.remove();
			if ($t.attr('data-msg')) {
				notice.add($t.attr('data-msg'));
			}
		})
		.on('click', '[data-paste]', function (e) {
			var $t = $(this);
			var $input = $($t.attr('data-paste'));
			navigator.permissions.query({name: "clipboard-read"}).then(result => {
			  if (result.state == "granted" || result.state == "prompt") {
					navigator.clipboard.readText().then(
						text => $input.val(text) && $input.trigger('change')
					)
			  }
			});
		})
		// @deprecated since birth
		.on('paste', '.js-as-html', function (e) {
			window.document.execCommand(
				'insertText', false,
				(e.originalEvent || e).clipboardData.getData('text/html')
						.replace(/(\<meta[^>]*>| (style|id|class)\="[^"]*")/g, '')
			);
		})
	;

	$('input[type="checkbox"][data-disabled], input[type="radio"][data-disabled]').trigger('change');

	if ($.fn.datepicker) {
		$('.datepicker').datepicker({ dateFormat: "d M ''y", todayBtn: "linked"});
	}
});

Object.defineProperty(String.prototype, 'hashCode', {
	value: function() {
		var hash = 0, i, chr;
		for (i = 0; i < this.length; i++) {
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}

		return hash;
	}
});

function getCookie(name) {
	var parts = ('; ' + document.cookie).split('; '+name+'=');
	if (parts.length === 2) {
		return parts.pop().split(';').shift();
	}
}
function setCookie(name, value) {
  document.cookie = name +'='+ value +'; path=/;';
}
function deleteCookie(name) {
  document.cookie = name +'=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
window.reScroll = function(){
	$(window).trigger('scroll');
};
window.showPass = function(){
	$(this).prev().attr('type', 'text');
};
window.hidePass = function(){
	$(this).prev().attr('type', 'password');
};

function loadMore($btn) {
	var $form = $btn.is('[data-form]') ? $($btn.attr('data-form')) : null;
	debug(DEV && ($form !== null && !$form.length), 'there is no form with "'+$btn.attr('data-form')+'"');
	debug(DEV && $btn.attr('data-list') && !$($btn.attr('data-list')).length, 'there is no list of elements with "'+$btn.attr('data-list')+'"');

	var data = $form ? $form.serializeArray() : [];
	data.push({name: 'json', value: 1});
	if ($btn.attr('data-list')) {
		data.push({
			name: 'exclude',
			value: $.map($($btn.attr('data-list')), function (item, i) {
				return $(item).attr('data-did');
			})
		});
	}
	if ($form.find('#query').length === 0) { // shit code. to be removed
		data.push({name: 'query', value: $('#map [name="query[]"]').val()});
	}
	if ($btn.attr('data-did')) {
		data.push({name: 'marinaId', value: $btn.attr('data-did')});
	}
	$.ajax({
		type:		'get',
		dataType:	'json',
		url:		$form ? $form.prop('action') : $btn.attr('data-url'),
		data:		data,
		beforeSend:	function () {
			$btn.addClass('loading');
		},
		success: function (data) {
			if (typeof data.status !== 'undefined' && data.status === 0) {
				if (!data.more) {
					$btn.parents('.js-load-more:first').remove();
				}
				debug(DEV && $btn.is('[data-end]') && typeof window[$btn.attr('data-end')] !== 'function', 'you must define function '+$btn.attr('data-end')+'()');
				if (typeof window[$btn.attr('data-end')] === 'function') {
					window[$btn.attr('data-end')]($btn, data.html);
				}
			} else {
				notice.add(data.message, 0);
			}
		},
		error:		function (data){
			notice.add(data.message, 0);
		},
		complete:	function (data){
			$btn.removeClass('loading');
			$form.find('[name="json"]').val(0);
		}
	});

	return false;
}

function formInteractive($form, options) {
	$.ajax($.extend({
		type:		'post',
		dataType:	'json',
		url:		$form.prop('action'),
		data:		new FormData($form[0]),
		contentType: false,
		processData: false,
		beforeSend: function () {
			$form.parents('.ajax-submit:first').find('[data-ajax="form-errors"]').empty();
			$form.find(':input').prop('disabled', true);
			// $form.find(':input[type="submit"]').addClass('loading'); @todo
		},
		success: function (data) {
			if (typeof data.status === 'undefined') {
				notice.add('Somethig went wrong. Please, try again later', 0);
				return;
			}
			if (data.status === 0) {
				$form.parents('.ajax-submit:first').empty().append(data.html);
				notice.add(data.message);
			} else if (data.status === 5 && typeof data.url !== 'undefined') {
				window.location = data.url;
			} else {
				var errBox = $form.parents('.ajax-submit:first').find('[data-ajax="form-errors"]');
				if (errBox.length) {
					errBox.append(data.message+'<br>&nbsp;');
				} else {
					notice.add(data.message);
				}
			}
		},
		error:		function (){
			notice.add('Somethig went wrong. Please, try again later', 0);
		},
		complete:	function (){
			$form.find(':input').prop('disabled', false);
			// $form.find(':input[type="submit"]').removeClass('loading'); @todo
		}
	}, options));

	return false;
}

function lang(frLang, toLang, user) {
	fr = new RegExp('/'+frLang+'/');
	to = '/'+toLang+'/';
	if (user) {
		$.ajax({
			url: '/my/lang',
			type: 'post',
			dataType: 'json',
			data: {language: toLang},
			success: function (data) {
				var href = location.href;
				location.href = href.replace(fr, to);
			},
			error: function (data) { notice.add(data.message, 0); }
		});
	} else {
		var href = location.href;
		location.href = href.replace(fr, to);
	}

}

function debug(exp, msg) {
	if (exp) return confirm(msg);
}
