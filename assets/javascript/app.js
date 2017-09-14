var questions_answers =[["Scotch is made in which country?", "Scotland","Ireland","America"],["Which of the following is not true for Bourbon", "Made in America", "At least 51% wheat", "Fermented with Bald Eagles tears"],["Whiskey is made with which of the following?","Love","Beer","Oranges"]];
var responses = [];

$( document ).ready(function() {
	var index = 0;
	var countdownTimer = {
		time : 15,
		reset: function() {
			this.time = 15;
			document.getElementById('seconds').innerHTML = this.time;
		},
		start: function() {
			counter = setInterval(countdownTimer.count, 1000);	
		},
		stop: function() {
			clearInterval(counter);
		},
		count: function() {
				countdownTimer.time--;
				console.log(countdownTimer.time);
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
	console.log(questionSelection);
	countdownTimer.reset();
  $("#questions").html(questions_answers[questionSelection][0]);
  $("#a").html(questions_answers[questionSelection][1]).show();
  $("#b").html(questions_answers[questionSelection][2]).show();
  $("#c").html(questions_answers[questionSelection][3]).show();
}	

function getAnswer() {

//  nextQuestion();
	$('.answer').on('click', function() {
	  console.log('alert', index);
		index++;
		console.log('click', index);
		$("#questions").html('');
		$("#a").html('');
		$("#b").html('');
		$("#c").html('');
		loadQuestion();
	})
}

function showScore() {
	var correct = 0;
	var incorrect = 0;
	var key_list = [1,3,2];
	/*Count correct and incorrect answers*/
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
	console.log("Correct:" + correct);
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
	console.log(e);
	console.log(responses);
 	index++;
 	if (index < questions_answers.length) {
 	loadQuestion(index);
 	} else {
 		/*$(".answer").hide();*/
 		showScore();
 	}
});

});