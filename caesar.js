const form = document.getElementById("controls");
const hInput = document.querySelector("#heading-input");
const hOutput = document.querySelector("#heading-output");
const selectEncodeOrDecode = document.getElementsByName("code");
const inputText = document.getElementById("input-text");
const outputText = document.getElementById("output-text");
const shiftKey = document.getElementById("shift-input");
const modulo = document.getElementById("mod-input");
const alphabet = document.getElementById("alphabet-input");

selectEncodeOrDecode.forEach((option) => {
  option.addEventListener("click", () => {
    if (option.value === "encode") {
      hInput.textContent = "Plaintext";
      hOutput.textContent = "Ciphertext";
      inputText.value = "";
      outputText.textContent = "";
    } else if (option.value === "decode") {
      hInput.textContent = "Ciphertext";
      hOutput.textContent = "Plaintext";
      inputText.value = "";
      outputText.textContent = "";
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let inputTextValue = inputText.value;
  let selectedOption = Array.from(selectEncodeOrDecode).find(
    (option) => option.checked
  );
  let shiftValue = parseInt(shiftKey.value);
  let moduloValue = parseInt(modulo.value);
  let alphabetValue = alphabet.value;

  function caesarCipher(decode, text, shift, mod, charset) {
    if (decode == "decode") {
      shift = -shift;
    }
    charset = charset.toLowerCase();
    text = text.replace(/[^a-zA-Z]/g, "");
    let result = "";
    for (let i = 0; i < text.length; i++) {
      let char = text.charAt(i);
      const index = charset.indexOf(char.toLowerCase());
      if (index !== -1) {
        let newIndex = (index + shift) % mod;
        if (newIndex < 0) {
          newIndex += mod;
        }
        result += charset[newIndex];
      }
    }
    return result;
  }
  let cipherOutput = caesarCipher(
    selectedOption.value,
    inputTextValue,
    shiftValue,
    moduloValue,
    alphabetValue
  );
  outputText.textContent = cipherOutput;
});
