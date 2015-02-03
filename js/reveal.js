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
	
	//init
	for (var group in this.data) {
		for (var index in this.data[group]) {
			this.createImage(this.data[group][index],group,index);	
		}
	}
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
