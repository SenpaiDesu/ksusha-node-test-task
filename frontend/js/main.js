const basicUrl = 'http://localhost:4000';

function onSignIn(){
  const username = document.querySelector("input[name='username']").value;
  const password = document.querySelector("input[name='password']").value;
  const errorMsgElement = document.querySelector('#error');
  
  fetch(`${basicUrl}/signin`, { 
    method: 'post', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }) 
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) errorMsgElement.innerHTML = data.error;
      else {
        document.cookie = `auth=${data.token}`;
        localStorage.setItem('auth', data.token);
        location.replace(`${basicUrl}/addtask`);
      }
    })
}

function onSendTask(){
  const task = document.querySelector("textarea[name='task']").value;
  const msgElement = document.querySelector('#message');

  fetch(`${basicUrl}/addtask`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'auth': localStorage.getItem('auth')
    },
    body: JSON.stringify({ task })
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) msgElement.innerHTML = data.error;
      else msgElement.innerHTML = data.message;
    })
}

