document.getElementById("runTestButton").addEventListener("click", function () {
  const button = this;
  const buttonText = button.querySelector(".button-text");
  const loadingTextElement = button.querySelector(".loading-text");
  let dotCount = 0;
  let dotInterval;

  const resetButton = () => {
    button.classList.remove('running');
    buttonText.textContent = "Run WebdriverIO script!";
    button.disabled = false;
    button.style.backgroundColor = "#4CAF50";
    clearInterval(dotInterval);
    loadingTextElement.innerText = "";
  };

  const startTest = () => {
    button.style.backgroundColor = "#808080";
    button.disabled = true;
    button.classList.add('running');
    buttonText.textContent = "Running WebdriverIO script";
    alert("Test has been successfully started!");

    const loadingText = ["", ".", "..", "..."];
    dotInterval = setInterval(() => {
      loadingTextElement.innerText = loadingText[dotCount];
      dotCount = (dotCount + 1) % loadingText.length;
    }, 500);
  };

  const handleTestCompletion = () => {
    clearInterval(dotInterval);
    loadingTextElement.innerText = "";
    button.classList.remove('running');
    buttonText.textContent = "Done!";
    
    setTimeout(() => {
      alert("Test has been successfully finished!");
      resetButton();
    }, 500);
  };

  startTest();

  fetch("/run_wdio.sh", { method: "POST" })
    .then((response) => {
      if (response.ok) {
        return fetch("/test_output.txt");
      } else {
        throw new Error("Error starting the test!");
      }
    })
    .then((response) => response.text())
    .then((data) => {
      console.log("Test results:", data);
      handleTestCompletion();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to start the test.");
      resetButton();
    });
});
