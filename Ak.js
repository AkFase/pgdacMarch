// Define table and pagination variables
const dataTable = document.getElementById('data-table');
const searchInput = document.getElementById('search-input');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const pageNumSpan = document.getElementById('page-num');
const dataRows = dataTable.tBodies[0].rows;
const numRows = dataRows.length;
const rowsPerPage = 5;
let currentPage = 1;
let totalPages = Math.ceil(numRows / rowsPerPage);

// Define search function
function searchTable() {
  const searchTerm = searchInput.value.toLowerCase();
  for (let i = 0; i < numRows; i++) {
    let foundMatch = false;
    const rowCells = dataRows[i].cells;
    for (let j = 0; j < rowCells.length; j++) {
      const cellContent = rowCells[j].textContent.toLowerCase();
      if (cellContent.includes(searchTerm)) {
        foundMatch = true;
        break;
      }
    }
    if (foundMatch) {
      dataRows[i].style.display = '';
    } else {
      dataRows[i].style.display = 'none';
    }
  }
  updatePagination();
}

// Define pagination functions
function updatePagination() {
  pageNumSpan.textContent = `${currentPage} of ${totalPages}`;
  if (currentPage === 1) {
    prevPageBtn.disabled = true;
  } else {
    prevPageBtn.disabled = false;
  }
  if (currentPage === totalPages) {
    nextPageBtn.disabled = true;
  } else {
    nextPageBtn.disabled = false;
  }
}

function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
}

function goToNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
}

function updateTable() {
  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  for (let i = 0; i < numRows; i++) {
    if (i >= startIdx && i < endIdx) {
      dataRows[i].style.display = '';
    } else {
      dataRows[i].style.display = 'none';
    }
  }
  updatePagination();
}

// Add event listeners
searchInput.addEventListener('input', searchTable);
prevPageBtn.addEventListener('click', goToPrevPage);
nextPageBtn.addEventListener('click', goToNextPage);

// Initialize table
updateTable();
