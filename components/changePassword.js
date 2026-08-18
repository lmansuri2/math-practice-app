const newPass = document.getElementById("pwd").value;
const confirmNewPass = document.getElementById("pwd2").value;

function checkIfMatched() {
  if (newPass === confirmNewPass) {
    document.getElementById("changePassBtn").disabled = false;
  }
}
