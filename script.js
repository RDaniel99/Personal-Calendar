var day = 3;
var month = 3;
var year = 2019;
var contorEvent = 0;

var leftArr 		= document.getElementById('leftArrow');
var rightArr 		= document.getElementById('rightArrow');
var previewPage 	= document.getElementById('preview');
var addButton 		= document.getElementById('add');
var deleteButton 	= document.getElementById('delete');
var modifyButton 	= document.getElementById('modify');
var formAddToAdd	= document.getElementById('formAdd');
var contentPreview  = document.getElementById('content-preview');

//////////////////////////////////////////////////////////////
//////////////// Object types ////////////////////////////////
//////////////////////////////////////////////////////////////
var dateObject 	= function(day, month, year) {
	this._day 	= day;   // Number
	this._month = month; // Number
	this._year 	= year;  // Number
};

var eventObject = function(start, end, id, color) {
	this._startDate = start; // dateObject
	this._endDate	= end;   // dateObject
	this._id		= id;    // Number
	this._color 	= color; // String
}

var eventsArray = [];
//////////////////////////////////////////////////////////////
// To Do: Event type, location, description


function updateLocalStorage()
{
	localStorage.setItem("day", day);
	localStorage.setItem("month", month);
	localStorage.setItem("year", year);
	localStorage.setItem("contorEvent", contorEvent);
	localStorage.setItem("events", JSON.stringify(eventsArray));
}

function startup()
{
	let x = document.getElementById('middle');

	if(localStorage.getItem("day") == null)
	{
		pressedTodayEvent();
		x.textContent = day + ' ' + getStringFromMonthIndex(month) + ' ' + year;
	}
	else {
		day = parseInt(localStorage.getItem("day"));
		month = parseInt(localStorage.getItem("month"));
		year = parseInt(localStorage.getItem("year"));
		contorEvent = parseInt(localStorage.getItem("contorEvent"));
		eventsArray = JSON.parse(localStorage.getItem("events"));
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
	repairContentPreview();
	pressedTodayEvent();
	addEventsOnCalendar();
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

	if(year % 4 != 0) 	return 28;
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

		if(x.style.backgroundColor == "rgb(244, 81, 30)") {
			x.style.backgroundColor = "#ffffff";
			break;
		}
	}

	for(let i = 1; i <= 42; ++i) {
		let idString = "divDate" + i;
		let x = document.getElementById(idString);

		if(parseInt(x.innerHTML.substring(0, 2)) == idx && x.style.opacity == "1") {
			x.style.backgroundColor = "rgb(244, 81, 30)";
			break;
		}
	}

	day = idx;

	let x = document.getElementById('middle');

	x.innerHTML = day + ' ' + getStringFromMonthIndex(month) + ' ' + year;
	setPreviewPage(day, month, year);
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
	repairContentPreview();
	addEventsOnCalendar();
}

function repairMonth()
{
	for(let i = 1; i <= 42; ++i) {
		let idString = "divDate" + i;
		let x = document.getElementById(idString);

		x.removeEventListener("click", function() {
				colorSelectedDate(parseInt(x.innerHTML.substring(0, 2)));
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
				colorSelectedDate(parseInt(x.innerHTML.substring(0, 2)));
			});
		}
	}

	setPreviewPage(day, month, year);
	addEventsOnCalendar();
}

function repairContentPreview()
{
	contentPreview.innerHTML = "";

	let sthPrinted = false;

	for(let i = 0; i < eventsArray.length; i++)
	{
		let flag = false;

		if(eventsArray[i]._endDate._year < year ||
			(eventsArray[i]._endDate._year == year && eventsArray[i]._endDate._month < month) ||
			(eventsArray[i]._endDate._year == year && eventsArray[i]._endDate._month == month && eventsArray[i]._endDate._day < day))
		{
			flag = true;
		}

		if(eventsArray[i]._startDate._year > year ||
			(eventsArray[i]._startDate._year == year && eventsArray[i]._startDate._month > month) ||
			(eventsArray[i]._startDate._year == year && eventsArray[i]._startDate._month == month && eventsArray[i]._startDate._day > day))
		{
			flag = true;
		}

		if(flag == false)
		{
			sthPrinted = true;

			contentPreview.innerHTML += "Event ID: " + eventsArray[i]._id + "<br>";
			contentPreview.innerHTML += "Start Date: " + eventsArray[i]._startDate._day + "-";
			contentPreview.innerHTML += eventsArray[i]._startDate._month + "-" + eventsArray[i]._startDate._year + "<br>";
			contentPreview.innerHTML += "End Date: " + eventsArray[i]._endDate._day + "-";
			contentPreview.innerHTML += eventsArray[i]._endDate._month + "-" + eventsArray[i]._endDate._year + "<br><br>";
		}
	}

	if(!sthPrinted)
	{
		contentPreview.innerHTML = "Nothing to display for today <br>"
	}
}

function getStringFromMonthIndex(idx)
{
	if(idx == 1)  return 	"January"	;
	if(idx == 2)  return 	"February"	;
	if(idx == 3)  return 	"March"		;
	if(idx == 4)  return 	"April"		;
	if(idx == 5)  return 	"May"		;
	if(idx == 6)  return 	"June"		;
	if(idx == 7)  return 	"July"		;
	if(idx == 8)  return 	"August"	;
	if(idx == 9)  return 	"September"	;
	if(idx == 10) return 	"Octomber"	;
	if(idx == 11) return 	"November"	;
	if(idx == 12) return 	"December"	;
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

function setPreviewPage(day, month, year)
{
	preview.innerHTML = "<h1>Plan for: " + day + " " + getStringFromMonthIndex(month) + " " + year + "</h1>";

	repairContentPreview();
}

function addFormAdd()
{
	formAdd.style.visibility = "visible";
}

function pressedResetEvent()
{
	contorEvent = 0;
	eventsArray = [];
	window.localStorage.clear();
	addEventsOnCalendar();
	repairContentPreview();
}

function pressedDeleteEvent()
{
	let deletedId = prompt("ID Event to delete:" );

	if(isNaN(deletedId) || !(!isNaN(deletedId) && 0 <= parseInt(deletedId) && parseInt(deletedId) <= contorEvent))
	{
		alert("ID-ul introdus este gresit.");
	}
	else {
		for(let i = 0; i < eventsArray.length; i++)
		{
			if(eventsArray[i]._id == deletedId)
			{
				eventsArray[i] = eventsArray[eventsArray.length - 1];
				eventsArray.pop();
				alert("Event Deleted with success");
				repairContentPreview();
				addEventsOnCalendar();
				return ;
			}
		}

		alert("Event ID not found");
	}
}

function pressedModifyEvent()
{
	let newStartDate, 	dayStart, 	monthStart, yearStart, 	startInput	;
	let newEndDate, 	dayEnd, 	monthEnd, 	yearEnd, 	endInput	;

	let modifiedId = prompt("ID Event to modify: ");

	if(isNaN(modifiedId) || !(!isNaN(modifiedId) && 0 <= parseInt(modifiedId) && parseInt(modifiedId) <= contorEvent))
	{
		alert("ID-ul introdus este gresit.");
	}
	else {
		for(let i = 0; i < eventsArray.length; i++)
		{
			if(eventsArray[i]._id == modifiedId)
			{
				newStartDate = prompt("Start date: ");
					
				startInput = newStartDate;

				if(startInput != null && startInput.length != 10) 
				{
					alert("Wrong date format");
					return ;
				}

				if(startInput != null && (startInput.charAt(2) != '/' || startInput.charAt(5) != '/'))
				{
					alert("Wrong date format");
					return ;
				}

				if(startInput != null)
				{
					dayStart = startInput.substr(0, 2);
					monthStart = startInput.substr(3, 2);
					yearStart = startInput.substr(6, 4);
				}

				if(startInput != null && (isNaN(dayStart) || isNaN(monthStart) || isNaN(yearStart)))
				{
					alert("Wrong date format");
					return ;
				}

				newEndDate = prompt("End date: ");

				endInput = newEndDate;

				if(endInput != null && endInput.length != 10) 
				{
					alert("Wrong date format");
					return ;
				}

				if(endInput != null && (endInput.charAt(2) != '/' || endInput.charAt(5) != '/'))
				{
					alert("Wrong date format");
					return ;
				}

				if(endInput != null)
				{
					dayEnd = endInput.substr(0, 2);
					monthEnd = endInput.substr(3, 2);
					yearEnd = endInput.substr(6, 4);
				}

				if(endInput != null && (isNaN(dayEnd) || isNaN(monthEnd) || isNaN(yearEnd)))
				{
					alert("Wrong date format");
					return ;
				}

				if(newStartDate == null && newEndDate == null) {
					alert("Event not modified!");
					return ;
				}

				if(newStartDate != null)
				{
					eventsArray[i]._startDate._day = parseInt(dayStart);
					eventsArray[i]._startDate._month = parseInt(monthStart);
					eventsArray[i]._startDate._year = parseInt(yearStart);
				}

				if(newEndDate != null)
				{
					eventsArray[i]._endDate._day = parseInt(dayEnd);
					eventsArray[i]._endDate._month = parseInt(monthEnd);
					eventsArray[i]._endDate._year = parseInt(yearEnd);
				}

				alert("Event modified with succes!");
				repairContentPreview();
				addEventsOnCalendar();
				return ;
			}
		}
	}
}

function addEventsOnCalendar()
{
	let tempDay = day;
	day = 0;

	for(let i = 1; i <= 42; ++i) 
	{
		let idString = 'divDate' + i;
		let x = document.getElementById(idString);
		let sthPrinted = 0;
		let printedDay = parseInt(x.innerHTML.substring(0, 2));
		x.innerHTML = printedDay;

		if(x.style.opacity == "1")
		{
			day++;

			for(let i = 0; i < eventsArray.length; i++)
			{
				let flag = false;

				if(eventsArray[i]._endDate._year < year ||
					(eventsArray[i]._endDate._year == year && eventsArray[i]._endDate._month < month) ||
					(eventsArray[i]._endDate._year == year && eventsArray[i]._endDate._month == month && eventsArray[i]._endDate._day < day))
				{
					flag = true;
				}

				if(eventsArray[i]._startDate._year > year ||
					(eventsArray[i]._startDate._year == year && eventsArray[i]._startDate._month > month) ||
					(eventsArray[i]._startDate._year == year && eventsArray[i]._startDate._month == month && eventsArray[i]._startDate._day > day))
				{
					flag = true;
				}

				if(flag == false && sthPrinted < 3)
				{
					sthPrinted++;

					let divEvent = document.createElement('div');
					divEvent.style.backgroundColor = eventsArray[i]._color;
					divEvent.innerHTML = "Event ID: " + eventsArray[i]._id;
					x.appendChild(divEvent);
				}
			}
		}

		if(!sthPrinted && x.style.opacity == "1")
		{
			let divEvent = document.createElement('div');
			divEvent.style.backgroundColor = "green";
			divEvent.innerHTML = "Nothing";
			x.appendChild(divEvent);
		}
	}

	day = tempDay;
}

function pressedSendAddEvent()
{
	let startInput = document.getElementById('dateStart').value;
	let endInput = document.getElementById('dateEnd').value;
	
	if(startInput.length != 10 || endInput.length != 10) {
		alert("Wrong date format!");
		return ;
	}

	if(startInput.charAt(2) != '/' || startInput.charAt(5) != '/' ||
	   endInput.charAt(2) != '/' || endInput.charAt(5) != '/') {
		alert("Wrong date format");
		return ;
	}

	let dayStart = startInput.substr(0, 2);
	let monthStart = startInput.substr(3, 2);
	let yearStart = startInput.substr(6, 4);

	let dayFinish = endInput.substr(0, 2);
	let monthFinish = endInput.substr(3, 2);
	let yearFinish = endInput.substr(6, 4);

	if(isNaN(dayStart) || isNaN(monthStart) || isNaN(yearStart) ||
		isNaN(dayFinish) || isNaN(monthFinish) || isNaN(yearFinish)) {
		alert("Wrong date format");
		return ;
	}

	let newEventDate = new eventObject;
	newEventDate._startDate = new dateObject;
	newEventDate._endDate = new dateObject;

	newEventDate._startDate._day = parseInt(dayStart);
	newEventDate._startDate._month = parseInt(monthStart);
	newEventDate._startDate._year = parseInt(yearStart);

	newEventDate._endDate._day = parseInt(dayFinish);
	newEventDate._endDate._month = parseInt(monthFinish);
	newEventDate._endDate._year = parseInt(yearFinish);

	if(newEventDate._endDate._year < newEventDate._startDate._year)
	{
		alert("Wrong date");
		return ;
	}

	if(newEventDate._endDate._year == newEventDate._startDate._year &&
		newEventDate._endDate._month < newEventDate._startDate._month)
	{
		alert("Wrong date");
		return ;
	}

	if(newEventDate._endDate._year == newEventDate._startDate._year &&
		newEventDate._endDate._month == newEventDate._startDate._month &&
		newEventDate._endDate._day < newEventDate._startDate._day)
	{
		alert("Wrong date");
		return ;
	}

	newEventDate._id = contorEvent;
	++contorEvent;
	let e = document.getElementById("ddlViewBy");
	newEventDate._color = e.options[e.selectedIndex].value;

	eventsArray.push(newEventDate);

	alert("Event added!");
	formAdd.style.visibility = "hidden";

	repairContentPreview();
	addEventsOnCalendar();
}

function pressedTodayEvent()
{
	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	let yyyy = today.getFullYear();

	day = parseInt(dd);
	month = parseInt(mm);
	year = parseInt(yyyy);

	repairMonth();
	colorSelectedDate(day);
}

function pressedCancelAddEvent()
{
	formAdd.style.visibility = "hidden";
}






$(document).ready(function() {
	startup();

	formAdd.style.visibility = "hidden";
	
	leftArr.addEventListener("click", function() {
		changeMonth(-1);
	});

	rightArr.addEventListener("click", function() {
		changeMonth(1);
	});

	add.addEventListener("click", function() {
		addFormAdd();
	});
});

setInterval(updateLocalStorage, 3000);