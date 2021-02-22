$(function () {
	window.ymd = function (date){
		return	[
			date.getFullYear(),
			((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1),
			((date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()),
		];
	};
	window.dmy = function (date) {
		return	[
			((date.getDate()) < 10 ? '0'+date.getDate() : date.getDate()),
			((date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1),
			date.getFullYear()
		];
	};

	window.plural = function(n,z,o,t,f){return !n&&z||n%10==1&&n%100!=11&&o||n%10>=2&&n%10<=4&&(n%100<10||n%100>=20)&&t||f;}
	window.ln = function(){return location.pathname.replace(/^\/([a-z]{2,3})\/.*/, '$1');}

});
window.dofy = function (date) {
	var start = new Date(date.getFullYear(), 0, 0);

	console.log((date - start) / (1000 * 60 * 60 * 24));

	return Math.floor(
		((date - start) + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000) / (1000 * 60 * 60 * 24)
	);
};