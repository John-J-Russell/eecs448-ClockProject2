function zoom_size() {
	size = document.getElementById("zoom_input").value;
	
	
	
	if(size != "25%" && size!= "50%" && size != "75%" && size != "100%" && size != "125%"  && size != "150%"  && size != "175%" && size != "200%") {
		var inputVal = document.getElementById("zoom_input");
		inputVal.style.backgroundColor = "red";

	}
	else {
		var inputVal = document.getElementById("zoom_input");
		inputVal.style.backgroundColor = "green";
		document.body.style.zoom=size;
		
		
	}

	
	
}
