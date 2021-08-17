/* ===============================================================
 * Common Knowledge Coding Challenge
 * Author:  Cemal Okten
 * Github: https://github.com/cemalokten/
 * Language: JS
 * 01 - Firebase Config
 * 02 - Variable Declarations
 * 03 - Random Number Generator
 * 04 - Phrase Generator
 * 05 - Phone and Email consent checkbox values for database
 * 06 - Setting invalid tooltips for form inputs
 * 07 - Firebase database write function
 * 08 - On form submit writeData & redirect
================================================================== */

('use strict');

// ============================================================================
// 01 - Firebase Config
const firebaseConfig = {
  apiKey: 'AIzaSyA4rFPbDfP8yiorPMVQj1SCMc2hOYaPNKw',
  authDomain: 'change-all-bad-things.firebaseapp.com',
  projectId: 'change-all-bad-things',
  databaseURL: 'https://change-all-bad-things-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'change-all-bad-things.appspot.com',
  messagingSenderId: '121365096723',
  appId: '1:121365096723:web:5c5b6dcd66dad25a71d2e6',
};

firebase.initializeApp(firebaseConfig);

// ============================================================================
// 02 - Variable Declarations
const form = document.getElementById('form--request');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('dob');
const phoneInput = document.getElementById('phone');
const emailConsentInput = document.getElementById('email-share');
const phoneConsentInput = document.getElementById('phone-share');
const phraseInput = document.getElementById('pass-phrase');

const passPhrase = ['elephant', 'tiger', 'squid', 'robot'];

// ============================================================================
// 03 - Random Number Generator
// Returns a random positive whole number between two values (min, max)
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// ============================================================================
// 04 - Check if Human Phrase Generator
// Return random phrase from passPhrase array using randomNumber()
function randomPhrase() {
  return passPhrase[randomNumber(0, passPhrase.length - 1)];
}

const currentPassPhrase = randomPhrase();
phraseInput.placeholder = `type '${currentPassPhrase}'`;
phraseInput.setAttribute('pattern', currentPassPhrase);

// ============================================================================
// 05 - Phone and Email consent checkbox values for database
let emailConsentChecked = 0;
let phoneConsentChecked = 0;

emailConsentInput.addEventListener('click', function () {
  if (emailConsentChecked === 0) {
    emailConsentChecked = 1;
  } else {
    emailConsentChecked = 0;
  }
});

phoneConsentInput.addEventListener('click', function () {
  if (phoneConsentChecked === 0) {
    phoneConsentChecked = 1;
  } else {
    phoneConsentChecked = 0;
  }
});

// ============================================================================
// 06 - Setting invalid tooltips for form inputs
nameInput.oninvalid = function (event) {
  event.target.setCustomValidity(`Please enter your name 🙂`);
};

emailInput.oninvalid = function (event) {
  event.target.setCustomValidity(`Please enter a valid email address 🙂`);
};

phoneInput.oninvalid = function (event) {
  event.target.setCustomValidity(`Please enter a valid UK Phone Number 🙂`);
};

dateInput.oninvalid = function (event) {
  event.target.setCustomValidity(`Please enter your date of birth 📅`);
};

phraseInput.oninvalid = function (event) {
  event.target.setCustomValidity(`Please enter the correct phrase 👀`);
};

nameInput.oninput = function (event) {
  event.target.setCustomValidity('');
};

emailInput.oninput = function (event) {
  event.target.setCustomValidity('');
};

phoneInput.oninput = function (event) {
  event.target.setCustomValidity('');
};

dateInput.oninput = function (event) {
  event.target.setCustomValidity('');
};

phraseInput.oninput = function (event) {
  event.target.setCustomValidity('');
};

// ============================================================================
// 07 - Firebase database write function
function writeData() {
  console.log('run');
  firebase.database().ref('User--Details').push({
    name: nameInput.value,
    email: emailInput.value,
    telephone: phoneInput.value,
    dob: dateInput.value,
    emailConsent: emailConsentChecked,
    phoneConsent: phoneConsentChecked,
  });
}

// ============================================================================
// 08 - On form submit writeData & redirect
form.addEventListener('submit', function (e) {
  e.preventDefault();
  writeData();
  setTimeout(() => {
    window.location.href = './complete.html';
  }, 1000);
});
