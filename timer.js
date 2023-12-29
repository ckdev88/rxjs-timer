// dit kan allemaal net zo makkelijk compleet vanilla, maar TODO: uitwerken met bezigheden door de hele dag.
import { Observable } from 'rxjs';
export function timer() {
	let el = document.getElementById('timer');
	const currentDate = new Date();
	console.log('Active since:', currentDate.toDateString());

	const initialTimerStart = 0;
	let timerSteps = 0;
	const stepUnit = 60000; // in ms
	const stepLimit = 5; // times stepUnit (minutes)
	const timerObservable = new Observable((observable) => {
		try {
			setInterval(() => {
				observable.next((timerSteps += 1));
			}, stepUnit);
		} catch {
			observable.error('Caught error!');
		}
	});

	const timerObserver = {
		next: (value) => {
			printToScreen(value, 'divTimer');
			if (value >= stepLimit) {
				colorBackground('red');
			}
			if (value >= stepLimit * 2) {
				colorBackground('lime');
			}
			if (value % stepLimit == 0) {
				console.log('play once!', value, value % stepLimit, value % (stepLimit * 2));
				playSound();
			}
		},
		error: (err) => {
			console.log('error:', err);
		},
		complete: () => {
			console.log('klaar!');
		},
	};
	timerObservable.subscribe(timerObserver);

	function sleep(ms) {
		return new Promise((promise) => setTimeout(promise, ms));
	}

	function printToScreen(text, createElementId = null) {
		let el = document.createElement('div');
		el.innerHTML = text;
		if (createElementId !== null) {
			el.id = createElementId;
			if (document.getElementById(createElementId) === null) {
				document.getElementById('timer').append(el);
			} else {
				document.getElementById(createElementId).innerHTML = text;
			}
		} else {
			document.getElementById('timer').append(el);
		}
	}

	function resetTimer() {
		timerSteps = initialTimerStart;
	}

	function addResetButton() {
		let el = document.createElement('button');
		el.id = 'resetTimer';
		el.innerText = 'Reset timer';
		document.getElementById('timer').append(el);

		document.getElementById('resetTimer').addEventListener('click', () => {
			console.log('click reset');
			colorBackground('black');
			resetTimer();
		});
	}
	addResetButton();

	const playSound = () => {
		// TODO: find out why sometimes it plays twice, the second quickly after the first started playing
		const audio = new Audio('siren1.wav');
		audio.play();
	};

	const colorBackground = (magicColor = 'black') => {
		document.body.style.backgroundColor = magicColor;
	};
}
