// Would be good to put these variables inside the document.ready function so as to keep them off the global scope.
// Also, it might be useful to store the questions/answers as objects so that it's easier to understand
// what values are what.
var questions_answers =[["Scotch is made in which country?", "Scotland","Ireland","America"],["Which of the following is not true for Bourbon", "Made in America", "At least 51% wheat", "Fermented with Bald Eagles tears"],["Whiskey is made with which of the following?","Love","Beer","Oranges"]];
var responses = [];

$( document ).ready(function() {
	var index = 0;
	var countdownTimer = {
		time : 15,
		reset: function() {
			this.time = 15;
			// totally fine to use native dom APIs over jQuery if you want,
			// but I'd suggest that you keep it consistent across your code.
			document.getElementById('seconds').innerHTML = this.time;
		},
		start: function() {
			// since you aren't declaring counter anywhere, this variable ends up being placed on the global scope 😮
			counter = setInterval(countdownTimer.count, 1000);	
		},
		stop: function() {
			clearInterval(counter);
		},
		count: function() {
				countdownTimer.time--;
				// console.log is great for development, but try to keep them out of your production code.
				// console.log(countdownTimer.time);
			if (countdownTimer.time >= 0) {
				$('#seconds').html(countdownTimer.time);
			}
			else {
				index++;
				responses.push(0);
				countdownTimer.reset();
				if (index < questions_answers.length) {
					loadQuestion(index);
				} else {
					$(".answer").hide();
					showScore();
				}
			}
		}
	};

function loadQuestion(questionSelection) {
	// console.log(questionSelection);
	countdownTimer.reset();
  $("#questions").html(questions_answers[questionSelection][0]);
  $("#a").html(questions_answers[questionSelection][1]).show();
  $("#b").html(questions_answers[questionSelection][2]).show();
  $("#c").html(questions_answers[questionSelection][3]).show();
}	

function getAnswer() {

//  nextQuestion();
	$('.answer').on('click', function() {
	  // console.log('alert', index);
		index++;
		// console.log('click', index);

		// emptying out the html for the below elements is unnecessary since loadQuestions
		// will be replacing the html anyways.
		// $("#questions").html('');
		// $("#a").html('');
		// $("#b").html('');
		// $("#c").html('');
		loadQuestion();
	})
}

function showScore() {
	var correct = 0;
	var incorrect = 0;
	var key_list = [1,3,2];
	/*Count correct and incorrect answers*/
	// By scoring this way, the user can only ever get the first 3 questions correct.
	// So if a user restarts the quiz, their new answers will never get scored.
	for(i=0; i<responses.length; i++) {
		if(responses[i] === key_list[i]) {
			correct += 1;
		}
		else {
			incorrect += 1;
		}

	}
	$('#questions').html("Here's how you did!");
	$('#a').html(correct);
	$('#correct_answers').html("Correct")
	$('#b').html(incorrect);
	$('#incorrect_answers').html("Incorrect")
	$('#c').html('Good Job');	
	$('#hidden').html("Drink more Whiskey")
	// console.log("Correct:" + correct);
	countdownTimer.stop();
	$('#seconds').empty();
	$('#start_button').show();
}

$('#start_button').on('click', function() {
	index = 0;
	$(this).hide();
	countdownTimer.start();
 	loadQuestion(index);
});

$('.answer').on('click', function() {
	e = $(this).attr("value");
	responses.push(parseInt(e));
	// console.log(e);
	// console.log(responses);
 	index++;
 	if (index < questions_answers.length) {
 		// nitpicky comment - try to keep your indentation consistent across your files as it makes it much easier to 
 		// parse through the code and understand what code is nested within certain blocks.
	 	loadQuestion(index);
 	} else {
 		/*$(".answer").hide();*/
 		showScore();
 	}
});

});