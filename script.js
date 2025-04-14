const firstname = document.getElementById("Firstname");
const lastname = document.getElementById("Lastname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("groupform");

const techCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const techContainer = document.querySelector(".technologies").parentElement;
const techError = techContainer.querySelector(".error");
const links = document.querySelectorAll('link[rel="stylesheet"]');
const gameDiv = document.querySelector(".game");

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
  let isValid = true;

  if (nameVal === "") {
    setError(firstname, "First name is required");
    isValid = false;
  } else {
    setSuccess(firstname);
  }

  if (lastnameVal === "") {
    setError(lastname, "Last name is required");
    isValid = false;
  } else {
    setSuccess(lastname);
  }

  if (emailVal === "") {
    setError(email, "Email address is required");
    isValid = false;
  } else if (!isValidEmail(emailVal)) {
    setError(email, "Invalid email format");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (passwordVal === "") {
    setError(password, "Password is required");
    isValid = false;
  } else if (passwordVal.length < 8) {
    setError(password, "Password must be at least 8 characters long");
    isValid = false;
  } else {
    setSuccess(password);
  }

  const checkedTechs = Array.from(techCheckboxes).filter((cb) => cb.checked);
  if (checkedTechs.length < 3) {
    techError.innerHTML = `<img src="images/Error.png" alt="!" style="height: 14px; vertical-align: middle; margin-right: 6px;" />
    Choose at least 3 technologies`;
    isValid = false;
  } else {
    techError.innerText = "";
  }
  if (isValid) {
    displayGame();
  }
};

function displayGame() {
  form.style.display = "none";
  LinkGameCSS();
  gameDiv.style.display = "flex";
}

function LinkGameCSS() {
  links.forEach((link) => {
    if (link.href.includes("group_form.css")) {
      link.remove(); // or: link.parentNode.removeChild(link);
    }
  });
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "GameCSS.css";
  document.head.appendChild(link);
}
