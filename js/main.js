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
		console.log("next clicked");
		disableButtons(true,false);
		forwardClick();
	}
});

$('#close').on('click', function() {
	hideVideoOverlay();
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
	if (typeof init == 'undefied') init = false;
	var videoLeft = $('#video1').offset().left;
	var videoTop = $('#video1').offset().top;
	var videoHeight = $('#video1').height();
	var videoWidth = $('#video1').width();
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var newVideoTop = ((windowHeight-videoHeight)/2);
	
	$('#video1,#video2,#placeholder').css({
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
		top: windowHeight/2-$('#buttons>.button').height()+15+"px"
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
			if (!window.ended) $('#logo').animate({'opacity':1},200)
			else $('#logo,#pdf').animate({'opacity':1},200)
		}
	}
};