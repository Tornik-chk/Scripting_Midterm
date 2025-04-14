const firstname = document.getElementById("Firstname");
const lastname = document.getElementById("Lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("groupform");

const techCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const techContainer = document.querySelector(".technologies").parentElement;
const techError = techContainer.querySelector(".error");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInput();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (errorDisplay) {
    errorDisplay.innerText = message;
  }

  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (errorDisplay) {
    errorDisplay.innerText = "";
  }

  inputControl.classList.remove("error");
  inputControl.classList.add("success");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInput = () => {
  const nameVal = firstname.value.trim();
  const lastnameVal = lastname.value.trim();
  const emailVal = email.value.trim();
  const passwordVal = password.value.trim();

  if (nameVal === "") {
    setError(firstname, "First name is required");
  } else {
    setSuccess(firstname);
  }

  if (lastnameVal === "") {
    setError(lastname, "Last name is required");
  } else {
    setSuccess(lastname);
  }

  if (emailVal === "") {
    setError(email, "Email address is required");
  } else if (!isValidEmail(emailVal)) {
    setError(email, "Invalid email format");
  } else {
    setSuccess(email);
  }

  if (passwordVal === "") {
    setError(password, "Password is required");
  } else if (passwordVal.length < 8) {
    setError(password, "Password must be at least 8 characters long");
  } else {
    setSuccess(password);
  }

  const checkedTechs = Array.from(techCheckboxes).filter((cb) => cb.checked);
  if (checkedTechs.length < 3) {
    techError.innerText = "Choose at least 3 technologies";
  } else {
    techError.innerText = "";
  }
};
