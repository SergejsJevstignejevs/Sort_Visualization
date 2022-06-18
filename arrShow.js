
let cols = document.getElementsByClassName("column");
let rows = document.getElementsByClassName("row");
let array = [];
let actionDelay = 100;
let tStart = 0;
let tEnd = 0;
let elemTimeElapsed = document.getElementById("time-elapsed");

//fillArrayRand(array, 20);
//addCols(array);
//drawCols();

//Column manipulation

function addCols(array){
	
	for(let i = 0; i < array.length; i++){
		
		let newCol = document.createElement("div");
		newCol.className = "column " + i;
		//let colTxt = document.createTextNode(array[i]);
		//newCol.appendChild(colTxt);
		rows[0].appendChild(newCol);
		
	}
	
}

function deleteCols(){
	
	while (rows[0].firstChild) {
		
		rows[0].removeChild(rows[0].lastChild);
		
	}
	
}

function drawCols() {
	
	let maxElemArr = maxArrayElem(array);
	
	for(i = 0; i < array.length; i++){
		
		cols[i].style.height = 100 * (array[i] / maxElemArr) + "%";
		cols[i].style.width = (rows[0].clientWidth / array.length) + "%";
		cols[i].style.backgroundColor = "#DDA0DD";
		
	}
	
}

//Array manipulation

function fillArrayRand(array, amount){
	
	clearArray(array);
	
	for(let i = 0; i < amount; i++){
		
		array[i] = Math.floor(((Math.random() * 100) + 1));
		
	}
	
}

function clearArray(array) {
	
  while (array.length) {
	
    array.pop();
	
  }
  
}

function maxArrayElem(array){
	
	maxElem = array[0];
	
	for(let i = 1; i < array.length; i++){
		
		if(array[i] > maxElem){
			
			maxElem = array[i];
			
		}
		
	}
	
	return maxElem;
	
}

async function swap(array, i, j){
	
	await sleep(actionDelay);
	
	temp = array[i];
	array[i] = array[j];
	array[j] = temp;
	
	tEnd = new Date().getTime();
	elemTimeElapsed.innerHTML = ((tEnd - actionDelay) - tStart) / 1000 + "s";
	
	drawCols();
	
}

function isAscending(array){
	
	for(let i = 0; i < array.length - 1; i++){
		
		if(array[i] > array[i + 1]){
			
			return false;
			
		}
		
	}
	
	return true;
}

function isAscendingUntil(array, range){
	
	for(let i = 0; i < range; i++){
		
		if(array[i] > array[i + 1]){
			
			return false;
			
		}
		
	}
	
	return true;
}

//Sorting algorithms

async function bubbleSort(array){
	
	for(let i = 0; i < array.length; i++){
		
		for(let j = 0; j < array.length - i - 1; j++){
			
			if(array[j] > array[j + 1]){
				
				cols[j].style.backgroundColor = "#7600A9";
				cols[j + 1].style.backgroundColor = "#7600A9";
				await swap(array, j, j + 1);
				
			}
		
		}
		
	}
	
	document.getElementById("sort-button").disabled = false;
	document.getElementById("set-array-size-button").disabled = false;
	
}


async function insertionSort(array){
	

    for (let i = 1; i < array.length; i++) 
    {
		
		for(let j = i - 1; j >= 0; j--){
			
			if(array[j] > array[j + 1]){
				
				cols[j].style.backgroundColor = "#7600A9";
				cols[j + 1].style.backgroundColor = "#7600A9";
				await swap(array, j, j + 1);
				
			}
			else{
				
				break;
				
			}
			
		}
        
    }
	
	document.getElementById("sort-button").disabled = false;
	document.getElementById("set-array-size-button").disabled = false;
	
}

async function selectionMinSort(array){
	
	for(let i = 0; i < array.length; i++){
		
		let minIndex = i;
		
		for(let j = i + 1; j < array.length; j++){
			
			if(array[j] < array[minIndex]){
				
				minIndex = j;
				
			}
		
		}
		
		if(minIndex != i){
			
			cols[i].style.backgroundColor = "#7600A9";
			cols[minIndex].style.backgroundColor = "#7600A9";
			await swap(array, minIndex, i);
			
		}
		
	}
	
	document.getElementById("sort-button").disabled = false;
	document.getElementById("set-array-size-button").disabled = false;
	
}

async function selectionMaxSort(array){
	
	for(let i = array.length - 1; i >= 0; i--){
		
		let maxIndex = i;
		
		for(let j = 0; j < i; j++){
			
			if(array[j] > array[maxIndex]){
				
				maxIndex = j;
				
			}
		
		}
		
		if(maxIndex != i){
			
			cols[i].style.backgroundColor = "#7600A9";
			cols[maxIndex].style.backgroundColor = "#7600A9";
			await swap(array, maxIndex, i);
			
		}
		
	}
	
	document.getElementById("sort-button").disabled = false;
	document.getElementById("set-array-size-button").disabled = false;
	
}

async function minMaxSort(array){
	
	for(let l = 0, r = array.length - 1; l < r;){
		
		let minIndex = l; //l - left
		let maxIndex = r; //r - right
		
		for(let i = l; i <= r; i++){
			
			if(array[i] < array[minIndex]){
				
				minIndex = i;
				
			}
			
			if(array[i] > array[maxIndex]){
				
				maxIndex = i;
				
			}
		
		}
		
		//if(!isAscendingUntil(array, l)) return console.log("l = %d; r = %d", l, r);
		
		if(minIndex != maxIndex){
			
			if(maxIndex == l && minIndex == r){
				
				cols[minIndex].style.backgroundColor = "#7600A9";
				cols[maxIndex].style.backgroundColor = "#7600A9";
				await swap(array, minIndex, maxIndex);
				l++;
				r--;
				
			}
			else if(maxIndex == l){
				
				cols[minIndex].style.backgroundColor = "#7600A9";
				cols[maxIndex].style.backgroundColor = "#7600A9";
				await swap(array, maxIndex, minIndex);
				l++;
				
			}
			else if(minIndex == r){
				
				cols[minIndex].style.backgroundColor = "#7600A9";
				cols[maxIndex].style.backgroundColor = "#7600A9";
				await swap(array, minIndex, maxIndex);
				r--;
				
			}
			else{
			
				if (minIndex == l){
				
					l++;
				
				}
				else{
				
					cols[l].style.backgroundColor = "#7600A9";
					cols[minIndex].style.backgroundColor = "#7600A9";
					await swap(array, minIndex, l);
					l++;
				
				}
			
				if(maxIndex == r){
				
					r--;
				
				}
				else{
				
					cols[r].style.backgroundColor = "#7600A9";
					cols[maxIndex].style.backgroundColor = "#7600A9";
					await swap(array, maxIndex, r);
					r--;
				
				}
			}
			
		}
		else{
			
			break;
			
		}
		
	}
	
	document.getElementById("sort-button").disabled = false;
	document.getElementById("set-array-size-button").disabled = false;
	
}

async function shellSort(array){
	
	let h = 0;
	while(h < array.length) {
		
		h = 3 * h + 1;
		
	}
	
	for(h = (h - 1) / 3; h >= 1;  h = (h - 1) / 3){
		
		for(let i = h; i < array.length; i++){
			
			for(let j = i - h; j >= 0; j -= h){
				
				if(array[j + h] < array[j]){
					
					cols[j + h].style.backgroundColor = "#7600A9";
					cols[j].style.backgroundColor = "#7600A9";
					await swap(array, j + h, j);
					
				}
				else{
					
					break;
					
				}
				
			}
			
		}
		
	}
	
	document.getElementById("sort-button").disabled = false;
	document.getElementById("set-array-size-button").disabled = false;
	
}

async function quickSort(array, L, R){
	//Hoare method
	
	if(L >= R){
		
		document.getElementById("sort-button").disabled = false;
		document.getElementById("set-array-size-button").disabled = false;
		return;
		
	}
	
	let pivot = array[parseInt((L + R) / 2, 10)];
	let lId = L;
	let rId = R;
	
	while(true){
			
		while(array[lId] < pivot){
			
			lId++;
				
		}
		
		while(array[rId] > pivot){
			
			rId--;
			
		}
		
		if(lId < rId){
			
			cols[lId].style.backgroundColor = "#7600A9";
			cols[rId].style.backgroundColor = "#7600A9";
			await swap(array, lId, rId);
			lId++;
			rId--;
			
		}
		else{
			
			break;
			
		}
			
	}
	
	quickSort(array, L, rId);
	quickSort(array, rId + 1, R);
	
}

//Button events

function sortBtn(){
	
	if(isAscending(array)) return;
	
	let selectElem = document.getElementById("sorting-algorithms");
	
	switch(selectElem.value){
		
		case "bubble-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				bubbleSort(array);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;	
			
		}
		
		case "insertion-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				insertionSort(array);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;
			
		}

		case "selection-min-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				selectionMinSort(array);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;
			
		}
		
		case "selection-max-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				selectionMaxSort(array);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;
			
		}
		
		case "min-max-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				minMaxSort(array);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;
			
		}		
		
		case "shell-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				shellSort(array);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;
			
		}		
		
		case "quick-sort":{
			
			if(array.length != 0){
				
				tStart = new Date().getTime();
				quickSort(array, 0, array.length - 1);
				tEnd = new Date().getTime();
				
				elemTimeElapsed.innerHTML = (tEnd - tStart) / 1000 + "s";
				drawCols();
				document.getElementById("sort-button").disabled = true;
				document.getElementById("set-array-size-button").disabled = true;
				
			}
			
			break;
			
		}		
		
	}
	
}

function setArraySizeBtn(){
	
	deleteCols();
	
	let size = document.getElementById("array-size-input").value;
	fillArrayRand(array, parseInt(size, 10));
	
	addCols(array);
	drawCols();
	document.getElementById("sort-button").disabled = false;
	
}

function setActionDelayBtn(){
	
	actionDelay = document.getElementById("action-delay-input").value;
	
}

//Sleep function realisation

function sleep(ms){
	
	return new Promise (resolve => setTimeout(resolve, ms));
	
}

//document.addEventListener("DOMContentLoaded", function() {
    // this function runs when the DOM is ready, i.e. when the document has been parsed
//    document.getElementById("arrPrint").innerHTML = arr.join(" ");
//});