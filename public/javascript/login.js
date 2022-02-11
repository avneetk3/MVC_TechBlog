/*async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("in login js"+ response);
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}*/
const userLogin = async(e) =>{
    e.preventDefault();
    //try to fetch user info with provided login details:
    let username = document.querySelector('#userName').value.trim();
    let password = document.querySelector('#password').value.trim();
    console.log(username);
    const response = await fetch('/api/users/login',{
        method: 'post',
        body: JSON.stringify({
            username,
            password
        }),
         headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        if(response.status == 400){
          alert("No user with that username!!")
        }else{
          alert("Incorrect Password. Try again")
        }
    }

    console.log('trying to login the user')
}

document.querySelector('.loginForm').addEventListener('submit', userLogin);