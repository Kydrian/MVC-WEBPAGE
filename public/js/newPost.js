const newPostFormHandler = async (event) => {
    event.preventDefault();


    const title = document.querySelector('#update-title').value
    const content = document.querySelector('#update-content').value
    const id = document.querySelector('#id').textContent;


    if (title && content) {
        const response = await fetch(`/api/posts/`, {
            method: 'PUT',
            body: JSON.stringify({
                "title": title,
                "content": content
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#edit-form').addEventListener('submit', newPostFormHandler)