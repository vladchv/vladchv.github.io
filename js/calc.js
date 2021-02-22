/* global notice */

$(function () {
	var model = {
		form: $('#calc-budget'),
		did: $('#division'),
		l: $('#length'),
		b: $('#beam'),
		d: $('#days'),
		a: $('#date'),
		err: $('.js-form-errors'),
		wetBox: $('.js-wet-box'),
		wetErr: $('.js-wet-err'),
		wetSoon: $('.js-wet-soon'),
		price: $('.js-result-price'),
		percentBox: $('.js-result-percent-box'),
		percent: $('.js-result-percent'),
		rate: $('.js-rate'),
		water: $('.js-subprice-w'),
		electro: $('.js-subprice-e'),
		discList: $('.js-d-list'),

		craneBox: $('.js-crane-box'),
		craneErr: $('.js-crane-err'),
		craneSoon: $('.js-crane-soon'),
		crane: $('.js-result-crane'),
	};
	function applyCalcData(pricing) {
		model.discList.empty();
		$('[class*="js-did-'+model.did.val()+'-duration-"]').removeClass('active');
		if (pricing.transit) {
			var tp = pricing.transit;

			model.price.html(tp.transit);
			model.rate.html(tp.rate);
			model.water.html(tp.water['row']);
			model.electro.html(tp.electro['row']);

			var dList = pricing.transit.discounts;
			if (dList) {
				if (dList.current && dList.current.inc) {
					model.discList.append($('<div/>').html('&#8226; ' + dList.current.row));
					var discDuration = dList.current.row.match(/\((\d+)/);
					if (discDuration && typeof discDuration[1] !== 'undefined') {
						$('.js-did-'+model.did.val()+'-duration-'+discDuration[1]).addClass('active');
					}
				}
				if (dList.max && dList.max.inc) {
					model.discList.append($('<div/>').text('&#8226; ' + dList.max.row));
					var discDuration = dList.current.row.match(/\((\d+)/);
					if (discDuration && typeof discDuration[1] !== 'undefined') {
						$('.js-did-'+model.did.val()+'-duration-'+discDuration[1]).addClass('active');
					}
				}
				if (dList.price) {
					var percent = parseInt(dList.price)
					if (!isNaN(percent) && percent) {
						model.percentBox.show();
						model.percent.text(percent);
					} else {
						model.percentBox.hide();
					}
				}
			}
			model.wetBox.show();
			model.wetErr.hide();
			model.wetSoon.hide();
		} else if (model.did.attr('data-request') === '1') {
			model.wetBox.hide();
			model.wetErr.hide();
			model.wetSoon.show();
		} else {
			model.wetBox.hide();
			model.wetErr.show();
			model.wetSoon.hide();
		}
		if (pricing.crane) {
			model.crane.text(pricing.crane);
			model.craneBox.show(slideSpeed);
			model.craneErr.hide(slideSpeed);
			model.craneSoon.hide(slideSpeed);
		} else if (model.did.attr('data-request') === '1') {
			model.craneBox.hide(slideSpeed);
			model.craneErr.hide(slideSpeed);
			model.craneSoon.show(slideSpeed);
		} else {
			model.craneBox.hide(slideSpeed);
			model.craneErr.show(slideSpeed);
			model.craneSoon.hide(slideSpeed);
		}

		var fr = model.a.datepicker('getDate');
		var to = new Date(fr.getTime());
		to.setDate(fr.getDate() + Math.abs(model.d.val()));
		var frM = fr.getMonth() + 1;
		var toM = to.getMonth() + 1;
		$('[data-month]').removeClass('red-bg');
		if (frM === toM) {
			if (model.d.val() <= 31) {
				$('[data-month="'+frM+'"]').addClass('red-bg');
			} else {
				$('[data-month]').addClass('red-bg');
			}
		} else if (frM < toM) {
			for (var i=frM; i<=toM; i++) {
				$('[data-month="'+i+'"]').addClass('red-bg');
			}
		} else if (frM > toM) {
			for (var i=0; i<=toM; i++) {
				$('[data-month="'+i+'"]').addClass('red-bg');
			}
			for (var i=frM; i<=12; i++) {
				$('[data-month="'+i+'"]').addClass('red-bg');
			}
		}
	};

	function calc($form) {
		if (!model.did.val()) {
			var did = $('[data-did]:first').attr('data-did');
			model.did.val(did);
			model.form.attr('data-did', did);
		}
		$.ajax({
			type:		'get',
			dataType:	'json',
			url:		$form.prop('action'),
			data:		$form.serialize(),
			contentType: false,
			processData: false,
			beforeSend: function () {
				$form.find(':input[type="submit"]').addClass('loading');
				model.err.hide();
			},
			success: function (data) {
				if (typeof data.status === 'undefined') {
					notice.add('Somethig went wrong. Please, try again later', 0);
					return;
				}
				if (data.status === 0) {
					applyCalcData(data.pricing);
				} else {
					model.err.show(slideSpeed).html(data.message);
				}
			},
			error:		function (){
				notice.add('Somethig went wrong. Please, try again later', 0);
			},
			complete:	function (){
				$form.find(':input[type="submit"]').removeClass('loading');
			}
		});
	};
	$('body')
		.on('change', '#date,#days', function () {
			model.form.find('[type="submit"]').click();
		})
		.on('submit', '#calc-budget', function () {
			calc($(this));
			return false;
		})
	;
});
