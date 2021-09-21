// global dayjs
// global Tweakpane
// global p5
let time
let hr, min, sec

function getTime() {
	return dayjs().format('YYYY-MM-DD HH:mm:ss Z')
}

function getTimeAsArray() {
	return [dayjs().format('HH'), dayjs().format('mm'), dayjs().format('ss')]
}

function loop() {
	time = getTime()
	requestAnimationFrame(loop)
}

loop()

function setup() {
	[hr, min, sec] = getTimeAsArray()

	createCanvas(windowWidth, windowHeight);
	background(255);
	angleMode(DEGREES)
	for (let i = 0; i <= 25; i++) {
		inner.push(180 + random(30, 300))
		newinner.push(220)
		strokeW.push(5)
		newstrokeW.push(10)
		speed.push(random(0.03, 0.08))
		ringPlace.push(220)
		ringPlaceNew.push(220)
	}
	for (let j = 0; j <= 120; j++) {
		ddd[j] = random(5);
	}
	makenewddd()
}

let grider = 15;
let radi, ddd = [];
let newddd = [];
let gridPlace = []
let ringPlace = []
let ringPlaceNew = []
let speed = []
let strokeW = []
let newstrokeW = []
let offSpeed = []
let inner = []
let newinner = []
let color = ["#db3a34", "#363537", "#82DDF0", "#2FBF71", "#f9e900", "#fc440f", "#1f01b9", "#0e131f", "#ffcae9", "#56e39f"]

function draw() {
	background(255)
	translate(width / 2, height / 2)
	strokeCap(SQUARE);
	noFill()

	// update lerp
	for (let i = 0; i <= 10; i++) {
		inner[i] = lerp(inner[i], newinner[i], speed[i])
		strokeW[i] = lerp(strokeW[i], newstrokeW[i], speed[i])
		ringPlaceNew[i] = lerp(ringPlaceNew[i], ringPlace[i], random(speed))
	}

	updateddd()

	// 	ring
	for (let i = 0; i <= 25; i++) {
		push()
		fill('#000')
		rotate(frameCount / (20 / i))
		for (let j = 0; j <= 30; j++) {
			noStroke()
			if (frameCount % 100 == 1) {
				makenewddd()
			}
			circle(ringPlaceNew[i] / 2 * sin(j * 12), ringPlaceNew[i] / 2 * cos(j * 12), ddd[j])
		}
		pop()
	}

	push()

	if (mouseIsPressed) {
		push()
		translate(-width / 2, -height / 2)
		for (let i = 0; i <= 25; i++) {
			newinner[i] += (width / 2 - mouseX + (-height / 2 + mouseY)) * i / 1000
		}
		// for (let i = 0; i < width; i += grider) {
		// 	for (let j = 0; j < height; j += grider) {
		// 		noStroke()
		// 		fill(gridPlace[i][j])
		// 		rect(i, j, grider, grider)
		// 	}
		// }
		pop()

	} else {
		blendMode(MULTIPLY)
	}

	noStroke()
	fill(255)
	circle(0, 0, 250)

	noFill()
	// 	normal clock
	// 	hour
	push()
	stroke(0)
	strokeWeight(3)
	line(0, 0, 40 * sin(180 - hr * 6), 40 * cos(180 - hr * 6))
	pop()
	// 	minute
	push()
	stroke(0)
	strokeWeight(2)
	line(0, 0, 50 * sin(180 - min * 6), 50 * cos(180 - min * 6))
	pop()
	// 	second
	push()
	stroke(0)
	strokeWeight(1)
	line(0, 0, 60 * sin(180 - sec * 6), 60 * cos(180 - sec * 6))
	pop()

	// 	clock
	// 	taiwan-hour
	push()
	strokeWeight(strokeW[0])
	rotate(frameCount / offSpeed[0])
	stroke(color[1])
	arc(0, 0, inner[3], inner[3], (0 * 15 - 90), (-90 + (hr + 12) * 15))
	pop()
	// 	newyork-hour
	push()
	strokeWeight(strokeW[1])
	rotate(frameCount / offSpeed[1])
	stroke(color[2])
	arc(0, 0, inner[2], inner[2], (0 * 15 - 90), (-90 + hr * 15))
	pop()
	// 	minute
	push()
	strokeWeight(strokeW[2])
	rotate(frameCount / offSpeed[2])
	stroke(color[3])
	arc(0, 0, inner[1], inner[1], (0 * 6 - 90), (-90 + min * 6))
	pop()
	// 	second
	push()
	strokeWeight(strokeW[3])
	rotate(frameCount / offSpeed[3])
	stroke(color[4])
	arc(0, 0, inner[0], inner[0], (0 * 6 - 90), (-90 + sec * 6))
	pop()

	// 	newyork
	// 	newyork-wake
	push()
	rotate(-(hr * 15 + (min / 60) * 15))
	// 	newyork-sleep
	push()
	strokeWeight(strokeW[5])
	rotate(frameCount / offSpeed[5])
	stroke(color[7])
	arc(0, 0, inner[4], inner[4], (2 * 15 - 90), (10 * 15 - 90));
	pop()
	// 	newyork-work
	push()
	strokeWeight(strokeW[6])
	rotate(frameCount / offSpeed[6])
	stroke(color[5])
	arc(0, 0, inner[5], inner[5], (12 * 15 - 90), (18 * 15 - 90));
	stroke(color[6])
	arc(0, 0, inner[6], inner[6], (18 * 15 - 90), (2 * 15 - 90));
	arc(0, 0, inner[6], inner[6], (10 * 15 - 90), (12 * 15 - 90));
	pop()
	pop()

	// 	taiwan	
	// 	taiwan-wake
	noFill()
	push()
	rotate(-((hr + 12) * 15 + (min / 60) * 15))
	// 	taiwan-sleep
	push()
	strokeWeight(strokeW[8])
	rotate(frameCount / offSpeed[8])
	stroke(color[8])
	arc(0, 0, inner[8], inner[8], (20 * 15 - 90), (8 * 15 - 90))
	pop()
	// taiwan-work
	push()
	strokeWeight(strokeW[9])
	rotate(frameCount / offSpeed[9])
	stroke(color[9])
	arc(0, 0, inner[7], inner[7], (9 * 15 - 90), (18 * 15 - 90))
	stroke('#f00')
	arc(0, 0, inner[9], inner[9], (8 * 15 - 90), (9 * 15 - 90))
	arc(0, 0, inner[9], inner[9], (18 * 15 - 90), (20 * 15 - 90))
	pop()
	pop()
	pop()

	// 	newyork date (monday-saturday 360/7=51.4)
	// 	taiwan date (monday-saturday 360/7=51.4)
}

function mousePressed() {
	for (let i = 0; i <= 25; i++) {
		newstrokeW[i] = (i + 1) * 15
		if (i == 0) {
			newinner[i] = 220
		} else {
			newinner[i] = newinner[i - 1] + newstrokeW[i - 1] * 0.9
		}
		ringPlace[i] = 220 + i * 80
	}

	let a = [int(random(2)), int(random(2)), int(random(2)), int(random(2))]

	for (let i = 0; i < width; i += grider) {
		gridPlace[i] = []
		for (let j = 0; j < height; j += grider) {
			if ((i / grider % 2 == a[0]) && (j / grider % 2 == a[1])) {
				gridPlace[i][j] = 0
			} else if ((i / grider % 2 == a[2]) && (j / grider % 2 == a[3])) {
				gridPlace[i][j] = 0
			} else {
				gridPlace[i][j] = 255
			}
		}
	}
}

function mouseReleased() {
	for (let i = 0; i <= 10; i++) {
		newinner[i] = 220
		ringPlace[i] = 220
		newstrokeW[i] = 10
	}
}

function makenewddd() {
	for (let j = 0; j <= 120; j++) {
		newddd[j] = random(2, 5);
	}
}

function updateddd() {
	for (let j = 0; j <= 120; j++) {
		ddd[j] = lerp(ddd[j], newddd[j], 0.1)
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}