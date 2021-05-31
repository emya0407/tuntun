(function(win, $) {
	/*
	 * Swiper
	 */
	var $contents = $('.contents');
	var bookSwiper = undefined,
		evtSwiper = undefined,
		tabSwiper = undefined,
		librarySwiper = undefined,
		lnkSwiper = undefined,
		vdoSwiper = undefined,
		prgSwiper = undefined,
		stageSwiper = undefined,
		processSwiper = undefined,
		bookItemSwiper = undefined,
		makingStorySwiper = undefined;

	/*
	 * resize媛� �꾩슂�녿뒗 swipe
	 */
	function noResizeSwiper() {
		/*
		 * default Swiper
		 */
		// Main : KeyVisual Swiper
		if($contents.find('.kv_section').length !== 0) {
			var kvSec = $(".kv_section");
			addSwipeClass(kvSec, '.slide_wrap', '.kv_slide', '.slide_item');
			addSwipeOptionClass(kvSec, '', '', '', '.paging');
			var mainSwiper = new Swiper('.slide_wrap', {
				loop: false,
				pagination: {
					el: '.paging',
					clickable: true,
				}
			});
		}
		// Main : Notice Swiper
		if($contents.find('.noti_slide').length !== 0) {
			addSwipeClass(kvSec, '.noti_slide', '.noti_lst', '.noti_item');
			var notiSwiper = new Swiper('.noti_slide', {
				direction: 'vertical',
				loop: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false,
				}
			});
		}
		// Main : Event Swiper
		if($contents.find('.event_section').length !== 0) {
			var evtSec = $(".event_section");
			addSwipeClass(evtSec, '.event_slide', '.event_lst', '.event_item');
			addSwipeOptionClass(evtSec, '', '', '', '.paging');
			var evtSwiper = new Swiper('.event_slide', {
				slidesPerView: 'auto',
				spaceBetween: 20,
				loop: false,
				//centeredSlides : true, // 異붽� (2020-04-11)
				pagination: {
					el: '.paging',
					clickable: true,
				},
				breakpoints: {
					1279: {
						slidesPerView: 'auto',
					},
					639: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				}
			});
		}

		// main tab
		if($contents.find('.introduce_section').length !== 0) {
			var introSec = $(".introduce_section");
			addSwipeClass(introSec, '.tab_tit, .tab_cont', '.tit_lst, .cont_lst', '.tit_item, .cont_item');
			addSwipeOptionClass(introSec, '', '.btn_prev', '.btn_next', '.paging');

			var tabTit = new Swiper('.intro_tab', {
				slidesPerView: 'auto',
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
				slideToClickedSlide: true,
				breakpoints: {
					640: {
						centeredSlides: true
					}
				},
			});
			var tabContent = new Swiper('.intro_cont', {
				slidesPerView: 1,
				initialSlide: 0,
				autoHeight: true,
				pagination: {
					el: '.paging',
					clickable: true
				},
				navigation: {
					nextEl: '.btn_next',
					prevEl: '.btn_prev',
				},
				thumbs: {
					swiper: tabTit
				},
			});
			tabContent.on('slideChange', function(){
				idx = tabContent.activeIndex;
				tabTit.slideTo(idx, 500);
				introSec.find('.paging').children().removeClass('swiper-pagination-bullet-active');
				introSec.find('.paging').children().eq(idx).addClass('swiper-pagination-bullet-active');
			});
		}

		/*
		 * Junior Info
		 */
		// Sub - 二쇰땲�� �뚭컻 : 二쇰땲�� �④낵 tab Swiper
		if($contents.find('.tab_slide').length !== 0) {
			var tabSlide = $('.tab_slide');
			addSwipeClass(tabSlide, '', 'ul', 'li');
			var tabSlideButton = new Swiper('.tab_slide', {
				loop: false,
				autoplay: false,
				slideToClickedSlide: true,
				slidesPerView: 'auto',
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true
			});
		}
		// Sub - 二쇰땲�� �뚭컻 : 二쇰땲�� �④낵 Swiper
		if($contents.find('.effect_slide').length !== 0) {
			var effectGradeSlide = $('.effect_slide');
			addSwipeClass(effectGradeSlide, '', '.grade_lst', '.grade_item');
			addSwipeOptionClass(effectGradeSlide, '', '.btn_prev', '.btn_next', '');
			var effectGradeSwiper = new Swiper('.effect_slide', {
				loop: false,
				autoplay: false,
				autoHeight: true,
				simulateTouch: false,
				pagination : {
					el: '.paging',
					clickable: true
				},
				navigation : {
					nextEl : '.btn_next',
					prevEl : '.btn_prev'
				},
				thumbs: {
					swiper: tabSlideButton
				},
				on: {
					init: function() {
						var idx = 0;

						showSwipeButtonText(effectGradeSwiper, idx, '', 'grade_item');

						setTimeout(function(){
							effectGradeSlide.children().innerHeight(effectGradeSlide.find('.grade_item.swiper-slide-thumb-active').innerHeight());
						}, 100);
					}
				}
			});
			effectGradeSwiper.on('slideChange', function(){
				idx = effectGradeSwiper.activeIndex;
				showSwipeButtonText(effectGradeSwiper, idx, '', 'grade_item');
			});
		}
		// Sub - 二쇰땲�� �뚭컻 : 二쇰땲�� �④낵 Swiper �� Swiper
		if($contents.find('.grade_item').length !== 0) {
			var effectStudentSlide = $(".grade_item");
			addSwipeClass(effectStudentSlide, '', '.student_lst', '.student_item');
			addSwipeOptionClass(effectStudentSlide, '', '', '', '.paging');
			var effectStudentSwiper = new Swiper('.grade_item', {
				loop: false,
				autoplay: false,
				pagination: {
					el: '.paging',
					clickable: true
				},
				breakpoints: {
					639: {
						slidesPerView: 1,
						spaceBetween: 0
					}
				}
			});
		}

		// Sub : Junior Info 硫붿씤 鍮꾩��� Swiper
		if($contents.find('.info_slide').length !== 0) {
			var infoSec = $(".info_slide");
			addSwipeClass(infoSec, '.slide_box', '.slide_lst', '.slide_item');
			addSwipeOptionClass(infoSec, '.paging_line', '.btn_prev', '.btn_next', '.paging_num');
			var infoSwiper = new Swiper('.info_slide .slide_box', {
				slidesPerView: 1,
				spaceBetween: 0,
				loop: false,
				initialSlide: 0,
				observer: true,
				observeParents: true,
				watchOverflow: true,
				pagination: {
					el: '.paging_num',
					type: 'fraction',
					clickable: true,
				},
				navigation: {
					nextEl: '.btn_next',
					prevEl: '.btn_prev',
				},
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: false,
				},
			});
		}
	}
	/*
	 * Responsive Swiper
	 */
	function initSwiper() {
		var winWidth = $(window).outerWidth();
		// Common : Video Swiper
		if($contents.find('.vdo_section').length !== 0) {
			var vdoSec = $(".vdo_section");
			if ((winWidth <= 1280) && (vdoSwiper == undefined)) {
				addSwipeClass(vdoSec, '.vdo_box', '.vdo_lst', '.vdo_item');
				addSwipeOptionClass(vdoSec, '', '', '', '.paging');
				vdoSec.find('.paging').addClass("swiper-pagination");
				vdoSwiper = new Swiper('.vdo_section .vdo_box', {
					loop: false,
					pagination: {
						el: '.paging',
						clickable: true,
					},
					breakpoints: {
						1279: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						639: {
							slidesPerView: 1,
							spaceBetween: 0,
						}
					}
				});
			} else if ((winWidth >= 1281) && (vdoSwiper != undefined)) {
				vdoSwiper = destroySwipeClass(vdoSwiper, vdoSec, '.vdo_box', '.vdo_lst', '.vdo_item');
			}
		}
		// Main : 泥댄뿕�좎껌 Swiper
		if($contents.find('.lnk_section').length !== 0) {
			var linkSec = $(".lnk_section")
			if ((winWidth <= 1280) && (lnkSwiper == undefined)) {
				addSwipeClass(linkSec, '.lnk_box', '.lnk_lst', '.lnk_item');
				addSwipeOptionClass(linkSec, '', '', '', '.paging');
				lnkSwiper = new Swiper('.lnk_section .lnk_box', {
					loop: false,
					pagination: {
						el: '.paging',
						clickable: true,
					},
					breakpoints: {
						639: {
							slidesPerView: 1,
							spaceBetween: 0,
						}
					}
				});
			} else if ((winWidth >= 1281) && (lnkSwiper != undefined)) {
				lnkSwiper = destroySwipeClass(lnkSwiper, linkSec, '.lnk_box', '.lnk_lst', '.lnk_item');
			}
		}
		// Sub - Supertuntun : �덊띁�쇳듉�곸뼱二쇰땲�� �뱀쭠 Swiper
		if($contents.find('.stage_box').length !== 0) {
			var stageSec = $(".stage_box");
			if ((winWidth <= 1280) && (stageSwiper == undefined)) {
				addSwipeClass(stageSec, '', '.stage_lst', '.stage_item');
				addSwipeOptionClass(stageSec, '', '', '', '.paging');
				stageSwiper = new Swiper('.stage_box', {
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
					pagination: {
						el: '.paging',
						clickable: true
					}
				});
			} else if ((winWidth >= 1281) && (stageSwiper != undefined)) {
				stageSwiper = destroySwipeClass(stageSwiper, stageSec, '', '.stage_lst', '.stage_item');
			}
		}
		// Sub - Supertuntun : �덈꺼 �꾨줈洹몃옩 Swiper
		if($contents.find('.program_cont').length !== 0) {
			var prgSec = $(".program_cont");
			if ((winWidth < 1280) && (prgSwiper == undefined)) {
				addSwipeClass(prgSec, '.prg_box', '.cont_lst', '.cont_item');
				addSwipeOptionClass(prgSec, '', '', '', '.paging');
				prgSwiper = new Swiper('.program_cont .prg_box', {
					width: 440,
					slidesPerView: 2,
					slidesPerGroup: 2,
					loop: false,
					pagination: {
						el: '.paging',
						clickable: true
					},
					breakpoints: {
						639: {
							slidesPerGroup: 1,
							width: 220,
							slidesPerView: 1,
							spaceBetween: 0
						}
					}
				});
			} else if ((winWidth > 1281) && (prgSwiper != undefined)) {
				prgSwiper = destroySwipeClass(prgSwiper, prgSec, '.prg_box', '.cont_lst', '.cont_item');
			}
		}
		// Sub - Supertuntun : �숈뒿 �꾨줈�몄뒪 Swiper
		if($contents.find('.process_cont').length !== 0) {
			var processSec = $(".process_cont");
			if ((winWidth <= 1280) && (processSwiper == undefined)) {
				addSwipeClass(processSec, '.process_box', '.process_lst', '.process_item');
				addSwipeOptionClass(processSec, '', '', '', '.paging');
				processSwiper = new Swiper('.process_box', {
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
					pagination: {
						el: '.paging',
						clickable: true,
					},
				});
			} else if ((winWidth >= 1281) && (processSwiper != undefined)) {
				processSwiper = destroySwipeClass(processSwiper, processSec, '.process_box', '.process_lst', '.process_item');
			}
		}
		// Sub - �뚭컻 �섏씠吏� : �뚭컻 Swiper
		if($contents.find('.book_info_cont').length !== 0) {
			var bookItemSlide = $(".book_info_cont");
			if ((winWidth <= 1280) && (bookItemSwiper == undefined)) {
				addSwipeClass(bookItemSlide, '', '.book_lst', '.book_item');
				addSwipeOptionClass(bookItemSlide, '', '', '', '.paging');
				$(bookItemSlide).addClass("swiper-container");
				bookItemSwiper = new Swiper('.book_info_cont', {
					slidesPerView: 1,
					spaceBetween: 0,
					loop: false,
					watchOverflow: true,
					pagination: {
						el: '.paging',
						clickable: true,
					},
				});
			} else if ((winWidth >= 1281) && (bookItemSwiper != undefined)) {
				bookItemSwiper = destroySwipeClass(bookItemSwiper, bookItemSlide, '', '.book_lst', '.book_item');
			}
		}
		// Sub - Common : 援먯옱 援ъ꽦 Swiper
		if($contents.find('.book_box').length !== 0) {
			var bookSlide = $(".book_box");
			if ((winWidth <= 1280) && (bookSwiper == undefined)) {
				addSwipeClass(bookSlide, '', '.img_lst', '.img_item');
				addSwipeOptionClass(bookSlide, '.paging_line', '', '', '');
				bookSwiper = new Swiper('.book_box', {
					slidesPerView: 'auto',
					spaceBetween: 0,
					loop: false,
					watchOverflow: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					scrollbar: {
						el: '.paging_line',
						hide: true,
					},
				});
			} else if ((winWidth >= 1281) && (bookSwiper != undefined)) {
				removeSwipeOptionClass(bookSlide, '.paging_line', '', '', '');
				bookSwiper = destroySwipeClass(bookSwiper, bookSlide, '', '.img_lst', '.img_item');
			}
		}
		// Sub - Common : �쒕룞援먭뎄�� 援ъ꽦 Swiper
		if($contents.find('.cate_box').length !== 0) {
			var librarySlide = $(".cate_box");
			if ((winWidth <= 1280) && (librarySwiper == undefined)) {
				addSwipeClass(librarySlide, '', '.cate_lst', '.cate_item');
				addSwipeOptionClass(librarySlide, '', '', '', '.paging_num');
				librarySwiper = new Swiper('.cate_box', {
					slidesPerView: 'auto',
					spaceBetween: 0,
					loop: false,
					pagination: {
						el: '.paging_num',
						type: 'fraction',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				});
			} else if ((winWidth >= 1281) && (librarySwiper != undefined)) {
				removeSwipeOptionClass(librarySlide, '', '', '', '.paging_num');
				librarySwiper = destroySwipeClass(librarySwiper, librarySlide, '', '.cate_lst', '.cate_item');
			}
		}

		/*
		 * Junior Info
		 */
		// Sub - 二쇰땲�� �뚭컻 : 硫붿씠�뱀뒪�좊━ Swiper
		if($contents.find('.making_story').length !== 0) {
			var makingStorySlide = $(".making_story");
			if ((winWidth <= 640) && (typeof(makingStorySwiper) == typeof(undefinde))) {
				addSwipeClass(makingStorySlide, '', '.list_bg', 'li');
				addSwipeOptionClass(makingStorySlide, '', '.btn_next', '.paging_num');
				makingStorySwiper = new Swiper('.making_story', {
					loop: true,
					autoHeight: true,
					navigation : {
						nextEl : '.btn_next'
					},
					pagination: {
						el: '.paging_num',
						type: 'fraction',
						clickable: true
					},
					breakpoints: {
						639: {
							slidesPerView: 1,
							spaceBetween: 0
						}
					},
					on: {
						init: function() {
							var idx = 1;
							showSwipeButtonText(makingStorySwiper, idx, 'loop', '');
						}
					}
				});
				makingStorySwiper.on('slideChange', function(){
					idx = makingStorySwiper.activeIndex;
					showSwipeButtonText(makingStorySwiper, idx, 'loop', '');
				});
			} else if ((winWidth >= 641) && (makingStorySwiper !== undefined)) {
				removeSwipeOptionClass(makingStorySlide, '', '', '.btn_next', '.paging_num');
				makingStorySwiper = destroySwipeClass(makingStorySwiper, makingStorySlide, '', '.list_bg', 'li');
			}
		}
	}

	initSwiper();
	noResizeSwiper();

	/*
	 * Resize
	 */
	$(window).resize(function() {
		initSwiper();
	});

	/*
	 * swiper 怨듯넻 �⑥닔
	 * [contents] *�꾩닔
	 * $swipe : swipe 媛앹껜瑜� �댁� 蹂��섎챸
	 * swipeClass : slide ���곸슂�뚯쓽 class瑜� �댁� 蹂��섎챸
	 * swipeContainer : 'swiper-container'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 * swipeWrapper : 'swiper-wrapper'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 * swipeSlide : 'swiper-slide'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 *
	 * [option]
	 * swipeScrollbar : 'swiper-scrollbar'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 * swipePrev : 'swiper-button-prev'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 * swipeNext : 'swiper-button-next'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 * swipePaging : 'swiper-pagination'媛� 異붽��섏뼱�� �� �붿냼 or class or id
	 */

	/*
	 * swipe :: contents class 異붽�
	 */
	function addSwipeClass(_swipeClass, _swipeContainer, _swipeWrapper, _swipeSlide) {
		// console.log('_swipeClass: ', _swipeClass);
		if(_swipeContainer !== '') {
			_swipeClass.find(_swipeContainer).addClass("swiper-container");
		} else {
			_swipeClass.addClass("swiper-container");
		}
		if(_swipeWrapper !== '') {
			_swipeClass.find(_swipeWrapper).addClass("swiper-wrapper");
		}
		if(_swipeSlide !== '') {
			_swipeClass.find(_swipeSlide).addClass("swiper-slide");
		}
	}

	/*
	 * swipe option(add) : option class 異붽��섍린
	 */
	function addSwipeOptionClass(_swipeClass, _swipeScrollbar, _swipePrev, _swipeNext, _swipePaging) {
		if(_swipeScrollbar !== '') {
			_swipeClass.find(_swipeScrollbar).addClass("swiper-scrollbar");
		}
		if(_swipePrev !== '') {
			_swipeClass.find(_swipePrev).addClass("swiper-button-prev");
		}
		if(_swipeNext !== '') {
			_swipeClass.find(_swipeNext).addClass("swiper-button-next");
		}
		if(_swipePaging !== '') {
			_swipeClass.find(_swipePaging).addClass("swiper-pagination");
		}
	}

	/*
	 * swipe destroy :: contents class ��젣
	 */
	function destroySwipeClass(_swipe, _swipeClass, _swipeContainer, _swipeWrapper, _swipeSlide) {
		if(_swipeClass.length > 1) {
			_swipeClass.each(function(idx) {
				if(_swipeContainer !== '') {
					$(_swipeClass).eq(idx).find(_swipeContainer).removeClass("swiper-container");
				} else {
					$(_swipeClass).eq(idx).removeClass("swiper-container");
				}
				if(_swipeWrapper !== '') {
					$(_swipeClass).eq(idx).find(_swipeWrapper).removeClass("swiper-wrapper");
				}
				if(_swipeSlide !== '') {
					$(_swipeClass).eq(idx).find(_swipeSlide).removeClass("swiper-slide");
				}
				_swipe[idx].destroy();
			});
		} else {
			if(_swipeContainer !== '') {
				_swipeClass.find(_swipeContainer).removeClass("swiper-container");
			} else {
				_swipeClass.removeClass("swiper-container");
			}
			if(_swipeWrapper !== '') {
				_swipeClass.find(_swipeWrapper).removeClass("swiper-wrapper");
			}
			if(_swipeSlide !== '') {
				_swipeClass.find(_swipeSlide).removeClass("swiper-slide");
			}
			_swipe.destroy();
		}
		return undefined;
	}

	/*
	 * swipe option(remove) :: option class ��젣
	 */
	function removeSwipeOptionClass(_swipeClass, _swipeScrollbar, _swipePrev, _swipeNext, _swipePaging) {
		if(_swipeScrollbar !== '') {
			_swipeClass.find(_swipeScrollbar).removeClass("swiper-scrollbar");
		}
		if(_swipePrev !== '') {
			_swipeClass.find(_swipePrev).removeClass("swiper-button-prev");
		}
		if(_swipeNext !== '') {
			_swipeClass.find(_swipeNext).removeClass("swiper-button-next");
		}
		if(_swipePaging !== '') {
			if(_swipePaging === '.paging') {
				$(_swipePaging).children().remove();
			}
			_swipeClass.find(_swipePaging).removeClass("swiper-pagination");
		}
	}

	/*
	 * swipe button : next/prev text�댁슜蹂댁씠湲�
	 */
	function showSwipeButtonText(mySwipe, idx, loop, findParentClass){
		var naviTextBox = $('.navi_text_box'),
			defaultIndex = idx,
			$loop = loop,
			naviNames = [],
			targetNames = [];

		// slide �대��� name媛믪쓣 媛�吏� �붿냼 媛��몄삤湲� :: slide �대��� �� �ㅻⅨ slide媛� �덉쓣 ��,
		if(findParentClass !== '') {
			naviTextBox.prev().find('.'+findParentClass).each(function(idx){
				var parent = $('.'+findParentClass),
					name = parent.eq(idx).find('.name').eq(0);
				naviNames.push(name);
			});
		} else {	// �⑥씪 slide�� ��
			naviTextBox.prev().find('.name').each(function(){
				naviNames.push($(this));
			});
		}

		// name媛� 蹂��섏뿉 �닿린
		$(naviNames).each(function(idx){
			var $this = $(this);
			targetNames.push($this.attr('data-tit'));
		});

		// loop = "true"�� �� defaultIndex 媛� 議곗젙
		if($loop === 'loop') {
			if(defaultIndex == 0){
				defaultIndex = naviNames.length - 2;
			} else if(defaultIndex == naviNames.length - 1) {
				defaultIndex = 1;
			} else {
			}
		}
		naviTextBox.find('.btn_prev').children('span').text(targetNames[defaultIndex-1]);
		naviTextBox.find('.btn_next').children('span').text(targetNames[defaultIndex+1]);
	}
})(window, window.jQuery);
