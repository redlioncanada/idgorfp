/* Handles image creation and animation */

function Reveal(opts) {
	//vars
	this.data = opts.images;
	this.myDivId = opts.div;
	this.path = opts.path;
	this.lastGroup = -1;
	
	//private methods
	this.createImage = function(filename,group,index) {
		var url = this.path+filename+".png";
		var testTop = $('#test').offset().top;
		var testLeft = $('#test').offset().left;
		
		$("#"+this.myDivId).append("<img src='"+url+"' class='group"+group+" index"+index+"'/>");
	};
	this.hideImage = function(group,index) {
		$('img.group'+group+'.index'+index).fadeOut();	
	};
	this.showImage = function(group,index) {
		$('img.group'+group+'.index'+index).fadeIn();	
	};
	this.log = function(str) {
		console.log('[reveal.js] '+str);
	};
	this.resize = function(init) {
		//using some magic numbers based on the book's position in relation to the video frame
		var videoWidth = $('#video').width();
		var bookWidth = videoWidth * .5113356459918;
		var deadZoneLeft = videoWidth * .23767995016545;
		var deadZoneRight = deadZoneLeft;
		var videoHeight = $('#video').height();
		var deadZoneTop = videoHeight * .11245944849959;
		var deadZoneBottom = videoHeight * .08333333333333;
		var videoLeft = $('#video').offset().left;
		var videoTop = $('#video').offset().top;
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		var testTop = videoTop+deadZoneTop;
		if (init) testTop *= 2.6; //init hack, video size returns half for some reason
		var testLeft = videoLeft+deadZoneLeft;
		
		$('#test').css({
			width: (videoWidth-deadZoneLeft-deadZoneRight)+"px",
			height: ((videoWidth-deadZoneLeft-deadZoneRight)/(1.1117))+"px",
			left: testLeft+"px",
			top: testTop+"px"
		});
		
		$('#video').css({
			top: ((windowHeight-videoHeight)/2)+"px"
		});
		
		$('#blackbar.bottom').css({
			top: init ? windowHeight-(((windowHeight-videoHeight)/2)) + "px" : videoTop+videoHeight-1+"px",
			height: init ? ((windowHeight-videoHeight)/2)+"px" : windowHeight-videoHeight+"px",
		});
		
		$('#blackbar.top').css({
			height: ((windowHeight-videoHeight)/2)+"px"
		});
		
		$('#blackbar.left').css({
			width: windowWidth-videoWidth+"px"
		});
		
		$('#blackbar.right').css({
			width: windowWidth-videoWidth+"px"
		});
		
		for (var group in this.data) {
			for (var index in this.data[group]) {
				$('img.group'+group+'.index'+index).css({
					'top': (testTop + this.data[group][index]['top']) + "px",
					'left': (testLeft + this.data[group][index]['left']) + "px"
				});
			}
		}
	};
	this.init = function() {
		for (var group in this.data) {
			for (var index in this.data[group]) {
				this.createImage(this.data[group][index]['name'],group,index);
			}
		}
	};
	
	
	$('body').append('<div id="test" style="position:absolute;z-index:500;border:1px dotted purple;"></div>');
	
	var self = this;
	$(document).ready(function(){
		self.init();
		self.resize(true);
	});
	$(window).on('resize', function(){
		self.resize();
	});
}

Reveal.prototype.Next = function(recur) {
	if (typeof recur === 'undefined') recur = false;
	this.lastGroup++;
	if (this.lastGroup > this.data.length) {
		if (recur) {
			this.lastGroup = -1;
		} else {
			this.lastGroup = this.data.length-1;
		}	
	}
	
	$('img.group'+this.lastGroup).fadeIn();
}

Reveal.prototype.Previous = function(recur) {
	if (typeof recur === 'undefined') recur = false;

	$('img.group'+this.lastGroup).fadeOut();
	
	this.lastGroup--;
	if (this.lastGroup < 0) {
		if (recur) {
			this.lastGroup = this.data.length;
		} else {
			this.lastGroup = -1;
		}	
	}
}

Reveal.prototype.At = function(index) {
	if (this.data[index]) {
		$('img.group'+index).fadeIn();
		lastGroup = index;
	} else {
		this.log('Method At() caught error: index does not exist');
	}
}

Reveal.prototype.Color = function() {
	for (var group in this.data) {
		for (var index in this.data[group]) {
			$('img.group'+group+'.index'+index).removeClass('grayscale');
		}
	}
}

Reveal.prototype.Grayscale = function() {
	for (var group in this.data) {
		for (var index in this.data[group]) {
			$('img.group'+group+'.index'+index).addClass('grayscale');
		}
	}
}
