/* ===============================================================
 * Common Knowledge Coding Challenge
 * Author:  Cemal Okten
 * Github: https://github.com/cemalokten/
 * Language: JS
 * 01 - Firebase Config
 * 02 - Variable Declarations
 * 03 - Blur page while loading
 * 04 - Get data from Firebase Database
================================================================== */

'use strict';

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
const p = document.querySelectorAll('p');
const h1 = document.querySelector('h1');
const body = document.querySelector('body');

// ============================================================================
// 03 - Blur page while loading
setTimeout(() => body.classList.remove('blur'), 1500);

// ============================================================================
// 04 - Get data from Firebase Database
function getData() {
  firebase
    .database()
    .ref('User--Details')
    .on('value', function (snapshot) {
      let i = 0;
      snapshot.forEach(function (childSnapshot) {
        var childData = childSnapshot.val().name;
        i += 1;
        if (i < snapshot.numChildren()) {
          p[1].append(` ${childData},`);
        } else {
          p[1].append(` and you ${childData}! 🙂`);
          h1.append(` ${childData}!`);
        }
      });
    });
}

getData();
