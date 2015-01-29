// scrollspy
var offset = 50;

$('.navbar li a.scroll').click(function(event) {
	var href = $(this).attr('href');
	
	if (href.length === 0 || '#' !== href.charAt(0)) {
		return;
	}
	
	event.preventDefault();
	$(href)[0].scrollIntoView();
	scrollBy(0, -offset);
});
