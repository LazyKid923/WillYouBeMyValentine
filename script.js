document.addEventListener("DOMContentLoaded", function () {
  // Background scatter setup
  const bgScatter = document.getElementById("bgScatter");
  const bgImages = [
    // Add your background image filenames here (inside /resources/background/)
    // Example: "heart1.png",
    // Example: "flower.png",
  ];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  if (bgScatter && bgImages.length > 0) {
    bgImages.forEach((file, idx) => {
      const img = document.createElement("img");
      img.src = `./resources/background/${file}`;
      img.alt = "";
      img.className = "bg-item";

      const left = rand(0, 100);
      const top = rand(0, 100);
      img.style.left = `${left}%`;
      img.style.top = `${top}%`;

      const size = rand(50, 110);
      img.style.width = `${size}px`;
      img.style.opacity = rand(0.35, 0.75).toFixed(2);
      img.style.animationDelay = `${rand(0, 4).toFixed(2)}s`;

      // Mix floating and drifting
      img.classList.add(idx % 2 === 0 ? "bg-float" : "bg-drift");

      bgScatter.appendChild(img);
    });
  }

  // Get all elements with class "image1"
  var images = document.querySelectorAll(".image1");

  // Ensure Bambi video keeps looping (some browsers pause after first loop)
  const bambiVideo = document.querySelector(".bambi-vid");
  if (bambiVideo) {
    const showBambi = () => {
      bambiVideo.classList.add("is-ready");
    };

    bambiVideo.addEventListener("loadedmetadata", showBambi, { once: true });
    bambiVideo.addEventListener("canplay", showBambi, { once: true });
    bambiVideo.addEventListener("ended", () => {
      bambiVideo.currentTime = 0;
      bambiVideo.play();
    });
    if (bambiVideo.paused) {
      bambiVideo.play().catch(() => {});
    }
  }

  // Function to set random position for an element
  function setRandomPosition(element) {
    element.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
    element.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
  }

  // Set random position for each image
  images.forEach(function (image) {
    setRandomPosition(image);
  });

  // Envelope click handler
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const envelopeImg = document.getElementById("envelopeImg");
  const mainContent = document.getElementById("mainContent");

  if (envelopeImg) {
    envelopeImg.addEventListener("click", function () {
      // Swap to opened envelope image
      envelopeImg.src = "./resources/envelope_opened.png";

      // Wait for animation, then hide envelope and show main content
      setTimeout(() => {
        envelopeWrapper.style.animation = "fadeOut 0.5s ease";
        setTimeout(() => {
          envelopeWrapper.style.display = "none";
          mainContent.classList.add("show");
        }, 500);
      }, 800);
    });
  }
});

function angry() {
  // get all image with class image1 and change the src
  var images = document.querySelectorAll(".image1");
  var absImg = document.getElementById("absImg");
  var mainImg = document.getElementById("mainImg");
  mainImg.src = "./resources/sad1.gif";

  absImg.style.display = "flex";

  images.forEach(function (image) {
    image.src = "./resources/sad.gif";
  });
}

function happy() {
  // get all image with class image1 and change the src
  var images = document.querySelectorAll(".image1");
  var absImg = document.getElementById("absImg");
  absImg.style.display = "flex";
  var mainImg = document.getElementById("mainImg");
  mainImg.src = "./resources/happy3.gif";

  images.forEach(function (image) {
    image.src = "./resources/heart.gif";
  });
}

const sadCat = [
  "https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216",
  "https://emoji.gg/assets/emoji/5228_cat_cri.gif",
  "https://media1.tenor.com/images/a0554662ae7c3c60c0a7fdadac74ef18/tenor.gif?itemid=13931206",
  "https://media3.giphy.com/media/qpCvOBBmBkble/giphy.gif",
  "https://c.tenor.com/fpIAhF2jIY0AAAAC/cat-crying.gif",
  "https://c.tenor.com/BP70qe8X0J8AAAAC/crycat-crying-cat.gif",
];

const blackmail = [
  "Please",
  "I'm begging you",
  "I'm crying",
  "I'm sad",
  "HUHUHUHU",
  "Please Say Yes",
  "I'm gonna cry",
];

function normal() {
  var absImg = document.getElementById("absImg");
  absImg.style.display = "none";
  var mainImg = document.getElementById("mainImg");
  mainImg.src = "./resources/happy1.gif";
}

let counter = 0;
let yesButtonScale = 1;

function no() {
  counter++;
  
  // Make the yes button bigger each time no is clicked
  yesButtonScale += 0.2;
  const yesButton = document.getElementById("yes");
  yesButton.style.transform = `scale(${yesButtonScale})`;
  
  let sadMusic = document.getElementById("sadMusic");
  let happyMusic = document.getElementById("happyMusic");
  happyMusic.pause();
  sadMusic.play();
  let model = document.getElementById("model");
  model.style.display = "none";
  setTimeout(() => {
    model.style.display = "flex";
    const modelImage = document.getElementById("modelImg");
    const modelText = document.getElementById("modelText");
    modelImage.src = sadCat[Math.floor(Math.random() * sadCat.length)];
    modelText.innerText =
      blackmail[Math.floor(Math.random() * blackmail.length)];
  }, 100);
}

function yes() {
  if (counter >= 3) {
    let model = document.getElementById("model2");
    let model2 = document.getElementById("model");
    let sadMusic = document.getElementById("sadMusic");
    sadMusic.pause();
    model2.style.display = "none";
    let happyMusic = document.getElementById("happyMusic");
    happyMusic.play();
    model.style.display = "none";
    setTimeout(() => {
      model.style.display = "flex";
    }, 100);
    const wedate = document.getElementById("wedate");
    const btns = document.getElementById("btns");
    btns.style.display = "none";
    wedate.innerText = "We are dating now. I love you cutie.";
  } else {
    alert("Kuch to Bhao khao cutie. Sidhe yes mat bola karo.");
  }
}

function ly2() {
  let model = document.getElementById("model2");
  model.style.display = "none";
  let model2 = document.getElementById("model");
  model2.style.display = "none";
}
