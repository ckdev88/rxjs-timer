// dit kan allemaal net zo makkelijk compleet vanilla, maar TODO: uitwerken met bezigheden door de hele dag.
import { Observable } from 'rxjs';
export function timer() {
	let el = document.getElementById('timer');
	const currentDate = new Date();
	console.log('Active since:', currentDate.toDateString());

	const initialTimerStart = 0;
	let startMinutes = 0;
	const timeLimit = 20; // in minutes
	const timerObservable = new Observable(observable => {
		try {
			setInterval(() => {
				observable.next(startMinutes += 1);
			}, 60000);
		}
		catch {
			observable.error('Caught error!');
		}
	})

	const timerObserver = {
		next: value => {
			printToScreen(value, "divTimer");
			if (value >= timeLimit) {
				colorBackground('red');
			}
			if (value >= timeLimit * 2) {
				colorBackground('lime');
			}
			if (value % timeLimit == 0) {
				console.log('play once!', value, value % timeLimit, value % (timeLimit * 2));
				playSound();
			}
		},
		error: (err) => { console.log('error:', err) },
		complete: () => { console.log('klaar!') }
	}
	timerObservable.subscribe(timerObserver);

	function sleep(ms) {
		return new Promise(promise => setTimeout(promise, ms));
	}

	function printToScreen(text, createElementId = null) {
		let el = document.createElement('div');
		el.innerHTML = text;
		if (createElementId !== null) {
			el.id = createElementId;
			if (document.getElementById(createElementId) === null) {
				document.getElementById('timer').append(el);
			}
			else {
				document.getElementById(createElementId).innerHTML = text;
			}
		}
		else {
			el.innerHTML = text;
			document.getElementById('timer').append(el);
		}
	}

	function resetStartMinutes() {
		startMinutes = initialTimerStart;
	}

	function addResetButton() {
		let el = document.createElement('button');
		el.id = "resetTimer";
		el.innerText = "Reset timer";
		document.getElementById('timer').append(el);

		document.getElementById('resetTimer').addEventListener('click', () => {
			console.log('clicked');
			colorBackground('black');
			resetStartMinutes()
		});
	}
	addResetButton();

	const playSound = () => { // TODO: find out why sometimes it plays twice, the second quickly after the first started playing
		const audio = new Audio('siren1.wav');
		audio.play();
	}

	const colorBackground = (magicColor = 'black') => {
		document.body.style.backgroundColor = magicColor;
	}
};
