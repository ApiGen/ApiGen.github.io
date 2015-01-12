// scrollspy
var offset = 50;

$('.navbar li a.scroll').click(function(event) {
	event.preventDefault();
	$($(this).attr('href'))[0].scrollIntoView();
	scrollBy(0, -offset);
});
