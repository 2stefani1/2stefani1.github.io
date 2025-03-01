// Array of random phrases to cycle through
const phrases = [
  "DO STUFF!!!!",
  "make games",
  "mostly do programming",
  "am",
  "am great atIDONT CARE.",
  "",
  "yum",
];

function typeWriter() {
  const phraseElement = document.querySelector('.typewriter-phrase');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
      const currentPhrase = phrases[phraseIndex];
      
      // Typing effect
      if (!isDeleting) {
          phraseElement.textContent = currentPhrase.slice(0, charIndex + 1);
          charIndex++;

          // Check if full phrase is typed
          if (charIndex === currentPhrase.length) {
              isDeleting = true;
              // Pause before deleting
              setTimeout(type, 2000);
          } else {
              // Continue typing
              setTimeout(type, 100);
          }
      } 
      // Deleting effect
      else {
          phraseElement.textContent = currentPhrase.slice(0, charIndex);
          charIndex--;

          // Check if phrase is fully deleted
          if (charIndex === -1) {
              isDeleting = false;
              // Move to next phrase
              phraseIndex = (phraseIndex + 1) % phrases.length;
              setTimeout(type, 500);
          } else {
              // Continue deleting
              setTimeout(type, 50);
          }
      }
  }

  // Start the typing effect
  type();
}

// Run the typewriter effect when the page loads
document.addEventListener('DOMContentLoaded', typeWriter);