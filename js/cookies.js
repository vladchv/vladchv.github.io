if (window.USER || document.cookie.replace(/(?:(?:^|.*;\s*)accepted\s*\=\s*([^;]*).*$)|^.*$/, "$1")==='1') {
	document.getElementById('use-cookies').style.display='none';
}
$('.js-cookies-aacept').on('click', function () {
	document.cookie='accepted=1;path=/';
	$('#use-cookies').hide(true);
});