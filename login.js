document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();


  const dummyEmail = "user@example.com";
  const dummyPassword = "password123";


  if (email === "" || password === "") {
    alert("Please enter both email and password.");
    return;
  }


  if (email === dummyEmail && password === dummyPassword) {
    alert("Login successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html"; 
  } else {
    alert("Invalid credentials. Please try again.");
  }
});
function goHome() {
  window.location.href = "home3.html";
}