import React, { useState } from "react";

const strengthLabels = ["faible", "medium", "fort"];

export const FormLogin = () => {
const [strength, setStrength] = useState("");

const getStrength = (password) => {
let strengthIndic = -1,
upper = false,
lower = false,
numbers = false;

for (let i = 0; i < password.length; i++) {
  const char = password.charCodeAt(i);
  if (!upper && char >= 65 && char <= 90) {
    upper = true;
    strengthIndic++;
  }
  if (!numbers && char >= 48 && char <= 57) {
    numbers = true;
    strengthIndic++;
  }
  if (!lower && char >= 97 && char <= 122) {
    lower = true;
    strengthIndic++;
  }
}
setStrength(strengthLabels[strengthIndic]);

};
const handleChange = (event) => getStrength(event.target.value);

return (
  <div>
    <input
      name="password"
      spellCheck="false"
      className="control"
      type="password"
      placeholder="Mot de passe"
      onChange={handleChange}
    />
    <div className={`bars ${strength}`}>
      <div></div>
    </div>
    <div className="strength">
      {strength && <>{strength} password</>}
    </div>
  </div>
);
}

export default FormLogin;