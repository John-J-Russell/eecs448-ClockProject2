var date = " ";
var day = 20;
var month = 3;
var month_key_value = [1,4,4,0,2,5,0,3,6,1,4,6];

//Function to handle next day transitions
function nextDay()
{
	switch(month){
		case 2:
		if(day == 29)
		{
			month++;
			day = 0;
		}
		break
		case 4:
		case 6:
		case 9:
		case 11:
		if(day == 30)
		{
			month++;
			day = 0;
		}
		break;
		default:
		if(day == 31)
		{
			month++;
			day = 0;
		}
		break;
	}
	//After changing the day, set the date
	setDate();
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
		date = "Sunday";
		break;
		case 2:
		date = "Monday";
		break;
		case 3:
		date = "Tuesday";
		break;
		case 4:
		date = "Wednesday";
		break;
		case 5:
		date = "Thursday";
		break;
		case 6:
		date = "Friday";
		break;
		case 0:
		date = "Saturday";
		break;
	}
}