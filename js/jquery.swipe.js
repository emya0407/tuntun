$(document).ready(function(){


	/* *************************
		이미지 슬라이드
	************************** */
	var myScroll;
	var slide = $('#imgSlide');

	/* 필요한 곳에서만 로딩 */
	if(slide.length > 0){
		var slideImg = slide.find('.swipe'),
			slideImgNumber = slideImg.length,
			slideImgWidth = slideImg.width(),
			imgSlidePop = $('.imgSlidePop'), // 팝업일 경우
			imgSlideCont = $('#jsImgSlide'), // 컨텐츠일 경우
			addPrevBtn = $("<p class='prevBtn' id='prev' >prev</p>"),
			addNextBtn = $("<p class='nextBtn'  id='next'>next</p>"),
			jsImgSlideName,
			currPageX= 0;

		// 슬라이드 부모 class 분기
		if(slide.parent().hasClass('imgSlidePop')) jsImgSlideName = imgSlidePop;
		else jsImgSlideName = imgSlideCont;

		//슬라이드를 감싸는 엘리먼트를 생성
		slideImg.wrapAll('<div id="imgSlideWrap" />');
		$('#imgSlideWrap').width(slideImgWidth*slideImgNumber);

		//슬라이드의 위치 지정
		slideImg.each(function(index){
			slideImg.eq(index).css({left:slideImgWidth*(index)+"px"});
		});

		//화살표 생성
		jsImgSlideName.prepend(addPrevBtn).append(addNextBtn);

		// 아이콘 만들기
		function buildNavigation (){
			$nav = $('<div class="bannerBtn" />').appendTo(jsImgSlideName);
			//슬라이드 갯수의 맞추어 아이콘생성
			if(buildNavigation && slideImgNumber > 1) {
				slideImg.each(function(i,el){
					var index = i+1,
					$spanTag = $("<span />");
					$($nav).append($spanTag);
				});
			}
			// 아이콘 div width값 구하기
			var $navEl = $nav.find('span'),
			$navElNunber = $navEl.length,
			$navElWidth = 23;
			$nav.width($navElWidth*$navElNunber);
			$navEl.eq(0).addClass('active');
		}
		buildNavigation();

		// 화살표 제어
		var $navEl = $('.bannerBtn span '),
		    $navElLast = $('.bannerBtn span:last '),
		    prevBtn = $('#prev'),
		    prevBtnImg = prevBtn.find('img'),
			nextBtn = $('#next'),
			nextBtnImg = nextBtn.find('img');

		if(slideImgNumber == 0) {prevBtn.hide(); nextBtn.hide()};
		if($navEl.eq(0).attr('class') == 'active') {prevBtn.hide()};

		prevBtn.click(function(){
			myScroll.scrollToPage('prev', 0);
			manageControls();
			return false;
		});
		nextBtn.click(function(){
			myScroll.scrollToPage('next', 0);
			manageControls();
			return false;
		});

		function manageControls() {
			if($navEl.eq(0).attr('class') == 'active') {prevBtn.hide(); } else{ prevBtn.show();}
			if($navElLast.attr('class') == 'active') {nextBtn.hide(); } else{ nextBtn.show(); }
		}


		// 아이스크롤
		myScroll = new iScroll('imgSlide', {
			snap: true,
			momentum: false,
			hScrollbar: false,
			vScroll: false,
			onScrollEnd: function () {
				document.querySelector('.bannerBtn span.active').className = '';
				document.querySelector('.bannerBtn span:nth-child(' + (this.currPageX+1) + ')').className = 'active';
				document.querySelector('.tablist li a.on').className = '';
				$('.tablist li:nth-child('+ (this.currPageX+1) +') a').addClass('on');
				manageControls();
			}
		});




		//이미지 슬라이드 팝업
	    imgSlidePop.wrapAll('<div id="imgSlidePopWarp" />');
		var tablist = $('.tablist li a'),
			imgSlidePopWarp = $('#imgSlidePopWarp'),
			closeBTn = $('.closeBTn');
			imgSlidePopWarp.height($('#wrapper').height());

		tablist.each(function(i){
			$(this).click(function(){
				$navEl.attr('class','');
				$navEl.eq(i).attr('class','active');
				$('.tablist li a').attr('class','');
				$('.tablist li a').eq(i).attr('class','on');
				myScroll.scrollToPage(i);
				manageControls();
			});
		});

		tablist.click(function(){imgSlidePopWarp.fadeIn();});
		closeBTn.click(function(){imgSlidePopWarp.fadeOut();});
		setTimeout(scrollTo,0,0,1);
	}
	/* ************************** */



	/* **************************
	 레이어팝업
	**************************** */
	var layerBtn = $(".layer-btn");
	var layerID = layerBtn.attr('href');
	var layerCon = $(layerID)
	var layerCloseBtn = layerCon.find('.layer-close-btn, .js-close-btn'); /* 20140204 */
	var layerBG = $("<div class='layer-bg'></div>");
	var layerBG2 = $("<div class='layer-bg2'></div>");
	layerBtn.click(function(){
		var width = $('#wrapper').width(), height = $('#wrapper').height();
		$('body').append(layerBG);
		layerBG.height(height);
		layerCon.show();
		$(window).resize(function(){
			var width = $('#wrapper').width(), height = $('#wrapper').height();
			layerBG.height(height);
		});
		return false;
	});
	layerCloseBtn.click(function(){
		layerBG.remove();
		layerCon.hide();
		return false;
	});

	$("a.open").click(function(){
		var con = $(this).attr('rel');
		var width = $('#wrapper').width(), height = $('#wrapper').height();
		$('#wrapper').append(layerBG2);
		layerBG2.height(height);
		$(con).addClass('show')
		$(window).resize(function(){
			var width = $('#wrapper').width(), height = $('#wrapper').height();
			layerBG2.height(height);
		});
		$(".close").click(function(){
			layerBG2.remove();
			$(con).removeClass('show');
		});
		return false;
	});
});

/* 기울기에 따른 css 적용 */
function setOrientation() {
	var orient = Math.abs(window.orientation) === 90 ? 'landscape' : 'portrait';
	var cl = document.body.className;
	cl = cl.replace(/portrait|landscape/, orient);
	document.body.className = cl;
}
