const closeModalButton = document.querySelector('#close-modal');
const openModalButton = document.querySelector('#submit-btn');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

const form = document.querySelector('#form');

openModalButton.addEventListener('click', (e) => submitForm(e));

[closeModalButton, fade].forEach((el) => {
  el.addEventListener('click', () => {
    toggleModal();
    form.reset();
  });
});

const toggleModal = () => {
  [modal, fade].forEach((el) => el.classList.toggle('hide'));
};

const submitForm = (e) => {
  e.preventDefault();

  const userName = document.querySelector('#name').value;
  const userEmail = document.querySelector('#email').value;
  const userPhone = document.querySelector('#phone').value;
  const userInterest = document.querySelector('#interest').value;

  const arrInputsValues = [userName, userEmail, userPhone, userInterest];

  const hasEveryInputs = arrInputsValues.every((input) => {
    return input !== '';
  });

  if (hasEveryInputs) toggleModal();
};
