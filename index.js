window.addEventListener("load", () => {
  function handleConfirm() {
    window.location.href = "success.html";
  }

  function handleContinue() {
    window.location.href = "index.html";
  }

  const cardNameInput = document.querySelector("#input-card-name");

  const cardTypeSpan = document.querySelector("#error-text");
  const cardNumInput = document.querySelector('.form input[placeholder="e.g. 1234 5678 9123 0000"]');
  const cardExpireMMInput = document.querySelector('.form input.date[placeholder="MM"]');
  const cardExpireYYInput = document.querySelector("#year-input");
  const cardNameSpan = document.querySelector('.card-name');
  const cardNumSpan = document.querySelector('.card-num');
  const cardExpireSpan = document.querySelector('.card-expire');

  cardNameInput.addEventListener("input", updateCardName);
  cardNumInput.addEventListener('input', updateCardNumber);
  cardExpireMMInput.addEventListener('input', validateMonth);
  cardExpireYYInput.addEventListener('input', validateYear);

  function updateCardName() {
    const name = cardNameInput.value.trim() || "Jane Appleseed";
    renderAnimatedText(cardNameSpan, name);
  }
  
  function updateCardNumber(event) {
    let rawCardNumber = sanitizeCardNumber(cardNumInput.value);
    rawCardNumber = limitCardLength(rawCardNumber, event.data);
  
    const formattedCardNumber = formatCardNumber(rawCardNumber);
    renderAnimatedText(cardNumSpan, formattedCardNumber);
  
    cardNumInput.value = formattedCardNumber;
    validateAndDisplayCardType(rawCardNumber);
  }
  
  function sanitizeCardNumber(cardNumber) {
    return cardNumber.replace(/\D/g, ''); // Elimina todo lo que no sea número
  }
  
  function limitCardLength(cardNumber, newChar) {
    return cardNumber.length > 16 ? cardNumber.slice(0, 15) + newChar : cardNumber;
  }
  
  function formatCardNumber(cardNumber) {
    return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
  }
  
  function renderAnimatedText(targetElement, newText) {
    targetElement.innerHTML = ""; // Limpia el contenido anterior
    newText.split("").forEach((char, index, arr) => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      if (index === arr.length - 1) charSpan.classList.add("bounce-in"); // Agrega animación solo al último carácter
      targetElement.appendChild(charSpan);
    });
  }
  

  function validateAndDisplayCardType(cardNumber) {
    const result = validateCreditCard(cardNumber);
    if (cardNumber?.length > 4) {
      cardTypeSpan.textContent = result.isValid ? `Type: ${result.type}` : "Invalid Card";
      cardTypeSpan.style.color = result.isValid ? "green" : "red";
    } else {
      cardTypeSpan.textContent = "";
    }
  }

  function validateCreditCard(cardNumber) {
    if (cardNumber.length < 13 || cardNumber.length > 16) return { isValid: false, type: "Invalid number" };
    if (!luhnCheck(cardNumber)) return { isValid: false, type: "No valid Luhn" };
    return { isValid: true, type: getCardType(cardNumber) };
  }

  function luhnCheck(number) {
    let sum = 0, shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i], 10);
      if (shouldDouble) digit = digit * 2 > 9 ? digit * 2 - 9 : digit * 2;
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  function getCardType(number) {
    const patterns = { Visa: /^4\d{12,15}$/, Mastercard: /^5[1-5]\d{14}$|^2[2-7]\d{14}$/, Amex: /^3[47]\d{13}$/ };
    for (const [card, regex] of Object.entries(patterns)) if (regex.test(number)) return card;
    return "Unknown";
  }
  function validateMonth() {
    let MM = cardExpireMMInput.value.replace(/\D/g, "");
    
    if (MM.length === 2) {
      MM = Math.max(1, Math.min(12, Number(MM))).toString().padStart(2, '0'); 
      cardExpireMMInput.value = MM;
      cardExpireYYInput.focus();
    }
    
    updateCardExpire();
  }
  
  function validateYear() {
    let YY = cardExpireYYInput.value.replace(/\D/g, "");
    const currentYear = new Date().getFullYear();
    const minYear = currentYear % 100; 
  
    if (YY.length === 2) {
      if (Number(YY) < minYear) YY = minYear.toString();
      cardExpireYYInput.value = YY;
      cardCvcInput.focus(); 
    }
    
    updateCardExpire();
  }
  
  function updateCardExpire() {
    const MM = cardExpireMMInput.value.padStart(2, '0');
    const YY = cardExpireYYInput.value.padStart(2, '0');
    cardExpireSpan.textContent = `${MM}/${YY}`;
  }
});
