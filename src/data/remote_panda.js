document.addEventListener("DOMContentLoaded", () => {
  const eyeL = document.getElementById("eyeL");
  const eyeR = document.getElementById("eyeR");
  const handL = document.getElementById("handL");
  const handR = document.getElementById("handR");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const speechBubble = document.getElementById("speechBubble");

  // Kiểm tra nếu các phần tử tồn tại thì thêm sự kiện
  if (eyeL && eyeR && handL && handR && username && password) {
    const Eyestyle = () => {
      eyeL.style.cssText =
        "left: 0.6em; top: 0.6em; transition: all 0.3s ease;";
      eyeR.style.cssText =
        "right: 1.6em; top: 0.6em; transition: all 0.3s ease;";
    };

    const HandStyle = () => {
      handL.style.cssText =
        "height: 2.81em; top: 6.4em; left: 9.5em; transform: rotate(0deg); transition: all 0.3s ease;";
      handR.style.cssText = "";
    };

    const WinkStyle = () => {
      eyeL.style.cssText += "width: 0.5em; height: 0.2em;";
      setTimeout(() => {
        eyeL.style.cssText += "width: 0.8em; height: 0.8em;";
      }, 300);
    };

    // Lắng nghe sự kiện focus vào username
    username.addEventListener("focus", () => {
      eyeL.style.cssText =
        "left: 0.75em; top: 1.12em; transition: all 0.3s ease;";
      eyeR.style.cssText =
        "right: 1.75em; top: 1.12em; transition: all 0.3s ease;";
      HandStyle();
      if (speechBubble) {
        speechBubble.textContent = "Hello! Enter your username 👋";
        speechBubble.style.visibility = "visible";
      }
    });

    password.addEventListener("focus", () => {
      handL.style.cssText =
        "height: 8.56em; top: 0.87em; left: 6.75em; transform: rotate(-232deg); transition: all 0.3s ease;";
      handR.style.cssText =
        "height: 8.56em; top: 0.87em; right: 6.75em; transform: rotate(231deg); transition: all 0.3s ease;";
      Eyestyle();
      if (speechBubble) {
        speechBubble.textContent = "Shh... Keep your password safe! 🔒";
        speechBubble.style.visibility = "visible";
      }
    });

    document.addEventListener("click", (e) => {
      if (e.target !== username && e.target !== password) {
        Eyestyle();
        HandStyle();
        if (speechBubble) {
          speechBubble.style.visibility = "hidden";
        }
      }
    });

    // Nháy mắt định kỳ
    setInterval(() => {
      WinkStyle();
    }, 4000);
  } else {
    console.log("Một số phần tử không tồn tại");
  }
});
