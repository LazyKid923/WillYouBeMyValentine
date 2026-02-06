document.addEventListener("DOMContentLoaded", function () {
  // Starfield setup
  const starfield = document.getElementById("starfield");
  if (starfield) {
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star" + (Math.random() > 0.8 ? " big" : "");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty(
        "--twinkle-duration",
        `${1.6 + Math.random() * 2.8}s`
      );
      star.style.setProperty(
        "--twinkle-delay",
        `${Math.random() * 3}s`
      );
      starfield.appendChild(star);
    }
  }

  // Random background images (resources/Background/random) - fixed positions
  const randomScatter = document.getElementById("randomScatter");
  const randomImages = [
    { file: "littlest-pet-shop-lps.gif", left: "8%", top: "8%", width: "250px", rotate: "0deg" },
    { file: "bow-cute.gif", left: "65%", top: "10%", width: "120px", rotate: "0deg" },
    { file: "woodchuck.png", left: "15%", top: "65%", width: "50px", rotate: "0deg" },
    { file: "potaro-porter-robinson-animated.gif", left: "78%", top: "8%", width: "230px", rotate: "35deg" },
    // { file: "ribbon-cute.gif", left: "32%", top: "8%", width: "165px", rotate: "0deg" },
    { file: "pink-cute.gif", left: "86%", top: "65%", width: "185px", rotate: "0deg" },
    { file: "tankair.png", left: "56%", top: "66%", width: "120px", rotate: "0deg" },
    { file: "lps-deer.gif", left: "65%", top: "30%", width: "120px", rotate: "0deg" },
    { file: "marroncream-sanrio.gif", left: "30%", top: "30%", width: "120px", rotate: "0deg" },
    { file: "cherry.png", left: "70%", top: "45%", width: "225px", rotate: "0deg" },
    { file: "chrome.png", left: "55%", top: "10%", width: "60px", rotate: "-23deg" },
    { file: "tiffany.png", left: "40%", top: "13%", width: "120px", rotate: "0deg" },
    { file: "my-melody.gif", left: "40%", top: "65%", width: "165px", rotate: "0deg" },
    { file: "sonny.png", left: "85%", top: "40%", width: "160px", rotate: "0deg" },
    { file: "heart.gif", left: "15%", top: "40%", width: "160px", rotate: "0deg" },
    { file: "tulip.png", left: "25%", top: "40%", width: "250px", rotate: "0deg" },
    { file: "peanut.png", left: "27%", top: "7%", width: "125px", rotate: "0deg" },
    { file: "mai.gif", left: "25%", top: "70%", width: "125px", rotate: "0deg" },
  ];

  function renderRandomImages() {
    if (!randomScatter || randomImages.length === 0) return;
    randomScatter.innerHTML = "";

    randomImages.forEach((item) => {
      const img = new Image();
      img.src = `./resources/Background/random/${item.file}`;
      img.alt = "";
      img.className = "random-item";

      if (item.file.toLowerCase().endsWith(".png")) {
        img.classList.add("bob");
      }

      img.style.left = item.left;
      img.style.top = item.top;
      img.style.width = item.width;
      img.style.setProperty("--rand-rot", item.rotate || "0deg");

      randomScatter.appendChild(img);
    });
  }

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
          document.body.classList.add("bg-dim");
          renderRandomImages();
        }, 500);
      }, 800);
    });
  }

  renderRandomImages();
});

function angry() {
  var paperText = document.getElementById("paperText");
  if (paperText) {
    paperText.innerText = "Okay… maybe later? 🥺";
  }
}

function happy() {
  var paperText = document.getElementById("paperText");
  if (paperText) {
    paperText.innerText = "Say yes? It would make me so happy 💖";
  }
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
  var paperText = document.getElementById("paperText");
  if (paperText) {
    paperText.innerText = "Do you want to be my Valentine? 🥺";
  }
}

let counter = 0;
let yesButtonScale = 1;

function no() {
  counter++;

  // Make the yes button bigger each time no is clicked
  yesButtonScale += 0.2;
  const yesButton = document.getElementById("yes");
  const yesRect = yesButton.getBoundingClientRect();
  const maxScaleX =
    (window.innerWidth - 12 - yesRect.left) / yesButton.offsetWidth;
  const clampedScale = Math.min(yesButtonScale, Math.max(1, maxScaleX));
  yesButtonScale = clampedScale;
  yesButton.style.transform = `scale(${yesButtonScale})`;

  // Shake the "No" button
  const noButton = document.getElementById("no");
  if (noButton) {
    noButton.classList.remove("btn-shake");
    void noButton.offsetWidth;
    noButton.classList.add("btn-shake");
    const baseWidth = yesButton.offsetWidth;
    const extraWidth = baseWidth * (yesButtonScale - 1);
    noButton.style.marginLeft = `${Math.max(0, extraWidth + 12)}px`;
  }

  // Show the sad modal only after 10 "No" clicks
  if (counter >= 10) {
    let sadMusic = document.getElementById("sadMusic");
    let happyMusic = document.getElementById("happyMusic");
    happyMusic.pause();
    sadMusic.play();
    let model = document.getElementById("model");
    model.style.display = "flex";
    const btns = document.getElementById("btns");
    if (btns) {
      btns.style.display = "none";
    }
    const modelImage = document.getElementById("modelImg");
    const modelText = document.getElementById("modelText");
    modelImage.src = sadCat[Math.floor(Math.random() * sadCat.length)];
    modelText.innerText =
      blackmail[Math.floor(Math.random() * blackmail.length)];
  }
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
    const paperText = document.getElementById("paperText");
    const btns = document.getElementById("btns");
    btns.style.display = "none";
    if (paperText) {
      paperText.innerText = "We are dating now. I love you cutie.";
    }
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
