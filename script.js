('use strict');

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

const body = document.querySelector('body');
const form = document.getElementById('form--request');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const dateInput = document.getElementById('dob');
const phoneInput = document.getElementById('phone');
const emailConsentInput = document.getElementById('email-share');
const phoneConsentInput = document.getElementById('phone-share');
const phraseInput = document.getElementById('pass-phrase');

let emailConsentChecked = 0;
let phoneConsentChecked = 0;

const passPhrase = ['elephant', 'tiger', 'squid', 'robot'];

// Returns a random positive whole number between two values (min, max)
// Used throughout to select random array elements
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Return random phrase from passPhrase array using randomNumber()
function randomPhrase() {
  return passPhrase[randomNumber(0, passPhrase.length - 1)];
}

const currentPassPhrase = randomPhrase();

phraseInput.placeholder = `type '${currentPassPhrase}'`;
phraseInput.setAttribute('pattern', currentPassPhrase);

emailConsentInput.addEventListener('click', function (e) {
  if (emailConsentChecked === 0) {
    emailConsentChecked = 1;
  } else {
    emailConsentChecked = 0;
  }
});

phoneConsentInput.addEventListener('click', function (e) {
  if (phoneConsentChecked === 0) {
    phoneConsentChecked = 1;
  } else {
    phoneConsentChecked = 0;
  }
});

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

function getData() {
  firebase
    .database()
    .ref('User--Details')
    .on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val().email;
        console.log(childData);
      });
    });
}

getData();

// submitButton.addEventListener('onsubmit', writeData);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  writeData();
  setTimeout(() => {
    window.location.href = './complete.html';
  }, 1000);
});
