var CalorieCalculator = (function calculator() {

	"use strict";

	function bmrCalculate(weight, height, age, gender) {
		if (gender === 'male') {
			return 10 * weight + 6.25 * height - 5 * age + 5;
		} else if (gender === 'female') {
			return 10 * weight + 6.25 * height - 5 * age - 161; 
		}
	}

	function chooseOption() {
		if ($(this).hasClass('maintain')) {
			$ul.remove();
			showForm.call($(this));
			option.unshift($(this));
		} else if ($(this).hasClass('gain')) {
			$p.text('How much weight (kg) do you want to gain?');
			showItems();
			option.unshift($(this));
		} else if ($(this).hasClass('lose')) {
			$p.text('How much weight (kg) do you want to lose?');
			showItems();
			option.unshift($(this));

		}
	}

	function showItems() {
		$ul.remove();
		$desiredNumber.show();
		$nextButton.show();
	}

	function buttonStyleChange() {
		if ($(this).val().match(/^\d+$/)) {
			$nextButton.addClass('active');
		} else {
			$nextButton.removeClass('active');
		}
	}

	function showForm() {
		if ($nextButton.hasClass('active') || $(this).hasClass('maintain')) {
			value = $desiredNumber.val();
			$p.text('Cool! Now, fill in your info to calculate your calories!');
			$desiredNumber.hide();
			$nextButton.hide();
			$userData.show();		
		}
	}

	function showCalorie() {
		bmrCalorie = Math.round($userExercise.val() * (bmrCalculate($userWeight.val(),$userHeight.val(),$userAge.val(),$userSex.val())));
		$userData.hide();
		if (option[0].hasClass('maintain')) {
			$p.text('To maintain your weight, you need:');
			$p.after('<h3>'+bmrCalorie+'</h3><h4>Calories per day</h4>');
		} else if (option[0].hasClass('gain')) {
			$p.text('To gain '+value+' kg, you should eat at least:');
			$p.after('<h3>'+(bmrCalorie+500)+'</h3> <h4>Calories per day for ' + value/0.5 + ' weeks');
		} else if (option[0].hasClass('lose')) {
			$p.text('To lose '+value+' kg, you should eat no more than:');
			$p.after('<h3>'+(bmrCalorie-500)+'</h3> <h4>Calories per day for ' + value/0.5 + ' weeks');
		}
		option.length = 0;
	}

	function init(opts) {
		$ul = $(opts.ul);
		$p = $(opts.p);
		$nextButton = $(opts.nextButton)
		$desiredNumber = $(opts.desiredNumber);
		$userData = $(opts.userData);
		$calculateButton = $(opts.calculateButton);
		$userExercise = $(opts.userExercise);
		$userWeight = $(opts.userWeight);
		$userHeight = $(opts.userHeight);
		$userAge = $(opts.userAge);
		$userSex = $(opts.userSex);

		$ul.on('click', 'li', chooseOption);
		$desiredNumber.bind('keyup', buttonStyleChange);
		$nextButton.bind('click', showForm);
		$calculateButton.bind('click', showCalorie);
	}

	var
		option = [],
		value,
		bmrCalorie,

		$ul,
		$p,
		$nextButton,
		$desiredNumber,
		$userData,
		$calculateButton,
		$userExercise,
		$userWeight,
		$userHeight,
		$userAge,
		$userSex,

		obj = {
			init: init
		}
	;

	return obj;

})();

$(document).ready(function(){
	CalorieCalculator.init({
		ul: "ul",
		p: "p",
		nextButton: "#next",
		desiredNumber: "#desiredNumber",
		userData: "#user-data",
		calculateButton: "#calculate",
		userExercise: "#userExercise",
		userWeight: "#userWeight",
		userHeight: "#userHeight",
		userAge: "#userAge",
		userSex: "#userSex"
	});
});