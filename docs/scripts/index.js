let time = 0;
let stars = [];
let width, height;

class Star {
	constructor() {
		this.x = random(0, width);
		this.y = random(0, height);
		this.brightness = random(0, 255);
		this.inc = random(3, 5);
		if (random() < 0.5)
			this.inc *= -1;
	}

	display() {
		fill(255, 255, 255, this.brightness);
		noStroke();
	  	circle(this.x, this.y, 1.5);

		this.brightness += this.inc;

		if (this.brightness >= 255) {
			this.inc *= -1;
		}
		else if (this.brightness <= 0) {
			this.inc *= -1;
			this.x = random(0, width);
			this.y = random(0, height);
		}
	}
}

function setup() {
	width = windowWidth;
	height = 500;
	createCanvas(windowWidth - 17, 500);

	for (let a = 0; a < 50; ++a)
		stars.push(new Star());

	requestAnimationFrame(draw);
}

function draw() {
	// Background.

	clear();

	fill(0);
	rect(0, 0, width, height);

	noStroke();

	let clr = (Math.sin(time) * 50) + 10;
	for (let d = (clr + 150); d >= 0; d -= 1) {
		fill(128 - (d / (clr + 150)) * 128);
		circle(0, 0, d * (height / 50));
	}

	time += 0.005;

	// Stars and cursor lines.

	for (let a = 0; a < stars.length; ++a) {
		stars[a].display();
		
		if (a % 2 == 0 && dist(stars[a].x, stars[a].y, mouseX, mouseY) < 200) {
			stroke(255);
			strokeWeight(2);
			line(stars[a].x, stars[a].y, mouseX, mouseY);
		}
	}

	requestAnimationFrame(draw);
	DelayNode(0.02);
}