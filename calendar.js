var date = " ";
var day = 20;
var month = 3;
var month_key_value = [1,4,4,0,2,5,0,3,6,1,4,6];


function getDate()
{
	setDate();
	return date;
}

//Sets the string variable date with the current day of the week
function setDate()
{

	//If this is a leap year, compensate by changing jan. and feb. month key value
	var leap = 0;
	if(month == 2 || month == 1)
	{
		leap = -1;
	}

	//Modified Gauss method
	//formula is [(year / 4) + day + month + leap + century + last digits of year] mod 7
	var formula = (4 + day + month_key_value[month - 1] + leap + 6 + 16) % 7;
	switch(formula)
	{
		case 1:
		day = "Sunday";
		break;
		case 2:
		day = "Monday";
		break;
		case 3:
		day = "Tuesday";
		break;
		case 4:
		day = "Wednesday";
		break;
		case 5:
		day = "Thursday";
		break;
		case 6:
		day = "Friday";
		break;
		case 0:
		day = "Saturday";
		break;
	}
}