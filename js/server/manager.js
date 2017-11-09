var userName;
var passWord;
var startY,startX,endX,endY;
var mySwiper = new Swiper('.swiper-container',{
    onTouchStart: function(swiper,event){
        alert("开始滑动了");
    	console.log("开始滑动了");
        var touch = event.touches[0];
        startY = touch.pageY;
        startX = touch.pageX;
    },
    onTouchMove: function(swiper,event){
        var touch = event.touches[0];
        endX = touch.pageX-startX;
        endY = touch.pageY-startY;
    },
    onTouchEnd: function(swiper){
        if(Math.abs(endX)>5){
            endX=0;
            return false;
        }else{
           console.log("滑动了");
         
            endX=0;
        }
    }

});


function init() {
	if($.cookie("userName") == null || $.cookie("passWord") == null) {
		location.href = "Login.html";
		return;
	}
	userName = $.cookie("userName");
	passWord = $.cookie("passWord");
	init_windowSize();
	window.onresize = function() {
		init_windowSize();
	}
}

function init_windowSize() {
	var headHeight = $("#div_head").height();
	var footHeight = $("#div_foot").height();
	var height = $(window).height();
	//	console.log(height);
	//	console.log(height-headHeight-footHeight);
	$("#div_body").css("height", height - headHeight - footHeight);
}

function Terminal_event() {
	$("#iframe")[0].src = "Terminal.html";
}

function Organization_event() {
	$("#iframe")[0].src = "Organization.html";
}

function Operator_event() {
	$("#iframe")[0].src = "Operator.html";
}

function Log_event() {
	$("#iframe")[0].src = "Log.html";
}

//function swipeEvent() {
//	Rhui.mobile.swipeLeft(document.getElementById("iframe"), function(event) {
//		console.log("进来了");
//		if($("#iframe")[0].src == "Terminal.html") {
//			$("#iframe")[0].src = "Organization.html";
//		}else if($("#iframe")[0].src == "Organization.html"){
//			$("#iframe")[0].src = "Operator.html";
//		}else if($("#iframe")[0].src == "Operator.html"){
//			$("#iframe")[0].src = "Log.html";
//		}else if($("#iframe")[0].src == "Log.html"){
//			return;
//		}
//	}, {
//		// 可选参数
//		isStopPropagation: true,
//		isPreventDefault: true,
//		triggerOnMove: true
//	});
//		Rhui.mobile.swipeRight(document.getElementById("iframe"), function(event) {
//		console.log("进来了");
//		if($("#iframe")[0].src == "Terminal.html") {
//			return;
//		}else if($("#iframe")[0].src == "Organization.html"){
//			$("#iframe")[0].src = "Terminal.html";
//		}else if($("#iframe")[0].src == "Operator.html"){
//			$("#iframe")[0].src = "Organization.html";
//		}else if($("#iframe")[0].src == "Log.html"){
//			$("#iframe")[0].src = "Operator.html";
//		}
//	}, {
//		// 可选参数
//		isStopPropagation: true,
//		isPreventDefault: true,
//		triggerOnMove: true
//	});
//	
//	  $("#div_body").rhuiSwipe('swipeLeft', function(event){
//     	console.log("进来了");
//  }, {
//      // 可选参数
//      isStopPropagation: true,
//      isPreventDefault: true,
//      triggerOnMove: true
//  });
//}
