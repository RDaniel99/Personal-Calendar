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

	// 6 weeks, 7 days = 42 days (are enough)

	var divMid = document.getElementById('container-mid');
	for(var i = 0; i < 42; i++)
	{
		var newDiv = document.createElement("div");
		newDiv.style.width = "13%";
		newDiv.style.height = "100px";
		newDiv.style.display = "inline-block";
		
		if(i % 2 == 0)
		{
			newDiv.style.background = "white";
		}
		else 
		{
			newDiv.style.background = "grey";
		}

		newDiv.innerHTML += (i + 1);
		newDiv.style.color = "black";

		divMid.appendChild(newDiv);
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
