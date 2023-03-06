let table = document.querySelector("#myTable");
let tableBody = table.querySelector("tbody");
let tableRows = tableBody.querySelectorAll("tr");
let tableHeader = table.querySelector("thead");

let currentPage = 1;
let rowsPerPage = 20;
let totalPages = Math.ceil(tableRows.length / rowsPerPage);

let controls = document.createElement("div");
controls.classList.add("controls");

let prevButton = document.createElement("button");
prevButton.textContent = "Prev";
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

let nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
});

let pageNumSpan = document.createElement("span");
pageNumSpan.textContent = `${currentPage} of ${totalPages}`;

controls.appendChild(prevButton);
controls.appendChild(pageNumSpan);
controls.appendChild(nextButton);

table.insertAdjacentElement("afterend", controls);

function updateTable() {
  let firstRowIndex = (currentPage - 1) * rowsPerPage;
  let lastRowIndex = firstRowIndex + rowsPerPage;
  let tableRowsArray = Array.from(tableRows);

  tableRowsArray.forEach((row) => {
    row.style.display = "none";
  });

  tableRowsArray.slice(firstRowIndex, lastRowIndex).forEach((row) => {
    row.style.display = "";
  });

  pageNumSpan.textContent = `${currentPage} of ${totalPages}`;
}

updateTable();
