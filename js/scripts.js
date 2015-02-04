// Set main video player vars
var videosrc = null;
var basevideo = null;
var videojq = null;

// Set side load video elements (hidden)
var backvideo = document.createElement('video');
backvideo.id = "backvideo";
backvideo.autoPlay = false;

var frontvideo = document.createElement('video');
frontvideo.id = "frontvideo";
frontvideo.autoPlay = false;

// Set video list and index vars
var videoList = ['video/00_BookOpen_1.mp4','video/01_BookOpen_1.mp4','video/02_BookOpen_1.mp4','video/03_BookOpen_1.mp4','video/04_BookOpen_1.mp4','video/05_BookOpen_1.mp4'];
var videoIndex = 0;
frontvideo.src = videoList[videoIndex+1];
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
	videojq.fadeOut(400, function() {
		window.disableButtons = false;
	});
}

/**
 * reorderVideos function.
 * Reorders the videos based on current index.
 * 
 * @param int index
 * @return void
 */
function reorderVideos(index) {
	if (index > 0 && index < videoList.length) {
		backvideo.src = videoList[index-1];
		videosrc.src = videoList[index];
		frontvideo.src = videoList[index];
		//console.log("Backvideo: "+backvideo.src+" current video: "+videosrc.src+" forward Video: "+frontvideo.src);
	}
}

/**
 * playforward function.
 * for forward button click video loaded event listener. Fades in and plays video.
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var playforward = function(event) {
	basevideo.currentTime = 0;
	var duration = parseInt(basevideo.duration);
	
	videojq.fadeIn(400, function() {
		TweenMax.fromTo(basevideo, duration, {currentTime:0}, {currentTime:duration, ease:Linear.easeNone, onComplete:enablebuttons});
	});
	basevideo.removeEventListener("loadeddata", playforward);
};

/**
 * playbackward function.
 * for backward button click video loaded event listener. Fades in and plays video.
 * 
 * @param mixed event (passed by event listener)
 * @return void
 */
var playbackward = function(event) {
	var duration = parseInt(basevideo.duration);
	basevideo.currentTime = duration;

	videojq.fadeIn(400, function() {
		TweenMax.fromTo(basevideo, duration, {currentTime:duration}, {currentTime:0, ease:Linear.easeNone, onComplete:enablebuttons});
	});
	basevideo.removeEventListener("loadeddata", playbackward);
};

var forwardClick = function() {
	videoIndex++;
	reorderVideos(videoIndex);
	
	frontvideo.load();
	basevideo.load();
	
	basevideo.addEventListener('loadeddata', playforward);
};

var backwardClick = function() {
	videoIndex--;
	reorderVideos(videoIndex);	
		
	backvideo.load();
	basevideo.load();
	
	basevideo.addEventListener('loadeddata', playbackward);
};


var initVideo = function() {
	videosrc = document.getElementById("mp4_src");
	basevideo = document.getElementById("mainvideo");
	videojq = $("#video");
	
	var duration = parseInt(basevideo.duration);
	TweenMax.fromTo(basevideo, duration, {currentTime:0}, {currentTime:duration, ease:Linear.easeNone, onComplete:enablebuttons});
	
};