
var signUpModal = document.getElementById('signUpModal');
var signInModal = document.getElementById('signInModal');

function openModal(modal) {
  modal.classList.add('open');
}

function closeModal(modal) {
  modal.classList.remove('open');
}

document.getElementById('signUpBtn').addEventListener('click', function () {
  openModal(signUpModal);
});

document.getElementById('signInBtn').addEventListener('click', function () {
  openModal(signInModal);
});

document.getElementById('closeSignUp').addEventListener('click', function () {
  closeModal(signUpModal);
});

document.getElementById('closeSignIn').addEventListener('click', function () {
  closeModal(signInModal);
});

document.getElementById('switchToSignUp').addEventListener('click', function (event) {
  event.preventDefault();
  closeModal(signInModal);
  openModal(signUpModal);
});

window.addEventListener('click', function (event) {
  if (event.target.classList.contains('modal')) {
    closeModal(event.target);
  }
});

document.getElementById('signUpForm').addEventListener('submit', function (event) {
  event.preventDefault();
});

document.getElementById('signInForm').addEventListener('submit', function (event) {
  event.preventDefault();
});