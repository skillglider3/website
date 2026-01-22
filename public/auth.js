function checkStrength(){
  const pass = document.getElementById("password").value;
  const bar = document.getElementById("strengthText");

  if(pass.length < 6){
    bar.style.width = "33%";
    bar.style.background = "red";
    bar.innerText = "Weak";
  }
  else if(pass.match(/[0-9]/) && pass.match(/[A-Z]/)){
    bar.style.width = "100%";
    bar.style.background = "green";
    bar.innerText = "Strong";
  }
  else{
    bar.style.width = "66%";
    bar.style.background = "orange";
    bar.innerText = "Medium";
  }
}

async function signup(){
  const data = {
    name: name.value,
    phone: phone.value,
    username: username.value,
    password: password.value
  };

  const res = await fetch("/signup",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify(data)
  });
  alert((await res.json()).message);
}

async function login(){
  const res = await fetch("/login",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      username: loginUsername.value,
      password: loginPassword.value
    })
  });

  const data = await res.json();
  alert(data.success ? "Login Success" : "Invalid Credentials");
}
