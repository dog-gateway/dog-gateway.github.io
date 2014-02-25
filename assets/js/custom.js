$(function() {
	$("table").each(function() {
		$(this).addClass("table table-striped table-bordered");
	});
	$('.list-group a').click(function(e) {
		$(this).addClass('active').siblings().removeClass('active');
		scrollToAnchor($(this), e);
		
	});
	$('.list-group a').each(function() {
		if (document.URL.contains($(this).attr('href')))
		{
			$(this).addClass('active').siblings().removeClass('active');
			scrollToAnchor($(this), null);
		}
	});
});

function scrollToAnchor(anchor , e)
{
	var href = anchor.attr("href");
	var idPos = href.indexOf("#");
	if (idPos >= 0) {

		var id = href.substring(idPos, href.length);
		var offset = $(id).offset();

		if (offset != null) {
			if(e != null)
				e.preventDefault();

			$("html, body").animate({
				scrollTop : offset.top - 70
			}, 100);
		}
	}	
}