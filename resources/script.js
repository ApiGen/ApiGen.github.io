// scrollspy
var offset = 130;

$('.navbar li a').click(function(event) {
	event.preventDefault();
	$($(this).attr('href'))[0].scrollIntoView();
	scrollBy(0, -offset);
});
