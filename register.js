document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;


  if (!username || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }


  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }


  const user = { username, email, password };
  localStorage.setItem("userData", JSON.stringify(user));

  alert("Registration successful!");
  window.location.href = "login.html";
});
function goHome() {
  window.location.href = "home3.html";
}
