zoom_array = ["25%","50%","75%","100%","125%","150%","175%","200%"];
index = 3;
function zoom_down() {
	
	if(index == 0) {
		index =0;
	}
	else {
		index = index-1;
		document.body.style.zoom=zoom_array[index-1];
		
		
	}

	
	
}

function zoom_up() {
	
	
	if(index ==7) {
		index =7;
	}
	else {
		index = index+1;
		document.body.style.zoom=zoom_array[index+1];
		
		
	}

	
	
}
