async function signupFormHandler(event) {
    event.preventDefault();

    const userName = document.querySelector('#userName').value.trim();
    const password = document.querySelector('#signUpPassword').value.trim();

    if (userName && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username: userName,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {console.log(response)});

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signUpForm').addEventListener('submit', signupFormHandler);