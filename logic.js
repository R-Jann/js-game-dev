//console.log("hello world");

// variables for 2d array, score, row, and column.

let board;
let score = 0;
let rows = 4;
let column = 4;
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

function setGame(){
	board = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
		];
	for(let r=0;r < rows;r++){
		for(let c=0; c<column;c++){
		// 	console.log(`[r${r}-c${c}]`);
			let tile = document.createElement("div");
			tile.id = r.toString()+"-"+ c.toString();

			let num = board[r][c];

			UpdateTile(tile,num);

			document.getElementById("board").append(tile);
		 }
	}

	setTwo();
	setTwo();
}

function UpdateTile(tile,num){
	tile.innerText = "";
	tile.classList = "";
	tile.classList.add("tile");

	if(num > 0){
		tile.innerText = num.toString();

		if(num<=4096){
			tile.classList.add("x"+num.toString());
		}
		else{
			tile.classList.add("x8192");
		}
	}
}

// setGame();
// event trigger when webpage finish loading 
window.onload = function(){
	setGame();
}

// "e" represents event object, which contains information about the event.
function handleSlide(e){

	console.log(e.code);

	if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.code)){
		e.preventDefault();

		if(e.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if(e.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if(e.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if(e.code == "ArrowDown"){
			slideDown();
			setTwo();
		}

		document.getElementById("score").innerText=score;

		setTimeout(()=>{
		if(hasLost())
			{
				alert("GameOver");
				restartGame();
				alert("press any arrow Key");
			}
		checkWin();
		},100);
	}
}

document.addEventListener("keydown",handleSlide);
//para if bisan magkalayo sila pwede mag merge
function filterZero(tiles){
	return tiles.filter(num => num!=0);
}

//sliding and merging slides
function slide(tiles){
	tiles = filterZero(tiles);
	for(let i=0;i<tiles.length;i++){
		if(tiles[i] == tiles[i+1]){
			tiles[i]*=2;
			tiles[i+1] =0;

			score += tiles[i];
		}
	}

	tiles= filterZero(tiles);
	while(tiles.length<4){
		tiles.push(0);
	}

	return tiles;
}

function slideLeft(){
	for(let r=0;r<rows;r++){

		let row = board[r];
		//animation
		let originalRow = row.slice();

		row = slide(row);
		board[r]=row;

		for(let c=0;c<column;c++){
			let tile = document.getElementById(r.toString()+"-"+c.toString());
			let num = board[r][c];

			//line for animation
			if(originalRow[c] != num && num !== 0){
				tile.style.animation = "slide-from-right 0.3s";

				setTimeout(() => {
					tile.style.animation = "";
				},300);
			}


			UpdateTile(tile,num);
		}
	}
}

function slideRight(){
	for(let r=0;r<rows;r++){
	
		let row = board[r];

		let originalRow = row.slice();
		
		row.reverse();
		row = slide(row);
		row.reverse();
		board[r]=row;

		for(let c=0;c<column;c++){
			let tile = document.getElementById(r.toString()+"-"+c.toString());
			let num = board[r][c];

			if(originalRow[c] != num && num !== 0){
				tile.style.animation = "slide-from-left 0.3s";

				setTimeout(() => {
					tile.style.animation = "";
				},300);
			}

			UpdateTile(tile,num);
		}
	}
}

function slideUp(){
	for(let c=0;c<column;c++){

		let col = [board[0][c],board[1][c],board[2][c],board[3][c]];

		let originalCol = col.slice();

		col = slide(col);


		for(let r=0;r<rows;r++){

			board[r][c] = col[r];

			let tile = document.getElementById(r.toString()+"-"+c.toString());
			let num = board[r][c];

			if(originalCol[r] != num && num !== 0){
				tile.style.animation = "slide-from-bottom .3s";

				setTimeout(() => {
					tile.style.animation = "";
				},300);
			}

			UpdateTile(tile,num);

		}
	}
}

function slideDown(){
	for(let c=0;c<column;c++){

		let col = [board[0][c],board[1][c],board[2][c],board[3][c]];
		let originalCol = col.slice();
		col.reverse();
		col = slide(col);
		col.reverse();

		for(let r=0;r<rows;r++){

			board[r][c] = col[r];

			let tile = document.getElementById(r.toString()+"-"+c.toString());
			let num = board[r][c];

			if(originalCol[r] != num && num !== 0){
				tile.style.animation = "slide-from-top .3s";

				setTimeout(() => {
					tile.style.animation = "";
				},300);
			}

			UpdateTile(tile,num);

		}
	}
}


//start has emptyTile. check if it doesnt contain anything or value is 0

function hasEmptyTile(){
	for(let r=0; r<rows; r++){
		for(let c=0;c<column;c++){
			if(board[r][c] == 0){
				return true;
			}
		}
	}	
	return false;
}

function setTwo(){

	if(!hasEmptyTile()){
		return;
	}
	let found = false;

	while(!found){
		let r = Math.floor(Math.random()* rows);
		let c = Math.floor(Math.random()* column);

		if(board[r][c] == 0){
			board[r][c] = 2;
			let tile = document.getElementById(r.toString()+"-"+c.toString());
			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}
}

function checkWin(){
	for(let r = 0 ; r<rows; r++){
		for(let c; c<column; c++){
			if(board[r][c] == 2048 && is2048Exist == false){
				alert("You Win! You Got 2048");
				is2048Exist = true;
			}

			else if(board[r][c] == 4096 && is4096Exist == false){
				alert("You are unstoppable at 4096! You are fantastically unstoppable!");
				is4096Exist = true;
			}

			else if(board[r][c] == 8192 && is8192Exist == false){
				alert("Victory! Chicken Dinner");
				is8192Exist = true;
			}

		}
	}
}

function hasLost(){
	for(let r = 0 ; r<rows; r++){
		for(let c = 0; c<column; c++){
			if(board[r][c] == 0){
				return false;
			}

			const currentTile = board[r][c];

			if(r > 0 && board[r-1][c] === currentTile ||
				r < rows -1 && board[r+1][c] === currentTile||

				c > 0 && board[r][c-1] === currentTile ||
				c < column -1 && board[r][c+1] === currentTile)
			{
				
				return false;
			}
		}
	}

	return true;
}

function restartGame(){
	board = [
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0],
	[0,0,0,0]
		];

	setTwo();
	score = 0;
}

// for mobile devices
let startX = 0;
let startY = 0;

document.addEventListener("touchstart",(e)=> {
	startX = e.touches[0].clientX;
	startY = e.touches[0].clientY;

	// console.log(startX);
	// console.log(startY);
})

document.addEventListener("touchmove",(e)=>{
	if(!e.target.className.includes("tile")){
		return
	}
	e.preventDefault();
},{passive:false});


document.addEventListener("touchend",(e)=>{

	if(!e.target.className.includes("tile")){
		return;
	}
	let diffX = startX - e.changedTouches[0].clientX;
	let diffY = startY - e.changedTouches[0].clientY;

	console.log(diffX);
	console.log(diffY);

	if(Math.abs(diffX) > Math.abs(diffY))
	{
		if(diffX>0)
		{
			slideLeft();
			setTwo();
		}
		else
		{
			slideRight();
			setTwo();
		}
	}
	else
	{
		if(diffY> 0 )
		{
			slideUp();
			setTwo();
		}
		else
		{
			slideDown();
			setTwo();
		}
	}

	document.getElementById("score").innerText = score;
	
	setTimeout(()=>{
		if(hasLost())
			{
				alert("GameOver");
				restartGame();
				alert("press any arrow Key");
			}
		checkWin();
		},100);
})