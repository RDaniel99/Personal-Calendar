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
		x.textContent = day + ' ' + getStringFromMonthIndex(month) + ' ' + year;
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

	repairMonth();
	colorSelectedDate(day);
}

function getLastDayOfMonthYear(month, year)
{
	if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
	{
		return 31;
	}

	if(month == 4 || month == 6 || month == 9 || month == 11) {
		return 30;
	}

	if(year % 4 != 0) return 28;
	if(year % 100 != 0) return 29;
	if(year % 400 != 0) return 28;

	return 29;
}

function dayOfTheWeek(day, month, year)
{
	let t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
	if(month < 3)
	{
		year = year - 1;
	}

	let result = (year + parseInt(year / 4) - parseInt(year / 100) + parseInt(year / 400) + t[month - 1] + day) % 7;
	if(result == 0) result = 7;
	return result;
}

function colorSelectedDate(idx)
{
	for(let i = 1; i <= 42; ++i)
	{
		let idString = "divDate" + i;
		let x = document.getElementById(idString);

		if(x.style.backgroundColor == "blue") {
			x.style.backgroundColor = "#74a4f2";
			break;
		}
	}

	for(let i = 1; i <= 42; ++i) {
		let idString = "divDate" + i;
		let x = document.getElementById(idString);

		if(x.innerHTML == idx && x.style.opacity == "1") {
			x.style.backgroundColor = "blue";
			break;
		}
	}

	day = idx;

	let x = document.getElementById('middle');

	x.innerHTML = day + ' ' + getStringFromMonthIndex(month) + ' ' + year;
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

	x.textContent = day + ' ' + getStringFromMonthIndex(month) + ' ' + year;

	repairMonth();
	colorSelectedDate(day);
}

function repairMonth()
{
	for(let i = 1; i <= 42; ++i) {
		let idString = "divDate" + i;
		let x = document.getElementById(idString);

		x.removeEventListener("click", function() {
				colorSelectedDate(x.innerHTML);
			});
	}

	for(let i = 1; i <= 42; i++) {
		let idString = "divDate" + i;
		let x = document.getElementById(idString);
		x.style.opacity = "1";
	}

	let firstDay = dayOfTheWeek(1, month, year);
	let lastDay  = getLastDayOfMonthYear(month, year);

	let previousMonth = (month == 1 ? 12 : month - 1);
	let previousYear  = (month == 1 ? year - 1 : year);
	for(let i = 1, j = getLastDayOfMonthYear(previousMonth, previousYear) - firstDay + 2; i < firstDay; i++, j++)
	{
		let idString = "divDate" + i;
		let x = document.getElementById(idString);
		x.style.opacity = "0.5";
		x.innerHTML = j;
	}

	let flag = false;
	if((firstDay + lastDay - 1) % 7 == 0) flag = true;
	for(let i = firstDay + lastDay, j = 1; i <= 42; ++i, j++) {
		let idString = "divDate" + i;
		let x = document.getElementById(idString);
		if(flag == true) {
			x.style.opacity = "0";
		}
		else {
			x.style.opacity = "0.5";
			x.innerHTML = j;
		}

		if((i - 1) % 7 == 6) {
			flag = true;
		}
	}

	for(let i = firstDay, j = 1; i < firstDay + lastDay;i++, j++)
	{
		let idString = "divDate" + i;
		let x = document.getElementById(idString);
		x.innerHTML = j;
	}

	for(let i = 1; i <= 42; ++i)
	{
		let idString = "divDate" + i;
		let x = document.getElementById(idString);

		if(x.style.opacity == "1")
		{
			x.addEventListener("click", function() {
				colorSelectedDate(x.innerHTML);
			});
		}
	}
}

function getStringFromMonthIndex(idx)
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

function getMonthIndexFromString(string)
{
	for(let i = 1; i <= 12; ++i)
	{
		if(getStringFromMonthIndex(i) == string)
		{
			return i;
		}
	}
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
