$(function () {
  // Runs when all HTML elements are ready

  // Display Gucci's starting information
  checkAndUpdatePetInfoInHtml();

  // Connect each button to its function
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);
  $('.default-button').click(clickedDefaultButton);
});

// Gucci's starting information
var pet_info = {
  name: "Gucci",
  weight: 30,
  happiness: 100,
  energy: 50
};

// TREAT BUTTON
function clickedTreatButton() {
  // Treats increase Gucci's happiness and weight
  pet_info.happiness += 10;
  pet_info.weight += 1;

  // Change Gucci's picture to him eating
  $('.pet-image').attr('src', 'images/gucci-treat.jpeg');
  showPetMessage("Yummy! More treats please!");
  checkAndUpdatePetInfoInHtml();
  playPetSound('eating.mp3');
  animateGucci('bounce');
}

// PLAY BUTTON
function clickedPlayButton() {
  // Playing increases happiness and decreases weight
  pet_info.happiness += 10;
  pet_info.weight -= 1;

  // Change Gucci's picture to his playful expression
  $('.pet-image').attr('src', 'images/gucci-play.jpeg');
  showPetMessage("Woof woof! Let's play again!");
  checkAndUpdatePetInfoInHtml();
  playPetSound('bark.mp3');
  animateGucci('bounce');
}

// EXERCISE BUTTON
function clickedExerciseButton() {
  // Exercise decreases happiness and weight
  pet_info.happiness -= 10;
  pet_info.weight -= 1;

  // Change Gucci's picture to his outdoor adventure
  $('.pet-image').attr('src', 'images/gucci-exercise.jpeg');
  showPetMessage("Phew! That was a workout!");
  checkAndUpdatePetInfoInHtml();
  animateGucci('shake');
}

function clickedSleepButton() {
  // Sleeping restores Gucci's energy
  pet_info.energy += 20;

  // Change Gucci's picture to his sleeping photo
  $('.pet-image').attr('src', 'images/gucci-sleep.jpg');

  // Display Gucci's sleepy reaction
  showPetMessage('Zzz... five more minutes!');
  checkAndUpdatePetInfoInHtml();
  playPetSound('snore.mp3');
  animateGucci('sleep-animation');
}

function clickedDefaultButton() {
  // Return to Gucci's default image
  $('.pet-image').attr('src', 'images/gucci-default.jpeg');
  $('.pet-image').removeClass('bounce shake sleep-animation');
  // Display starting message
  showPetMessage('What should we do today?');
}

function showPetMessage(message) {
  // fadeOut() gradually hides the current message.
  // This makes the transition smoother than changing
  // the text immediately.
  $('.pet-message').stop(true, true).fadeOut(200, function () {

    // Change the message after the old one disappears
    $(this).text(message);

    // fadeIn() gradually reveals Gucci's new reaction.
    $(this).fadeIn(300);
  });
}

// Check values before displaying updated information
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// Prevent Gucci's values from becoming negative
function checkWeightAndHappinessBeforeUpdating() {
  // Weight cannot go below zero
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  // Happiness cannot go below zero
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }

  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }

  if (pet_info.energy > 100) {
    pet_info.energy = 100;
  }
}

// Update the displayed information in HTML
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info.energy);
}

function playPetSound(soundFile) {
  // Create an audio object using a file from our sounds folder
  var sound = new Audio('sounds/' + soundFile);

  // Play the sound when Gucci performs an action
  sound.play().catch(function (error) {
    console.log('Sound could not play:', error);
  });
}

function animateGucci(animationClass) {
  var petImage = $('.pet-image');

  // Stop the previous animation
  petImage.removeClass('bounce shake sleep-animation');

  // Restart the animation
  void petImage[0].offsetWidth;

  // Play the selected animation
  petImage.addClass(animationClass);
}