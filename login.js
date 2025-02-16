document.getElementById('loginTab').addEventListener('click', switchToLogin);
document.getElementById('signupTab').addEventListener('click', switchToSignup);

function switchToLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginTab').classList.add('active');
    document.getElementById('signupTab').classList.remove('active');
}

function switchToSignup() {
    document.getElementById('signupForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
