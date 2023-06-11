document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('date')) return;
  document.querySelector("section.form #dateInput").value = localStorage.getItem('date');
})

function getDaysBetweenDates(startDate, endDate = new Date()) {
  const diffInMilliseconds = Math.abs(endDate - startDate);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(diffInMilliseconds / millisecondsPerDay);

  return days;
}

function createMatrix(rows, columns, weeksCount, daysCount) {
  const matrixContainer = document.getElementById('draw');
  matrixContainer.innerHTML = ''

  let weeksCounter = document.createElement('p')
  weeksCounter.className = 'text-info'
  weeksCounter.innerText = ` Weeks: ${weeksCount}`
  matrixContainer.appendChild(weeksCounter)

  let daysCounter = document.createElement('p')
  daysCounter.className = 'text-info'
  daysCounter.innerText = `Days: ${daysCount}`
  matrixContainer.appendChild(daysCounter)

  let weeks = weeksCount

  for (let i = 0; i < rows; i++) {
    const newRow = document.createElement('div');
    newRow.className = 'row';

    for (let j = 0; j < columns; j++) {

      if (weeks <= 0) {
        const cube = document.createElement('div');
        cube.className = 'poor-cube';
        newRow.appendChild(cube);
        weeks -= 1
        continue;
      }

      const cube = document.createElement('div');
      cube.className = 'cube';
      newRow.appendChild(cube);
      weeks -= 1
    }

    matrixContainer.appendChild(newRow);
  }
}

function drawCubesButtonHandler() {
  const inputValue = document.querySelector("section.form #dateInput").value;
  
  const errorBlock = document.getElementById("error");
  errorBlock.classList.add("show");
  errorBlock.innerText = "Input date";
  
  const cube = document.createElement("div");
  cube.classList.add("cube");
  
  if (inputValue === "") {
    errorBlock.classList.replace("hide", "show");
    errorBlock.innerText = "Input date";
    return;
  } else if (new Date() < new Date(inputValue)) {
    errorBlock.classList.replace("hide", "show");
    errorBlock.innerText = "Date of birth can`t be later than current date";
    const matrixContainer = document.getElementById('draw');
    matrixContainer.innerHTML = ''
    return;
  }

  localStorage.setItem('date', inputValue)
  
  errorBlock.classList.replace("show", "hide");
  
  let weeksCount = parseInt(getDaysBetweenDates(startDate = new Date(inputValue)) / 7)
  let daysCount = getDaysBetweenDates(startDate = new Date(inputValue))

  createMatrix(rows=90, columns=52, weeksCount=weeksCount, daysCount=daysCount)
}

const button = document.querySelector("form #drawButton");

button.addEventListener("click", drawCubesButtonHandler);