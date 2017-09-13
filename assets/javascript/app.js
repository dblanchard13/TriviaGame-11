
/*Variables*/
var count=16;
var i = 0;
var questions=["Scotch is made in which country?", "In order to be Bourbon, which of the following must be true?","Whiskey is made with which of the following?"];
var answers =[["Scotland","Ireland","America"],["Made in America", "Be at least 51% wheat", "Fermented with the tears of Bald Eagles"],["Love","Beer","Oranges"]]
var counter;


/*Functions*/

function timer() {
	count=count-1;
	if (count <= 0) {
		clearInterval(counter);
		return printQuestion;
	}
	document.getElementById("seconds").innerHTML=count;
 	$("#start_button").on("click", function quiz() {
		clearInterval(counter);
		counter=setInterval(timer, 1000); //1000 will  run it every 1 second
		printQuestion(questions);
	}) //end on.click event
} //end function timer()

function printQuestion(questions) {
	if(i===questions.length) {
		return results();
	}
	document.getElementById("questions").innerHTML=questions[i];
	document.getElementById("a").innerHTML=answers[i][0];
	document.getElementById("b").innerHTML=answers[i][1];
	document.getElementById("c").innerHTML=answers[i][2];
	i += 1;
} //end function printQuestions()

function results() {
	$("#start_button").show();
	document.getElementById("questions").innerHTML="Here's how you did!";
	document.getElementById("a").innerHTML=correct;
	document.getElementById("b").innerHTML=incorrect;
	document.getElementById("c").innerHTML=";
} //end function results()


//Click to start quiz
$("#start_button").on("click", function quiz() {
	$("#start_button").hide();
	i = 0;
	clearInterval(counter);
	counter=setInterval(timer, 1000); //1000 will  run it every 1 second
	printQuestion(questions);
}) //end on.click event
