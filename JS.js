const table = document.getElementById("myTable");
const tbody = table.getElementsByTagName("tbody")[0];
const th = table.getElementsByTagName("th");
const searchInput = document.getElementById("searchInput");
const rowsPerPageSelect = document.getElementById("rowsPerPageSelect");
const rowsPerPage = 10;
let currentPage = 1;
let totalPages = 1;
let currentRows = [];
let currentSort = {};

// Initialize the table
initTable();

// Initialize the event listeners
searchInput.addEventListener("input", () => {
  currentPage = 1;
  updateTable();
});

rowsPerPageSelect.addEventListener("change", () => {
  currentPage = 1;
  updateTable();
});

for (let i = 0; i < th.length; i++) {
  th[i].addEventListener("click", () => {
    let sortColumn = th[i].getAttribute("data-column");
    let sortOrder = "asc";
    if (currentSort.column === sortColumn) {
      sortOrder = currentSort.order === "asc" ? "desc" : "asc";
    }
    currentSort = { column: sortColumn, order: sortOrder };
    sortTable(sortColumn, sortOrder);
  });
}

// Function to initialize the table
function initTable() {
  // Sort table by default column and order
  currentSort = { column: th[0].getAttribute("data-column"), order: "asc" };
  sortTable(currentSort.column, currentSort.order);

  // Set rows per page select options
  for (let i = 1; i <= 50; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    rowsPerPageSelect.add(option);
  }

  // Set default rows per page
  rowsPerPageSelect.value = rowsPerPage;

  // Update the table
  updateTable();
}

// Function to update the table
function updateTable() {
  let searchText = searchInput.value.trim().toLowerCase();
  let rowsPerPage = rowsPerPageSelect.value;

  // Filter the rows based on the search text
  let filteredRows = [];
  for (let i = 0; i < currentRows.length; i++) {
    let row = currentRows[i];
    let rowText = "";
    for (let j = 0; j < row.cells.length; j++) {
      let cell = row.cells[j];
      rowText += " " + cell.textContent.trim().toLowerCase();
    }
    if (rowText.includes(searchText)) {
      filteredRows.push(row);
    }
  }

  // Update the total pages based on the filtered rows
  totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  // Set the current page to the first page if it is out of bounds
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // Update the pagination buttons
  updatePagination();

  // Clear the table body
  tbody.innerHTML = "";

  // Add the rows for the current page
  let startIndex = (currentPage - 1) * rowsPerPage;
  let endIndex = startIndex + parseInt(rowsPerPage);
  let rowsToShow = filteredRows.slice(startIndex, endIndex);
  for (let i = 0; i < rowsToShow.length; i++) {
    tbody.appendChild(rowsToShow[i]);
  }

  // Update the current rows
  currentRows = rowsToShow;
}

// Function to update the pagination buttons
function updatePagination() {
  let paginationDiv = document.getElementById("paginationDiv");
  let pageNumSpan = document.getElementById("pageNumSpan");
  pagination
