/* global notice */

$(function () {
	$('body')
		.on('click', '.js-file-opener', function () {
			var $item = $(this).parents('.js-result-item,.js-nearby-item,#office-page');
			if ($item.is('#office-page')) {
				var $box = $('#add-file-form');
				$('#update-marina-form').show().find('.popup-box').slideDown(slideSpeed);
				$('.js-popup-cover').show();
			} else {
				var $box = $('#add-file-box .form-box').clone();
				if (!$item.attr('data-id')) {
					alert('Something went wrong! Please try again later');
					return false;
				}
				$item.find('.form-box').remove();
				$item.append($box).find('.result-item-bowels').slideUp(slideSpeed);
				$box.slideDown(slideSpeed);
			}
			$box.find('.js-marina-data').empty().append($item.find('.js-attached-files').clone());
			$box.find('.js-marina-data > *').show();
			$box.find('[name="marina"]').val($item.attr('data-id'));
			$('.js-close-add-marina, .js-close-add-poi').click();

			return false;
		})
		.on('submit', '#add-file-form', function () {
			var $form = $(this);
			formInteractive($form, {
				success: function (data) {
					if (typeof data.status !== 'undefined' && data.status === 0) {
						$('#form-update-marina-box .close, #add-file-box .btn-cancel').click();
						$form.trigger('reset');
						$form.find(':input').prop('disabled', false);
						$form.find('#chosen').empty();
						notice.add(data.message);
					} else {
						$form.find('[data-ajax="form-errors"]').empty().append(data.message);
					}
				}
			});
			return false;
		})
		.on('change', '[name="prices[]"]', function () {
			var $t = $(this);
			var has = $t.attr('data-count');
			var chosen = this.files.length;
			if (has-(-chosen) > 10) {
				$t.parents('form:first').find('[data-ajax="form-errors"]').empty().append(
					'You cat upload 10 files maximum'+(has > 0 ? ' (already uploaded '+has+')' : '')
				);
				$t.val('');
			} else {
				$t.parents('form:first').find('[data-ajax="form-errors"]').empty();
			}
			var $tags = $('#tags');
			var $tpl = $tags.find('.js-tpl');
			var $box = $('#add-file-form #chosen');
			$box.empty();
			for(var i=0; i<this.files.length; i++) {
				var name = this.files[i].name.replace(/^(.{9}).*(\.[^.]+)$/, '$1.. $2');
				$tag = $tpl.clone().removeClass('js-tpl').removeAttr('data-selector');
				$tag.find('i').remove();
				$tag.children(':first').text(name);
				$box.append($tag);
				$tag.show();
			}
		})
	;
});
