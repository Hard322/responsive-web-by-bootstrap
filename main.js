$(function(){
	setcarousel();
});
function setcarousel(){
	var mycarousel=$(".mycarousel"),mycarouselImg=$(".mycarousel-img"),carouselWidth=mycarousel.width();
	mycarouselImg.width(carouselWidth*7);
	mycarouselImg.css({"left":-carouselWidth});
	$(".mycarousel-img img").width(carouselWidth).height(carouselWidth/16*8);
	var ind=1,originIndex=ind,anistate=false,timer;
	$("li[index="+ind+"]").addClass("indicatorColor");
	function animate(offset,direction){ //动画函数
		var speed=offset/10;
		originIndex=ind;
        ind=ind+direction;
		var nowleft=parseInt($(".mycarousel-img:first").css("left")),newLeft=nowleft+offset;
		go();
		function go(){
			if(speed*(nowleft-newLeft)<0){
				nowleft=nowleft+speed;
				mycarouselImg.css({"left":nowleft});
				anistate=true;
				setTimeout(go,30);
			} else {
				if(newLeft>-carouselWidth){
					newLeft=-carouselWidth*5;
					ind=5;
				}
				if(newLeft<-carouselWidth*5){
					newLeft=-carouselWidth;
					ind=1;
				}
				$("li[index="+originIndex+"]").removeClass("indicatorColor");
				$("li[index="+ind+"]").addClass("indicatorColor");
				mycarouselImg.css({"left":newLeft});
				anistate=false;
			}
		}
	}
	function automove(){
		clearInterval(timer);
		timer=setInterval(function(){
			if(!anistate){animate(-carouselWidth,1);}
		},5000);
	}
	function autostop(){
		clearInterval(timer);
	}
	automove();
	mycarousel.mouseover(autostop);
	mycarousel.mouseout(automove);
	$(".right-control:first").click(function(){  //按钮功能
		if(!anistate){animate(-carouselWidth,1);}
	});
	$(".left-control:first").click(function(){
		if(!anistate){animate(carouselWidth,-1);}
	});
	$(".mycarousel-indicators").bind("click",function(e){
		if(e.target.tagName=="LI"){
	    	var $li=$(e.target),liindex=$li.attr("index");
	    	if(liindex!==ind&&(!anistate)){
		    	$("li[index="+ind+"]").removeClass("indicatorColor");
		    	$("li[index="+liindex+"]").addClass("indicatorColor");
		    	if(liindex>ind){
		    		animate(-carouselWidth*(liindex-ind),liindex-ind);
		    	}else {
		    		animate(carouselWidth*(ind-liindex),liindex-ind);
		    	}
		    }
	    }
	});
}