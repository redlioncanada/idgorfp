// Set main video player vars
var videosrc = null;
var oggsrc = null;
var videojq = null;
var forwardFolder = "video/forward/";
var backwardFolder = "video/backward/";
var caseFolder = "video/case/";
var videoLayer = 1;

var useVideo = null;
var usemp4 = null;
var useogg = null;

var overlayVideo = document.getElementById("layer2video");
var overlaymp4 = document.getElementById("mp4_src2");
var overlayogg = document.getElementById("ogg_src2");

var videoWidth = $('#layer0video').width();
var bookWidth = videoWidth * .5113356459918;
var deadZoneLeft = videoWidth * .23767995016545;
var deadZoneRight = deadZoneLeft;
var videoHeight = $('#layer0video').height();
var deadZoneTop = videoHeight * .11245944849959;
var deadZoneBottom = videoHeight * .08333333333333;
var videoLeft = $('#layer0video').offset().left;
var videoTop = $('#layer0video').offset().top;
var windowHeight = $(window).height();
var windowWidth = $(window).width();

$('#clickzone').css({
	width: (videoWidth-deadZoneLeft-deadZoneRight)+"px",
	height: ((videoWidth-deadZoneLeft-deadZoneRight)/(1.1117))+"px",
	left: videoLeft+deadZoneLeft+"px",
	top: videoTop+deadZoneTop+"px",
	zIndex: 100
});

// Set video list and index vars
var videoList = [
	"01_BookOpen",
	"openTo02",
	"02To03",
	"03To04",
	"04To05",
	"05To06",
	"06To07",
	"07To08",
	"08To09",
	"09To10",
	"10To11",
	"11To12",
	"12To13",
	"13To14",
	"14To15",
	"15To16",
	"16To17",
	"17To18",
	"18To19",
	"19To20",
	"20To21",
	"21To22",
	"22To23",
	"23To24",
	"24To25",
	"25To26",
	"26To27",
	"27To28",
	"EndVid"
];
var reverseVideoList = [
	"01_BookOpenReverse",
	"openTo02Reverse",
	"02To03Reverse",
	"03To04Reverse",
	"04To05Reverse",
	"05To06Reverse",
	"06To07Reverse",
	"07To08Reverse",
	"08To09Reverse",
	"09To10Reverse",
	"10To11Reverse",
	"11To12Reverse",
	"12To13Reverse",
	"13To14Reverse",
	"14To15Reverse",
	"15To16Reverse",
	"16To17Reverse",
	"17To18Reverse",
	"18To19Reverse",
	"19To20Reverse",
	"20To21Reverse",
	"21To22Reverse",
	"22To23Reverse",
	"23To24Reverse",
	"24To25Reverse",
	"25To26Reverse",
	"26To27Reverse",
	"27To28Reverse"
];

var caseStudyVideos = [
	"13To14",
	"14To15",
	"16To17",
	"17To18"
];

var videoIndex = 0;

// Set backwards side load video element (hidden)
var backvideo = document.createElement('video');
backvideo.autoPlay = false;

var back_mp4 = document.createElement('source');
back_mp4.type = "video/mp4";
back_mp4.src = backwardFolder + reverseVideoList[videoIndex] + ".mp4";

var back_ogg = document.createElement('source');
back_ogg.type="video/ogg"
back_ogg.src = backwardFolder + reverseVideoList[videoIndex] + ".ogg";

backvideo.appendChild(back_mp4);
backvideo.appendChild(back_ogg);

backvideo.load();

// Set forwards side load video element (hidden) and init next video
var frontvideo = document.createElement('video');
frontvideo.autoPlay = false;

var front_mp4 = document.createElement('source');
front_mp4.type = "video/mp4";
front_mp4.src = forwardFolder + videoList[videoIndex+1] + ".mp4";

var front_ogg = document.createElement('source');
front_ogg.type="video/ogg"
front_ogg.src = forwardFolder + videoList[videoIndex] + ".ogg";

frontvideo.appendChild(front_mp4);
frontvideo.appendChild(front_ogg);

frontvideo.load();
/**
 * enableButtons function.
 * Fades out video and enables back and forward buttons
 * 
 * @access public
 * @optional param bool fade
 * optional param int time
 * @return void
 */
var enableButtons = function(fade,time) {
	if (!window.buttonsDisabled || window.end) return;
	if (typeof fade == 'undefined') fade = false;
	if (typeof time == 'undefined') time = 400;
	console.log('enableButtons,fade:'+fade);
	window.buttonsDisabled = false;
	useVideo.removeEventListener("ended", useVideoHandler);
	if ($('.button').eq(0).css('opacity') != 1 && fade) {
		$('.button').animate({'opacity':1},time, function(){
			$(this).css('cursor','pointer');
		});
	}
	
	if ($.inArray(videoList[videoIndex],caseStudyVideos) != -1) {
		overlaymp4.src = caseFolder + videoList[videoIndex] + '.mp4';
		overlayogg.src = caseFolder + videoList[videoIndex] + '.ogg';
		overlayVideo.load();
		$('#clickzone').bind('click', function(e) {
			showVideoOverlay();
		});
	}
};

/**
 * disableButtons function.
 * Fades out video and hides and/or disables back and forward buttons
 * 
 * @access public
 * @optional param bool fade
 * @optional param bool hide
 * @optional param int time
 * @return void
 */
var disableButtons = function(fade,hide,time) {
	if (window.buttonsDisabled && !hide) return;
	console.log('disable buttons,fade:'+fade+',hide:'+hide);
	window.buttonsDisabled = true;
	if (typeof hide == 'undefined') hide = false;
	if (typeof fade == 'undefined') fade = false;
	if (typeof time == 'undefined') time = 400;
	if ($('.button').eq(0).css('opacity') == 1) {
		if (hide) {$('.button').stop(true,true).animate({'opacity':0},time); return;}
		if (fade) $('.button').stop(true,true).animate({'opacity':0.25},time);
		if (hide || fade) $('.button').css('cursor','default');
	}
	$('#clickzone').unbind('click');
};

/**
 * reorderVideos function.
 * Reorders the videos based on current index.
 * 
 * @param int index
 * @return void
 */
function reorderVideos(direct) {
	
	if (videoLayer == 0) {
		videoLayer = 1;
	} else {
		videoLayer = 0;
	}
	
	useVideo = document.getElementById("layer"+videoLayer+"video");
	usemp4 = document.getElementById("mp4_src"+videoLayer);
	useogg = document.getElementById("ogg_src"+videoLayer);
	
	if (direct > 0) { 
		videoIndex++;
	}
	
	if (videoIndex < 0) {
		videoIndex = 0;
	}
	if (videoList[videoIndex] == "EndVid") {
		// videoIndex = videoList.length - 1;
		window.ended = true;
		disableButtons(false,true);
	} else {
		disableButtons();
	}
	
	if (videoIndex >= 0 && videoIndex < videoList.length) {
		back_mp4.src = backwardFolder + reverseVideoList[videoIndex] + ".mp4";
		back_ogg.src = backwardFolder + reverseVideoList[videoIndex] + ".ogg";
		if (direct > 0) {
			usemp4.src = forwardFolder + videoList[videoIndex] + ".mp4";
			useogg.src = forwardFolder + videoList[videoIndex] + ".ogg";
		} else {
			usemp4.src = backwardFolder + reverseVideoList[videoIndex] + ".mp4";
			useogg.src = backwardFolder + reverseVideoList[videoIndex] + ".ogg";
		}
		front_mp4.src = forwardFolder + videoList[videoIndex] + ".mp4";
		front_ogg.src = forwardFolder + videoList[videoIndex] + ".ogg";
	}
	
	frontvideo.load();
	useVideo.load();
	backvideo.load();
	
	useVideo.addEventListener('loadeddata', playforward);
		
	if (direct < 0) { 
		videoIndex--;
	}
	//console.log("Backvideo: "+backvideo.src+" current video: "+videosrc.src+" forward Video: "+frontvideo.src);
}

/**
 * playforward function.
 * for forward button click video loaded event listener. Fades in and plays video.
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var playforward = function(event) {
	if (videoLayer == 0) {
		setTimeout(function() {
			$("#layer1video").fadeOut(500);
		}, 100);
	} else {
		setTimeout(function() {
			$("#layer1video").fadeIn(500);
		}, 100);
	}
	useVideo.play(); 
	useVideo.addEventListener("ended", useVideoHandler);
	useVideo.removeEventListener("loadeddata", playforward);
};


/**
 * forwardClick function.
 * called from next on click in main.js - reorders and loads next video
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var forwardClick = function() {
	reorderVideos(1);	
};

/**
 * backwardClick function.
 * called from prev on click in main.js - reorders and loads previous video
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var backwardClick = function() {
	reorderVideos(-1);	
};

/**
 * initVideo function.
 * called from on document load in main.js - loads vars and plays first video
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var initVideo = function() {
	videosrc = document.getElementById("mp4_src");
	oggsrc = document.getElementById("ogg_src")
	useVideo = document.getElementById("layer1video");
	videojq = $("#video");
	
	//var duration = parseInt(basevideo.duration);
	//basevideo.addEventListener('loadeddata', playInit);
	//TweenMax.fromTo(basevideo, duration, {currentTime:0}, {currentTime:duration, ease:Linear.easeNone, onComplete:enablebuttons});
	setTimeout(function() {
		useVideo.play();
		//console.log("first video played");
		useVideo.addEventListener("ended", useVideoHandler);
		$('#layer0video, #layer1video').attr('poster','');
	}, 700);
};

/**
 * useVideoHandler function.
 * called on video end, referenced to remove it on end
 * 
 * @return void
 */
var useVideoHandler = function(){
	if (!window.ended) {
		if (videoList[videoIndex] == "01_BookOpen") enableButtons(true,false,1);
		else enableButtons(true);
	} else {
		$('#pdf').animate({'opacity':1},400);
	}
};

/**
 * showVideoOverlay function.
 * shows the popup video overlay
 * 
 * @return void
 */
var showVideoOverlay = function() {
<<<<<<< HEAD
	$('#video3').animate({'opacity':1},400);
	disableButtons(true,true);
=======
	$('#video3').css('display','block').animate({'opacity':1},400);
>>>>>>> FETCH_HEAD
	$('#rl').animate({'opacity':0},200, function() {
		$('#rl').css('display','none');
		$('#close').delay(100).animate({'opacity':1},400).css('display','block');
		$('#close').bind('click', function(e) {
			e.preventDefault();
			hideVideoOverlay();
		})
		overlayVideo.play();
	});
};

/**
 * hideVideoOverlay function.
 * hides the popup video overlay
 * 
 * @return void
 */
var hideVideoOverlay = function() {
<<<<<<< HEAD
	$('#close').unbind('click');
	overlayVideo.stop();
	$('#video3').animate({'opacity':0},400);
=======
	$('#video3').css('display','none').animate({'opacity':0},400);
>>>>>>> FETCH_HEAD
	$('#close').animate({'opacity':0},200, function() {
		$('#close').css('display','none');
		$('#rl').delay(100).animate({'opacity':1},400).css('display','block');
		enableButtons(true);
	});
};