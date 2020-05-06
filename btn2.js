(function (a) {

var coucou = 0;
var yoko = 0;
var jun;
var souka=0;
$(document).ready( function(){
// ページ読み込み時に実行したい処理
//	alert("ju");
	$("#chara-stand .face-btn").eq(0).addClass("checked"); 
	$("#chara-stand .face-btn").eq(9).addClass("checked"); 
	$("#chara-stand .face-btn").eq(20).addClass("checked"); 
	$("#chara-stand .face-btn").eq(25).addClass("checked"); 
	$("#chara-stand .face-btn").eq(27).addClass("checked"); 
	$("#chara-stand .face-btn").eq(29).addClass("checked"); 

//	$fb = $("#chara-stand .face-btn").eq(0);
//	fu = $fb.data("face-url");
//	$fb.parents("li").find("a img").eq(1).attr("src", fu).show(); 

//	$fb = $("#chara-stand .face-btn").eq(9);
//	fu = $fb.data("face-url");
//	$fb.parents("li").find("a img").eq(10).attr("src", fu).show(); 

//	$fb = $("#chara-stand .face-btn").eq(20);
//	fu = $fb.data("face-url");
//	$fb.parents("li").find("a img").eq(21).attr("src", fu).show(); 


	a("#chara-stand li").each(function () {
		liw = a(this).width();
		ow = a(this).data("ow");
		ol = a(this).data("ol");
		ot = a(this).data("ot");
		ofw = a(this).data("ofw");
		imw = a(this).find("img").eq(0).width();
		r = imw / ow;
		$fi = a(this).find("img").eq(jun);
		if(jun-1!=28){
		$fi.zIndex(coucou);
		}else{
		$fi.zIndex(9999);
		}
		$fi = a(this).find("img");
		$fi.css({
			top: ot * r + "px",
			left: ol * r + (liw - imw) / 2 + "px",
		})
		coucou++;
	})

});

0 < a("#chara-stand").length && (a(window).on("resize", function () {
	a("#chara-stand li").each(function () {
		liw = a(this).width();
		ow = a(this).data("ow");
		ol = a(this).data("ol");
		ot = a(this).data("ot");
		ofw = a(this).data("ofw");
		imw = a(this).find("img").eq(0).width();
		r = imw / ow;
		$fi = a(this).find("img").eq(jun);
	//	$fi.width(ofw * r);
		if(jun-1!=28){
		$fi.zIndex(coucou);
		}else{
		$fi.zIndex(9999);
		}
		$fi = a(this).find("img");
	//	alert(jun);
		$fi.css({
			top: ot * r + "px",
			left: ol * r + (liw - imw) / 2 + "px",
		})
		coucou++;
//		alert(a(this).find("img").eq(jun).attr('src'));
	})
}), a("#chara-stand .face-btn").on("click", function () {
	$fb = a(this);
	jun = a(this).index()+1;
//	alert(jun);
if($fb.hasClass("checked")){
	 //alert("abe1"),
//	$fb.parents("li").find("a img").eq(jun).attr("src", "").hide();
//	$("#chara-stand .li").eq(jun).attr("src", "");
//	$fb.removeClass("checked");
}else{

	//alert("abe2"),

//	$fb.parent().find(".shadow-btn").removeClass("checked"), 


	$fb.addClass("checked");
	fu = $fb.data("face-url");
	$fb.parents("li").find("a img").eq(jun).attr("src", fu).show(); 


	if(0<=jun-1&&jun-1<=8){
	if(jun-1!=io){
	for(var io=0; io<=8; io++){
		$fb.parent().find(".shadow-btn").eq(io).removeClass("checked");
		$fb.parents("li").find("a img").eq(io+1).attr("src", "").hide();
	}
	}
	}
	if(9<=jun-1&&jun-1<=19){
	for(var io=9; io<=19; io++){
	$fb.parent().find(".shadow-btn").eq(io).removeClass("checked");
	}
	}
	if(20<=jun-1&&jun-1<=24){
	for(var io=20; io<=24; io++){
	$fb.parent().find(".shadow-btn").eq(io).removeClass("checked");
	$fb.parents("li").find("a img").eq(io+1).attr("src", "").hide();
	}
	}

	if(25<=jun-1&&jun-1<=26){
	
	for(var io=25; io<=26; io++){
	$fb.parent().find(".shadow-btn").eq(io).removeClass("checked");
	}
	}
	if(27<=jun-1&&jun-1<=28){
	for(var io=27; io<=28; io++){
	$fb.parent().find(".shadow-btn").eq(io).removeClass("checked");
	$fb.parents("li").find("a img").eq(io+1).attr("src", "").hide();
	}
	}
	if(29<=jun-1&&jun-1<=31){
	for(var io=29; io<=31; io++){
	$fb.parent().find(".shadow-btn").eq(io).removeClass("checked");
	$fb.parents("li").find("a img").eq(io+1).attr("src", "").hide();
	}
	}
	$fb.addClass("checked");
	$fb.parents("li").find("a img").eq(jun).attr("src", fu).show(); 
	



	a(window).trigger("resize");
}

}));



})(jQuery);