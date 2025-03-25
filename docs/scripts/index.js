let time = 0;
let stars = [];
let canvas_height = 500;

let frameCountStart = 0;
let testDuration = 10000; // 5 seconds in milliseconds
let testRunning = false;

class Star
{
	constructor()
	{
		this.x = random(0, width);
		this.y = random(0, height);
		this.brightness = random(0, 255);
		this.inc = random(3, 5);
		if (random() < 0.5)
			this.inc *= -1;
	}

	display()
	{
		noStroke();
		fill(255, 255, 255, this.brightness);
	  	circle(this.x, this.y, 1.5);

		this.brightness += this.inc;

		if (this.brightness >= 255)
		{
			this.inc *= -1;
		}
		else if (this.brightness <= 0)
		{
			this.inc *= -1;
			this.x = random(0, width);
			this.y = random(0, canvas_height);
		}
	}
}

function setup() {
	createCanvas(windowWidth - 17, 500);

	for (let a = 0; a < 50; ++a)
		stars.push(new Star());

	requestAnimationFrame(draw);

	frameCountStart = millis();
	testRunning = true;
}

function draw()
{
	background(0);

	noStroke();

	let clr = (Math.sin(time) * 50) + 160;
	let h = canvas_height / 50;
	for (let d = (clr + 150); d >= 0; d -= 1)
	{
		fill(128 - (d / clr) * 128);
		circle(0, 0, d * h);
	}

	time += 0.005;

	for (let i = 0; i < stars.length; ++i)
	{
		stars[i].display();
		
		if (i % 2 === 0)
		{
			let dx = abs(stars[i].x - mouseX);
			let dy = abs(stars[i].y - mouseY);
			if (dx + dy < 200)
			{
				stroke(255);
				strokeWeight(2);
				line(stars[i].x, stars[i].y, mouseX, mouseY);
			}
		}
	}
}