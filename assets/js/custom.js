$(function() {
	$("table").each(function(){$(this).addClass("table table-striped table-bordered");});
	$('.list-group a').click(function(){
	    $(this).addClass('active').siblings().removeClass('active');
	})
});