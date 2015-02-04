// Set main video player vars
var videosrc = null;
var oggsrc = null;
var basevideo = null;
var videojq = null;
var forwardFolder = "video/forward/";
var backwardFolder = "video/backward/";

// Set video list and index vars
var videoList = [
	'01_BookOpen_final',
	'openTo02', 
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
	"17To18",
	"18To19",
	"19To20",
	"21To22",
	"22To23"
];
var reverseVideoList = [
	'01_BookOpenReverse',
	'openTo02Reverse',
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
	"17To18Reverse",
	"18To19Reverse",
	"19To20Reverse",
	"21To22Reverse",
	"22To23Reverse"
];
var videoIndex = 0;

// Set backwards side load video element (hidden)
var backvideo = document.createElement('video');
backvideo.autoPlay = false;

var back_mp4 = document.createElement('source');
back_mp4.type = "video/mp4";
back_mp4.src = backwardFolder + reverseVideoList[videoIndex] + ".mov";

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
front_mp4.src = forwardFolder + videoList[videoIndex+1] + ".mov";

var front_ogg = document.createElement('source');
front_ogg.type="video/ogg"
front_ogg.src = forwardFolder + videoList[videoIndex] + ".ogg";

frontvideo.appendChild(front_mp4);
frontvideo.appendChild(front_ogg);

frontvideo.load();

/**
 * enablebuttons function.
 * Fades out video and enables back and forward buttons
 * 
 * @access public
 * @return void
 */
function enablebuttons() {
	basevideo.addEventListener
	//videojq.fadeOut(400, function() {
		window.disableButtons = false;
		basevideo.removeEventListener("ended", enablebuttons);
	//});
}

/**
 * reorderVideos function.
 * Reorders the videos based on current index.
 * 
 * @param int index
 * @return void
 */
function reorderVideos(index, direct) {
	if (index < 0) {
		index = 0; 
		videoIndex = index;
	}
	if (index >= videoList.length) {
		index = videoList.length - 1; 
		videoIndex = index;
	}
	if (index >= 0 && index < videoList.length) {
		back_mp4.src = backwardFolder + reverseVideoList[index] + ".mov";
		back_ogg.src = backwardFolder + reverseVideoList[index] + ".ogg";
		if (direct > 0) {
			videosrc.src = forwardFolder + videoList[index] + ".mov";
			oggsrc.src = forwardFolder + videoList[index] + ".ogg";
		} else {
			videosrc.src = backwardFolder + reverseVideoList[index] + ".mov";
			oggsrc.src = backwardFolder + reverseVideoList[index] + ".ogg";
		}
		front_mp4.src = forwardFolder + videoList[index] + ".mov";
		front_ogg.src = forwardFolder + videoList[index] + ".ogg";
		
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
	//videojq.fadeIn(400, function() {
		basevideo.play(); 
		basevideo.addEventListener("ended", enablebuttons);
	//});
	basevideo.removeEventListener("loadeddata", playforward);
};

var playInit = function(event) {
	basevideo.play();
}

/**
 * forwardClick function.
 * called from next on click in main.js - reorders and loads next video
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var forwardClick = function() {
	videoIndex++;
	reorderVideos(videoIndex, 1);
	
	frontvideo.load();
	basevideo.load();
	///console.log("foreward");
	
	basevideo.addEventListener('loadeddata', playforward);
};

/**
 * backwardClick function.
 * called from prev on click in main.js - reorders and loads previous video
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var backwardClick = function() {
	reorderVideos(videoIndex, -1);	
	videoIndex--;
	
	backvideo.load();
	basevideo.load();
	//console.log("backward");
	
	basevideo.addEventListener('loadeddata', playforward);
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
	basevideo = document.getElementById("mainvideo");
	videojq = $("#video");
	
	//var duration = parseInt(basevideo.duration);
	basevideo.addEventListener('loadeddata', playInit);
	//TweenMax.fromTo(basevideo, duration, {currentTime:0}, {currentTime:duration, ease:Linear.easeNone, onComplete:enablebuttons});
};