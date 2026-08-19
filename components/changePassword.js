const SUPABASE_URL = "https://gsszojjdaxlmletbfosi.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_hxL69S5DJ2IFaQvLd-N6Eg_yRMpjNA6";

// Initialize the web client with explicit session tracking for the recovery link
const supabaseWeb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const updatePass = document.getElementById("changePassBtn");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

updatePass.addEventListener("click", validatePass);

async function validatePass() {
  const newPass = document.getElementById("pwd").value;
  if (newPass.match(passwordRegex)) {
    await supabaseWeb.auth.updateUser({ password: newPass });
  } else {
    alert(
      "Make sure your password is at least 8 characters long and has a mix of letters and special characters",
    );
  }
}
