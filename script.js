var day;
var month;
var year;

var leftArr = document.getElementById('leftArrow');
var rightArr = document.getElementById('rightArrow');

//////////////////////////////////////////////////////////////
//////////////// Object types ////////////////////////////////
//////////////////////////////////////////////////////////////
var timeObject = function(hour, minute) {
	this._hour = hour;
	this._minute = minute;
}

var dateObject 	= function(day, month, year) {
	this._day 	= day;
	this._month = month;
	this._year 	= year;
};

var eventObject = function(start, end, date) {
	this._startTime = start;
	this._endTime	= end;
	this._date		= date;
}
//////////////////////////////////////////////////////////////
// To Do: Event type, location, description




function startup()
{
	let x = document.getElementById('middle');

	if(x.textContent == '')
	{
		day = month = 3;
		year = 2019;
		x.textContent = day + ' ' + getStringForMonthIndex(month) + ' ' + year;
	}

	// 6 weeks, 7 days = 42 days (are enough)

	let divMid = document.getElementById('container-mid');
	for(let i = 0; i < 42; i++)
	{
		let newDiv = document.createElement("div");
		
		newDiv.id = "divDate" + (i + 1);
		newDiv.setAttribute("class", "divDate");

		newDiv.style.width = "13%";
		newDiv.style.height = "100px";
		newDiv.style.display = "inline-block";

		newDiv.innerHTML += (i + 1);

		divMid.appendChild(newDiv);
	}
}

function changeMonth(sign)
{
	month = month + sign;
	if(month == 0)
	{
		year = year - 1;
		month = 12;
	}

	if(month == 13)
	{
		year = year + 1;
		month = 1;
	}

	let x = document.getElementById('middle');

	x.textContent = day + ' ' + getStringForMonthIndex(month) + ' ' + year;
}

function getStringForMonthIndex(idx)
{
	if(idx == 1) return "January";
	if(idx == 2) return "February";
	if(idx == 3) return "March";
	if(idx == 4) return "April";
	if(idx == 5) return "May";
	if(idx == 6) return "June";
	if(idx == 7) return "July";
	if(idx == 8) return "August";
	if(idx == 9) return "September";
	if(idx == 10) return "Octomber";
	if(idx == 11) return "November";
	if(idx == 12) return "December";
}

$(document).ready(function() {
	startup();
	leftArr.addEventListener("click", function() {
		changeMonth(-1);
	});
	rightArr.addEventListener("click", function() {
		changeMonth(1);
	});
});
