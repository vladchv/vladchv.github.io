/* global CKEDITOR, LOCALE, google, officeMarker */

$(function () {
	/*$(".duration-slider").slider({
		range: true,
		min: 0,
		max: 360,
		values: getSliderValues(),
		slide: function( event, ui ) {
			ui.values[0];
			ui.values[1];
			$('[name="days"]').val();
		}
	});
	function getSliderValues() {
		var arrivalDate = $('[name="arrival"]').datepicker('getDate');
		var arrival = dofy(arrivalDate ? arrivalDate : new Date());
		var departure = arrival + parseInt($('[name="days"]').val());
		console.log([arrival, departure]);
		return [arrival, departure];
	}*/
//	CKEDITOR.replaceAll('ckeditor');
	CKEDITOR.replaceAll('cmcke');

	window.syncTab = function () {
		setTimeout(function () {
			var $division = $('[id^="did-"] > .box-body:visible');
			if (!$division.length) {
				$division = $('[id^="did-"]:first > .box-body');
			}
			var did = $division.attr('data-did');
			if (did === $('#division').val()) {
				return;
			}
			var request = $division.attr('data-request') === '1';
			var disable = $division.attr('data-request') === '2';
			if (did) {
				location.hash = location.hash.replace(/#\d+/, '#'+did);
				$('#division').val(did).attr('data-request', request ? '1' : '0');
				$('#calc-budget').attr('data-did', did);
			}
			$('#ask-price').toggle(request).prop('disabled', disable);
			$('#calc-submit').toggle(!request).prop('disabled', disable);
			if (!$('#length').length || $('#length').val() && $('#beam').val())
				$('#calc-submit').click();
		}, 100);
	};
	var hash = location.hash.slice(1);
	if (hash) {
		preset = hash.split('-');
		if (/\d+/.test(preset[0])) {
			$('#did-'+preset[0]+' > .box-body').show();
			$('[id^="did-"]:not(#did-'+preset[0]+') > .box-body').hide();
		}
		if (/\d+/.test(preset[1]) && preset[1] > 1) {
			$('[name="days"]').val(preset[1]);
		}
		if (/\d+/.test(preset[2])) {
			var arrivalDate = $.datepicker.parseDate('ddmmy', preset[2]);
			var arrivalStr = arrivalDate.toLocaleDateString(LOCALE, {day:'numeric'})
				+ " " + arrivalDate.toLocaleDateString(LOCALE, {month:'short'})
				+ " '" + arrivalDate.toLocaleDateString(LOCALE, {year:'2-digit'});

			$('[name="arrival"]').val(arrivalStr);
		}
		var metrical = $('#units').is(':checked');
		if (/\d+/.test(preset[3])) {
			$('[name="length"]').val(metrical ? preset[3] : parseFloat(preset[3]) * 3.28084);
		}
		if (/\d+/.test(preset[4])) {
			$('[name="beam"]').val(metrical ? preset[4] : parseFloat(preset[4]) * 3.28084);
		}
		if (typeof preset[5] !== 'undefined' && preset[5] === '1') {
			$('[name="cat"]').prop('checked', true).trigger('change');
		}
	}
	syncTab();
});

function startMap() {
	var markers = {};
	var clickPoi = function () {
		var $t = $(this);
		$('#nearby-pois [data-id].js-poi-btn').removeClass('current');
		$t.addClass('current');
		for (var m in markers) {
			markers[m].setAnimation(null);
		}
		var marker = markers[$t.attr('data-id')];
		if (marker) {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}

		var bounds = new google.maps.LatLngBounds(null);
		if (!marker || officeMarker.relId === marker.relId) {
			for (var i in markers) {
				if (/^division-\d+$/.test(i)) {
					bounds.extend(markers[i].getPosition());
				}
			}
		} else {
			bounds.extend(marker.getPosition());
		}
		bounds.extend(officeMarker.getPosition());
		map.fitBounds(bounds, {bottom:10, left:30, right:30, top:77});
	};
	var clickMarker = function(e) {
		$('#nearby-pois [data-id]').removeClass('current');
		$('#nearby-pois [data-id="'+this.relId+'"]').addClass('current');
		for(var i in markers) {
			markers[i].setAnimation(null);
		}
		this.setAnimation(google.maps.Animation.BOUNCE);
	};
	var mapDiv = document.getElementById('office-map');
	var mapPos = mapDiv.getAttribute("data-options").split(',');
	window.map  = new google.maps.Map(mapDiv, {
		zoom: parseInt(mapPos[2]),
		center: {lat: parseFloat(mapPos[0]), lng: parseFloat(mapPos[1])}
	});
	$('[data-marker]').map(function (i, item) {
		$t = $(item);
		markers[$t.attr('data-id')] = new google.maps.Marker({
			position: {lat: parseFloat($t.attr('data-lat')), lng: parseFloat($t.attr('data-lng'))},
			map: map,
			icon: {
				url: '/bundles/app/img/poi/ico-'+$t.attr('data-marker')+'.png',
				//url: markersModel.getMarker($t.attr('data-id').replace(/-\d+$/, ''), $t.attr('data-marker')),
				scaledSize: new google.maps.Size(45, 66),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(23, 66)
			}
		});
		if (/^office-\d+$/.test($t.attr('data-id'))) {
			officeMarker = markers[$t.attr('data-id')];
		}
	});
	$('body').on('click', '#nearby-pois [data-id].js-poi-btn', clickPoi);
	for (var i in markers) {
		var marker = markers[i];
		marker.relId = i;
		marker.addListener('click', clickMarker);
	}
	$('#nearby-pois .js-poi-btn:first').addClass('current');
}