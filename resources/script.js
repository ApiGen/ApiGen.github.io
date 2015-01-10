$(function() {
	var $window = $(window);
	var navigationHeight = $('nav').height();
	var $links = $('nav a');
	var sections = {};
	$links.each(function() {
		var $this = $(this);
		var id = $this.attr('href');
		var $section = $(id);
		var offset = $section.offset();
		sections[id] = {
			link: $this,
			top: offset.top,
			bottom: offset.top + $section.height()
		};
	});
	// First is actual
	var actual = $links.eq(0).attr('href');
	// First is on top
	sections[actual].top = 0;
	// If scrolling is in progress
	var inProgress = false;

	function activateSection(id)
	{
		if (actual === id) {
			return;
		}

		sections[actual].link.parent('li').removeClass('active');
		sections[id].link.parent('li').addClass('active');
		actual = id;
		window.location.replace(window.location.href.split('#')[0] + '#' + id);
	}

	function scrollToSection(id)
	{
		if (inProgress) {
			return;
		}

		inProgress = true;
		$('html,body').animate({
			scrollTop: sections[id].top - navigationHeight
		}, {
			'duration': 'slow',
			'step': detectSection,
			'complete': function() {
				activateSection(id);
				inProgress = false;
			}
		});
	}

	function detectSection()
	{
		var position = $window.scrollTop() + navigationHeight;
		for (var id in sections) {
			if (sections[id].top < position && sections[id].bottom > position) {
				activateSection(id);
				break;
			}
		}
	}

	function checkPosition()
	{
		if (!inProgress) {
			detectSection();
		}
	}

	function checkHash()
	{
		var hash = window.location.hash.substr(1);
		if (-1 === hash.indexOf('#')) {
			hash = '#' + hash;
		}
		if (actual === hash) {
			return;
		}
		scrollToSection(hash);
	}

	$('a[href^="#"]')
		.click(function(e) {
			e.preventDefault();
			var id = $(this).attr('href');
			scrollToSection(id);
		});
	$window.scroll(checkPosition);
	window.setInterval(checkPosition, 300);
	window.onhashchange = function(e) {
		e.preventDefault();
		checkHash();
	};
	if (window.location.hash) {
		checkHash();
	}
});


$('body').scrollspy({ target: '.navbar-inverse' });
