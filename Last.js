
// Get references to the HTML elements
const tableContainer = document.querySelector('.table-container');
const tableBody = document.querySelector('tbody');
const prevPageBtn = document.querySelector('.prev-page-btn');
const nextPageBtn = document.querySelector('.next-page-btn');
const pageNumSpan = document.querySelector('.page-num');
const searchInput = document.querySelector('.search-input');

// Set up some global variables for pagination and searching
const itemsPerPage = 10;
let currentPage = 1;
let currentData = [];

// Define a function to render the table rows
function renderTableRows(data) {
  tableBody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const row = `
      <tr>
        <td>${data[i].column1}</td>
        <td>${data[i].column2}</td>
        <td>${data[i].column3}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  }
}

// Define a function to paginate the data
function paginateData(data) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
}

// Define a function to update the pagination UI
function updatePagination() {
  pageNumSpan.textContent = currentPage;
}

// Define a function to handle clicking the previous page button
function handlePrevPageClick() {
  if (currentPage > 1) {
    currentPage--;
    renderTableRows(paginateData(currentData));
    updatePagination();
  }
}

// Define a function to handle clicking the next page button
function handleNextPageClick() {
  if (currentPage < Math.ceil(currentData.length / itemsPerPage)) {
    currentPage++;
    renderTableRows(paginateData(currentData));
    updatePagination();
  }
}

// Define a function to handle searching the data
function handleSearchInput() {
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    const searchResults = currentData.filter(item => {
      return item.column1.toLowerCase().includes(query) ||
             item.column2.toLowerCase().includes(query) ||
             item.column3.toLowerCase().includes(query);
    });
    currentPage = 1;
    currentData = searchResults;
    renderTableRows(paginateData(currentData));
    updatePagination();
  } else {
    currentPage = 1;
    currentData = [/* your data here */];
    renderTableRows(paginateData(currentData));
    updatePagination();
  }
}

// Attach event listeners to the HTML elements
prevPageBtn.addEventListener('click', handlePrevPageClick);
nextPageBtn.addEventListener('click', handleNextPageClick);
searchInput.addEventListener('input', handleSearchInput);

// Set up the initial data and UI
currentData = [/* your data here */];
renderTableRows(paginateData(currentData));
updatePagination();
