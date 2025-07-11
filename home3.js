
function toggleDropdown(id) {
  document.querySelectorAll('.dropdown-content').forEach(el => {
    if (el.id !== id) el.style.display = 'none';
  });

  const dropdown = document.getElementById(id);
  if (dropdown) {
    const isOpen = dropdown.style.display === 'block';
    dropdown.style.display = isOpen ? 'none' : 'block';
  }
}

document.getElementById('sportsToggle').addEventListener('click', function (e) {
  e.preventDefault();
  toggleDropdown('sportsDropdown');
});

document.getElementById('matchesToggle').addEventListener('click', function (e) {
  e.preventDefault();
  toggleDropdown('matchesDropdown');
});

document.getElementById('walletIcon').addEventListener('click', function () {
  toggleDropdown('walletDropdown');
});

document.getElementById('profileIcon').addEventListener('click', function () {
  toggleDropdown('profileDropdown');
});


window.addEventListener('click', function (e) {
  const isDropdown = e.target.closest('.dropdown') || e.target.classList.contains('icon');
  if (!isDropdown) {
    document.querySelectorAll('.dropdown-content').forEach(el => {
      el.style.display = 'none';
    });
  }
});

