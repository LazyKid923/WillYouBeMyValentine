document.addEventListener("DOMContentLoaded", function () {
  // Intro sequence
  const introScreen = document.getElementById("introScreen");
  const introText = document.getElementById("introText");
  const introSubtext = document.querySelector(".intro-subtext");
  const bgSong = document.getElementById("bgSong");
  let introStep = 0;
  let introSubtextTimer = null;

  function showIntro() {
    document.body.classList.add("intro-active");
    document.body.classList.remove("fade-in-assets");
    document.body.classList.remove("show-envelope");
    if (introScreen) {
      introScreen.classList.add("show");
    }
    if (introSubtext) {
      introSubtext.classList.remove("show");
      if (introSubtextTimer) clearTimeout(introSubtextTimer);
      introSubtextTimer = setTimeout(() => {
        introSubtext.classList.add("show");
      }, 5000);
    }
  }

  function setIntroText(nextText, cb) {
    if (!introText) return;
    introText.classList.add("fade-out");
    setTimeout(() => {
      introText.innerText = nextText;
      introText.classList.remove("fade-out");
      if (cb) cb();
    }, 450);
  }

  function advanceIntro() {
    if (!introScreen || !introText) return;

    if (introStep === 0) {
      if (introSubtext) introSubtext.classList.remove("show");
      setIntroText("Bambi's Valentine Invitation!", () => {
        introStep = 1;
        if (introSubtext) {
          if (introSubtextTimer) clearTimeout(introSubtextTimer);
          introSubtextTimer = setTimeout(() => {
            introSubtext.classList.add("show");
          }, 5000);
        }
      });
      return;
    }

    // End intro
    introScreen.classList.add("fade-out");
    setTimeout(() => {
      introScreen.classList.remove("show");
      document.body.classList.remove("intro-active");
      document.body.classList.add("fade-in-assets");

      if (bgSong) {
        bgSong.currentTime = 100; // 1:40
        bgSong.volume = 0;
        bgSong.play().catch(() => {});

        const fadeDurationMs = 3000;
        const steps = 30;
        let current = 0;
        const interval = setInterval(() => {
          current += 1;
          bgSong.volume = Math.min(1, current / steps);
          if (current >= steps) {
            clearInterval(interval);
          }
        }, fadeDurationMs / steps);
      }

      // Show envelope after assets fade in
      const envelopeDelayMs = 2000;
      setTimeout(() => {
        document.body.classList.add("show-envelope");
      }, envelopeDelayMs);
    }, 600);
  }

  showIntro();
  document.addEventListener("click", () => {
    if (introScreen && introScreen.classList.contains("show")) {
      advanceIntro();
    }
  });

  // Starfield setup
  const starfield = document.getElementById("starfield");
  if (starfield) {
    const starCount = 80;
    const envelopeText = document.querySelector(".envelope-text");
    const avoidRect = envelopeText
      ? envelopeText.getBoundingClientRect()
      : null;
    const padding = 12;

    function intersectsAvoid(left, top, size) {
      if (!avoidRect) return false;
      const right = left + size;
      const bottom = top + size;
      return !(
        right + padding < avoidRect.left ||
        left - padding > avoidRect.right ||
        bottom + padding < avoidRect.top ||
        top - padding > avoidRect.bottom
      );
    }

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star" + (Math.random() > 0.8 ? " big" : "");
      const size = star.classList.contains("big") ? 12 : 8;
      let placed = false;
      for (let tries = 0; tries < 40; tries++) {
        const leftPx = Math.random() * (window.innerWidth - size);
        const topPx = Math.random() * (window.innerHeight - size);
        if (!intersectsAvoid(leftPx, topPx, size)) {
          star.style.left = `${(leftPx / window.innerWidth) * 100}%`;
          star.style.top = `${(topPx / window.innerHeight) * 100}%`;
          placed = true;
          break;
        }
      }
      if (!placed) {
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
      }
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
      img.src = `./resources/Background/Random/${item.file}`;
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
      // Fade out background song when envelope is opened
      if (bgSong && !bgSong.paused) {
        const fadeOutMs = 2000;
        const steps = 20;
        let current = 0;
        const startVol = bgSong.volume;
        const targetVol = 0.25;
        const outInterval = setInterval(() => {
          current += 1;
          const t = current / steps;
          bgSong.volume = Math.max(targetVol, startVol - (startVol - targetVol) * t);
          if (current >= steps) {
            clearInterval(outInterval);
          }
        }, fadeOutMs / steps);
      }

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

// Sequence for the "No" modal (ordered by 'order' ascending)
const sadSequence = [
  { order: 1, text: "bro...?", src: "./resources/No/silly-funny.gif" },
  { order: 2, text: "u good..? anything wrong?", src: "./resources/No/slushy-noobz-thatmartinkid.gif", audio: "./resources/Audio/vine-boom.mp3" },
  { order: 3, text: "pwease...", src: "./resources/No/slushy-noobz-martin.gif", audio: "./resources/Audio/ceeday-huh-sound-effect.mp3" },
  { order: 4, text: "wtf man", src: "./resources/No/ishowspeed-meme.gif", audio: "./resources/Audio/please-speed-i-need-this.mp3" },
  { order: 5, text: "seriously??", src: "./resources/No/katieCry.gif", audio: "./resources/Audio/sad-meow-song.mp3"},
  { order: 6, text: "last chance... a funny video to convince you!", src: "./resources/No/slush_drop.mp4" },
  { order: 7, text: "ok then... see u sometime i guess....", src: "./resources/No/sadant.jpg", audio: "./resources/Audio/easy.mp3"},
];

const orderedSadSequence = [...sadSequence].sort((a, b) => a.order - b.order);

// Happy sequence (starts after Love You Too is clicked)
const happySequence = [
  {
    order: 1,
    text: "IRISH SPRING GREEN FN",
    src: "./resources/Yes/green-fn.gif",
    audioPlaylist: [
      "./resources/Audio/greengiant.mp3",
      "./resources/Audio/splash.mp3",
      "./resources/Audio/flight.mp3",
      "./resources/Audio/cash.mp3",
    ],
  },
  { order: 2, text: "BOOOOOOM", src: "./resources/Yes/boom.mp4" },
  {
    order: 3,
    text: "Let's friggin go!",
    src: "./resources/Yes/katieb.gif",
    audio: "./resources/Audio/rizz-sound-effect.mp3",
  },
  {
    order: 4,
    text: "YESSS",
    src: "./resources/Yes/rodrick.png",
    audio: "./resources/Audio/yes.mp3",
  },
  {
    order: 5,
    text: "YUH YUH YUH",
    src: "./resources/Yes/dog.mp4",
  },
];

const orderedHappySequence = [...happySequence].sort((a, b) => a.order - b.order);
let happyStarted = false;
let happyIndex = -1;
let happyAudioQueue = [];
let happyAudioIndex = 0;

function normal() {
  var paperText = document.getElementById("paperText");
  if (paperText) {
    paperText.innerText = "Do you want to be my Valentine? 🥺";
  }
}

let counter = 0;
let yesButtonScale = 1;
let loveReady = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function stopHappyAudioLoop() {
  const happyStepAudio = document.getElementById("happyStepAudio");
  if (happyStepAudio) {
    happyStepAudio.onended = null;
    happyStepAudio.pause();
  }
  happyAudioQueue = [];
  happyAudioIndex = 0;
}

function startHappyAudioLoop(list) {
  const happyStepAudio = document.getElementById("happyStepAudio");
  if (!happyStepAudio || !list || list.length === 0) return;

  happyAudioQueue = shuffle([...list]);
  happyAudioIndex = 0;

  const playNext = () => {
    if (happyAudioQueue.length === 0) return;
    if (happyAudioIndex >= happyAudioQueue.length) {
      happyAudioQueue = shuffle([...happyAudioQueue]);
      happyAudioIndex = 0;
    }
    happyStepAudio.src = happyAudioQueue[happyAudioIndex];
    happyAudioIndex += 1;
    happyStepAudio.currentTime = 0;
    happyStepAudio.play().catch(() => {});
  };

  happyStepAudio.onended = playNext;
  playNext();
}

function showHappyStep(step) {
  const loveHeader = document.getElementById("loveHeader");
  const loveVideo = document.getElementById("loveVideo");
  const happyImg = document.getElementById("happyImg");
  const happyVid = document.getElementById("happyVid");
  const loveBtn = document.getElementById("loveNext");

  if (loveHeader && step.text) {
    loveHeader.innerText = step.text;
  }

  if (loveVideo) {
    loveVideo.pause();
    loveVideo.style.display = "none";
  }

  const isVideo = /\.(mp4|webm)$/i.test(step.src);
  if (isVideo) {
    if (happyImg) happyImg.style.display = "none";
    if (happyVid) {
      happyVid.style.display = "block";
      happyVid.src = step.src;
      happyVid.muted = false;
      happyVid.currentTime = 0;
      happyVid.play().catch(() => {});
    }
  } else {
    if (happyVid) {
      happyVid.pause();
      happyVid.style.display = "none";
    }
    if (happyImg) {
      happyImg.style.display = "block";
      happyImg.src = step.src;
    }
  }

  stopHappyAudioLoop();
  if (step.audioPlaylist) {
    startHappyAudioLoop(step.audioPlaylist);
  } else if (step.audio) {
    const happyStepAudio = document.getElementById("happyStepAudio");
    if (happyStepAudio) {
      happyStepAudio.onended = null;
      happyStepAudio.src = step.audio;
      happyStepAudio.currentTime = 0;
      happyStepAudio.play().catch(() => {});
    }
  }

  if (loveBtn) {
    if (happyIndex >= orderedHappySequence.length - 1) {
      loveBtn.innerText = "Send me home";
    } else {
      loveBtn.innerText = "Click to receive more of my love!";
    }
  }
}

function advanceHappySequence() {
  if (orderedHappySequence.length === 0) return;
  happyIndex = Math.min(happyIndex + 1, orderedHappySequence.length - 1);
  const step = orderedHappySequence[happyIndex];
  showHappyStep(step);
}

function no() {
  counter++;

  // Make the yes button bigger each time no is clicked
  yesButtonScale += 0.2;
  const yesButton = document.getElementById("yesMain");
  if (yesButton) {
    const yesRect = yesButton.getBoundingClientRect();
    const maxScaleX =
      (window.innerWidth - 12 - yesRect.left) / yesButton.offsetWidth;
    const clampedScale = Math.min(yesButtonScale, Math.max(1, maxScaleX));
    yesButtonScale = clampedScale;
    yesButton.style.transform = `scale(${yesButtonScale})`;
  }

  // Shake the "No" button
  const noMain = document.getElementById("noMain");
  const noModal = document.getElementById("noModal");
  const noButton =
    (noModal && noModal.offsetParent !== null && noModal) || noMain;
  if (noButton) {
    noButton.classList.remove("btn-shake");
    void noButton.offsetWidth;
    noButton.classList.add("btn-shake");
    if (yesButton) {
      const baseWidth = yesButton.offsetWidth;
      const extraWidth = baseWidth * (yesButtonScale - 1);
      noButton.style.marginLeft = `${Math.max(0, extraWidth + 12)}px`;
    }
  }

  // Show the sad modal only after 10 "No" clicks
  if (counter >= 10) {
    let noSequenceAudio = document.getElementById("noSequenceAudio");
    let sadStepAudio = document.getElementById("sadStepAudio");
    let model = document.getElementById("model");
    model.style.display = "flex";
    document.body.classList.add("compact-paper");
    document.body.classList.add("paper-hidden");
    const btns = document.getElementById("btns");
    if (btns) {
      btns.style.display = "none";
    }
    const modelImage = document.getElementById("modelImg");
    const modelVideo = document.getElementById("modelVid");
    const modelText = document.getElementById("modelText");
    const modalYes = model ? model.querySelector("#yesModal") : null;
    const modalNo = model ? model.querySelector("#noModal") : null;
    const homeBtn = document.getElementById("homeBtn");
    const stepIndex = Math.min(counter - 10, orderedSadSequence.length - 1);
    const step = orderedSadSequence[stepIndex];
    const isVideo = /\.(mp4|webm)$/i.test(step.src);
    if (isVideo) {
      modelImage.style.display = "none";
      modelVideo.style.display = "block";
      modelVideo.src = step.src;
      modelVideo.muted = false;
      modelVideo.currentTime = 0;
      modelVideo.play().catch(() => {});
    } else {
      modelVideo.pause();
      modelVideo.style.display = "none";
      modelVideo.muted = true;
      modelImage.style.display = "block";
      modelImage.src = step.src;
    }
    modelText.innerText = step.text;

    if (stepIndex >= orderedSadSequence.length - 1) {
      if (modalYes) modalYes.style.display = "none";
      if (modalNo) modalNo.style.display = "none";
      if (homeBtn) homeBtn.style.display = "inline-block";
    }

    if (step.order === 1 && noSequenceAudio) {
      noSequenceAudio.currentTime = 0;
      noSequenceAudio.play();
    } else if (noSequenceAudio) {
      noSequenceAudio.pause();
    }

    if (step.order === 1 && bgSong) {
      bgSong.pause();
      bgSong.currentTime = 0;
    }

    if (sadStepAudio) {
      if (step.audio) {
        if (sadStepAudio.src !== step.audio) {
          sadStepAudio.src = step.audio;
        }
        sadStepAudio.currentTime = 0;
        sadStepAudio.play().catch(() => {});
      } else {
        sadStepAudio.pause();
      }
    }
  }
}

function yes() {
  const model = document.getElementById("model2");
  const sadModel = document.getElementById("model");
  const btns = document.getElementById("btns");
  const paperText = document.getElementById("paperText");
  const loveHeader = document.getElementById("loveHeader");
  const loveVideo = document.getElementById("loveVideo");
  const correctAudio = document.getElementById("correctAudio");
  const bgSong = document.getElementById("bgSong");
  const noSequenceAudio = document.getElementById("noSequenceAudio");
  const sadStepAudio = document.getElementById("sadStepAudio");
  const modelVideo = document.getElementById("modelVid");
  const loveBtn = document.getElementById("loveNext");

  // Stop any other audio when "Yes" is clicked
  [bgSong, noSequenceAudio, sadStepAudio].forEach((audio) => {
    if (audio) {
      audio.pause();
    }
  });

  if (modelVideo) {
    modelVideo.pause();
    modelVideo.currentTime = 0;
    modelVideo.muted = true;
  }

  if (sadModel) sadModel.style.display = "none";
  document.body.classList.add("compact-paper");
  document.body.classList.add("paper-hidden");
  if (btns) btns.style.display = "none";
  if (paperText) {
    paperText.innerText = "I LOVE YOU!";
  }
  if (loveHeader) {
    loveHeader.innerText = "I LOVE YOU!";
  }

  if (loveVideo) {
    loveVideo.src = "./resources/Yes/Crumbl.mp4";
    loveVideo.muted = false;
    loveVideo.currentTime = 0;
  }

  if (model) {
    model.style.display = "none";
    setTimeout(() => {
      model.style.display = "flex";
    }, 100);
  }

  if (loveBtn) {
    loveBtn.innerText = "Click to receive more of my love!";
  }

  if (correctAudio) {
    correctAudio.onended = () => {
      if (loveVideo) {
        loveVideo.play().catch(() => {});
      }
    };
    correctAudio.currentTime = 0;
    correctAudio.play().catch(() => {
      if (loveVideo) {
        loveVideo.play().catch(() => {});
      }
    });
  } else if (loveVideo) {
    loveVideo.play().catch(() => {});
  }

  loveReady = true;
  happyStarted = false;
  happyIndex = -1;
}

function ly2() {
  if (!loveReady) return;
  if (!happyStarted) {
    happyStarted = true;
  }
  if (happyIndex >= orderedHappySequence.length - 1) {
    goHome();
  } else {
    advanceHappySequence();
  }
}

function goHome() {
  window.location.reload();
}
