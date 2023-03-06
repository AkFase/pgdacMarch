const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const searchInput = document.querySelector('#search');
const numRows = tbody.rows.length;
let rowsPerPage = 20;
let currentPage = 1;
let totalPages = Math.ceil(numRows / rowsPerPage);

function paginate(rows, page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  rows.forEach((row, index) => {
    if (index < start || index >= end) {
      row.style.display = 'none';
    } else {
      row.style.display = '';
    }
  });
}

function updatePagination() {
  const rows = Array.from(tbody.rows);
  totalPages = Math.ceil(rows.length / rowsPerPage);
  const numPages = Math.min(totalPages, 20);
  const paginationContainer = document.querySelector('.pagination');
  paginationContainer.innerHTML = '';
  for (let i = 1; i <= numPages; i++) {
    const link = document.createElement('a');
    link.textContent = i;
    if (i === currentPage) {
      link.classList.add('active');
    }
    link.addEventListener('click', () => {
      currentPage = i;
      paginate(rows, currentPage);
      updatePagination();
    });
    paginationContainer.appendChild(link);
  }
  const pageNumSpan = document.querySelector('.page-num');
  pageNumSpan.textContent = `${currentPage} of ${totalPages}`;
}

function filterRows() {
  const filterText = searchInput.value.toLowerCase().trim();
  const rows = Array.from(tbody.rows);
  rows.forEach((row) => {
    const tdText = row.textContent.toLowerCase().trim();
    if (tdText.includes(filterText)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
  currentPage = 1;
  updatePagination();
}

function makeTableScrollable() {
  const tableContainer = document.querySelector('.table-container');
  tableContainer.style.overflowX = 'auto';
  tableContainer.style.maxHeight = '500px';
}

paginate(Array.from(tbody.rows), currentPage);
updatePagination();
searchInput.addEventListener('input', filterRows);
makeTableScrollable();
