var day;
var month;
var year;

var leftArr = document.getElementById('leftArrow');
var rightArr = document.getElementById('rightArrow');

function startup()
{
	var x = document.getElementById('middle');

	if(x.textContent == '')
	{
		x.textContent = '3 March';
		day = month = 3;
		year = 2019;
	}
}

function changeMonth(sign)
{
	console.log("click");
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
}

$(document).ready(function() {
	startup();
	leftArr.addEventListener("click", changeMonth(-1));
	rightArr.addEventListener("click", changeMonth(1));
});
