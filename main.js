$(function(){
	setcarousel();
});
function setcarousel(){
	var mycarousel=$(".mycarousel"),mycarouselImg=$(".mycarousel-img"),carouselWidth=mycarousel.width();
	mycarouselImg.width(carouselWidth*7);
	mycarouselImg.css({"left":-carouselWidth});
	$(".mycarousel-img img").width(carouselWidth).height(carouselWidth/16*8);
	var ind=1,originIndex=ind;
	$("li[index="+ind+"]").addClass("indicatorColor");
	function animate(offset,direction){
		originIndex=ind;
        ind=ind+direction;
		var newLeft=parseInt($(".mycarousel-img:first").css("left"))+offset;
		if(newLeft>-carouselWidth){
			newLeft=-carouselWidth*5;
			ind=5;
		}
		if(newLeft<-carouselWidth*5){
			newLeft=-carouselWidth;
			ind=1;
		}
		mycarouselImg.css({"left":newLeft});
		$("li[index="+originIndex+"]").removeClass("indicatorColor");
		$("li[index="+ind+"]").addClass("indicatorColor");
	}
	$(".right-control:first").click(function(){
		animate(-carouselWidth,1);
	});
	$(".left-control:first").click(function(){
		animate(carouselWidth,-1);
	});
}