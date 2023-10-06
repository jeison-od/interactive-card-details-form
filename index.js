function handleConfirm() {
  const redirection = "success.html";

  window.location.href = redirection;
}

function handleContinue() {
  const Home = "index.html";

  window.location.href = Home;
}

const cardNameInput = document.querySelectorAll("#card-num");
//   const cardNumInput = document.querySelector('.form input[placeholder="e.g. 1234 5678 9123 0000"]');
//   const cardExpireMMInput = document.querySelector('.form input.date[placeholder="MM"]');
//   const cardExpireYYInput = document.querySelector('.form input.date[placeholder="YY"]');
//   const cardNameSpan = document.querySelector('.card-name');
//   const cardNumSpan = document.querySelector('.card-num');
//   const cardExpireSpan = document.querySelector('.card-expire');

// Listen for input changes
cardNameInput.addEventListener("input", updateCardName);
//   cardNumInput.addEventListener('input', updateCardNumber);
//   cardExpireMMInput.addEventListener('input', updateCardExpire);
//   cardExpireYYInput.addEventListener('input', updateCardExpire);

function updateCardName() {
  cardNameSpan.textContent = cardNameInput.value;
}

//   function updateCardNumber() {
//     // Remove spaces and format the card number as four groups of four digits
//     const formattedCardNumber = cardNumInput.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
//     cardNumSpan.textContent = formattedCardNumber;
//   }

//   function updateCardExpire() {
//     const MM = cardExpireMMInput.value.padStart(2, '0');
//     const YY = cardExpireYYInput.value.padStart(2, '0');
//     cardExpireSpan.textContent = `${MM}/${YY}`;
//   }
