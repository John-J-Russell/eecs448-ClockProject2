/*
** EECS 448 Project #1,2: Clock
** @author: Alec Knutsen 
** @description: Two functions that help zoom the HTML page in and out 
** Last update: March 5, 2016.
*/

zoom_array = ["25%","50%","75%","100%","125%","150%","175%","200%"]; // Stores valid zoom sizes 
index = 3; // Stores index that we are at in the zoom array. Initially start at 100%

/**
     * Function takes the current zoom size and decreases it by 25% unless we are at the min. zooom size. Called as the onClick method of Zoom Out Button 
	 * @author - Alec Knutsen 
     * @param 
     * @return 
	 * @see
*/
function zoom_down() {
	
	//If we are at the minimum zoom size, do nothing 
	if(index == 0) {
		index =0;
	}
	
	// If we are not at the min zoom size
	else {
		
		index = index-1; // Decrease the index 
		document.body.style.zoom=zoom_array[index-1]; // Set the body size of the HTML Page to the corresponding array value 
		
		
	}

	
	
}


/**
     * Function takes the current zoom size and increases it by 25% unless we are at the max. zooom size. Called as the onClick method of Zoom IN Button 
	 * @author - Alec Knutsen 
     * @param 
     * @return 
	 * @see
*/
function zoom_up() {
	
	//If we are at the max zoom size, do nothing 
	if(index ==7) {
		
		index =7;
	}
	
	// If we are not at the max zoom size
	else {
		index = index+1; // Increase the index 
		document.body.style.zoom=zoom_array[index+1]; // Set the body size of the HTML Page to the corresponding array value 
	}

}
