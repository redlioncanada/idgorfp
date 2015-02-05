window.buttonsDisabled = true;
window.ended = false;

$('#prev').on('click', function() {
	if (!window.buttonsDisabled) {
		disableButtons(true,false);
		backwardClick();
	}
});

$('#next').on('click', function() {
	if (!window.buttonsDisabled) {
		////console.log("next clicked");
		disableButtons(true,false);
		forwardClick();
	}
});

$('#close').on('click', function() {
	hideVideoOverlay();
});

$('#video3').on('click', function() {
	hideVideoOverlay();
});

$('#clickzone').on('click', function() {
	showVideoOverlay();
});

$(document).ready(function() {
	initVideo();
	resize(true);
});
$(window).on('resize', function(){
	resize();
});

//setTimeout(function(){showVideoOverlay();},2000);

function resize(init) {
	if (typeof init == 'undefined') init = false;
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var videoWidth = $('#layer0video').width();
	var bookWidth = videoWidth * .5113356459918;
	var deadZoneLeft = videoWidth * .23767995016545;
	var deadZoneRight = videoWidth * .24767995016545;
	var videoHeight = windowWidth / (16/9);
	var deadZoneTop = videoHeight * .13;
	var deadZoneBottom = videoHeight * .13;
	var videoLeft = $('#layer0video').offset().left;
	var videoTop = $('#layer0video').offset().top;
	var newVideoTop = ((windowHeight-videoHeight)/2);

	$('#clickzone').css({
		width: (videoWidth-deadZoneLeft-deadZoneRight)+"px",
		height: (videoHeight-deadZoneTop-deadZoneBottom)+"px",
		left: videoLeft+deadZoneLeft+"px",
		top: newVideoTop+deadZoneTop+"px"
	});
	
	$('#video1,#video2,#video3,#placeholder').css({
		top: newVideoTop+"px"
	});
	
	$('#blackbar.bottom').css({
		top: windowHeight-newVideoTop + "px",
		height: newVideoTop+"px",
	});
	
	$('#blackbar.top').css({
		height: newVideoTop+"px"
	});
	
	$('#buttons>.button').css({
		top: (windowHeight/2-$('#buttons>.button').height()/2)+"px"
	});
	
	var pdfTop = $('#blackbar.bottom').offset().top > windowHeight ? windowHeight : $('#blackbar.bottom').offset().top;
	$('#pdf').css({
		top: (pdfTop - $('#pdf').height() - 50) + "px"
	});
	
	$('#logo').css({
		top: ($('#blackbar.top').height() + $('#logo').height() + 53) + "px"
	});
	
	if (!init && !$('#logo').is(':animated')) {
		if (windowWidth < 750 || windowHeight < 350) {
			$('#logo').animate({'opacity':0},200)
		} else {	
			$('#logo,#pdf').animate({'opacity':1},200)
		}
	}
};