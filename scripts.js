// Older version of counting down time that is stopped by the browser in certain circumstances, such as tabbing in and out or scrolling past a predetermined point on the page
// function timer(seconds) {
// 	setInterval(function() {
// 		seconds--;
// 	}, 1000);
// }

let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	clearInterval(countdown); // Clears any existing timer before starting a new one

	const now = Date.now(); // New static method for getting a time stamp in milliseconds
	const then = now + seconds * 1000;
	displayTimeLeft(seconds); // Displays time count once before beginning the countdown
	displayEndTime(then); // Without intervention, displays time in UTC
	// console.log({now, then});

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return; // Stops the countdown
		}
		// console.log(secondsLeft); // Set-interval waits for a second before displaying the time
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60); // Floor gets the lower end of the given number
	const remainderSeconds = seconds % 60;
	const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`; // Pads the timer with a zero if the seconds count is within single digits
	document.title = display; // Add the timer to the tab title
	timerDisplay.textContent = display;
	// console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hours = end.getHours();
	const adjustedHours = hours > 12 ? hours - 12 : hours; // Converts UTC to standard time
	const minutes = end.getMinutes();
	endTime.textContent = `Returning at ${adjustedHours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
	const seconds = parseInt(this.dataset.time); // Converts the string of the seconds amount into a number
	// console.log(seconds);
	timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	// console.log(mins);
	timer(mins * 60);
	this.reset(); // Clears entry after inputting it
});