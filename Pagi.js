const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const rows = Array.from(tbody.querySelectorAll('tr'));
const pagination = document.querySelector('.pagination');

const itemsPerPage = 5;
let currentPage = 1;
let totalPages = Math.ceil(rows.length / itemsPerPage);

// Create pagination links
for (let i = 1; i <= totalPages; i++) {
  const link = document.createElement('a');
  link.href = '#';
  link.textContent = i;
  if (i === currentPage) {
    link.classList.add('active');
  }
  pagination.appendChild(link);
}

// Display the first page
showPage(currentPage);

// Add click event listener to pagination links
pagination.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    currentPage = parseInt(e.target.textContent);
    showPage(currentPage);
    updatePaginationLinks();
  }
});

// Show the specified page
function showPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  rows.forEach((row, index) => {
    if (index >= startIndex && index < endIndex) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Update pagination links
function updatePaginationLinks() {
  const links = pagination.querySelectorAll('a');
  links.forEach(link => {
    if (parseInt(link.textContent) === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Add horizontal scrolling
table.parentElement.style.overflowX = 'auto';

// Add vertical scrolling
table.parentElement.style.overflowY = 'auto';
table.parentElement.style.maxHeight = '400px';
