async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value;
    const post_content = document.querySelector('textarea[name="contentPost"]').value.trim();

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.postNewForm').addEventListener('submit', newFormHandler);