const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-body').value
    const userID = document.querySelector('#comment-body').value
    const postID = document.querySelector('#comment-body').value
   


    if (comment) {
        const response = await fetch(`/api/comments`, {
            method: 'Post',
            body: JSON.stringify({
                "user_id": userID,
                "post_id": postID,
                "comment": comment
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

document.querySelector('#edit-form').addEventListener('submit', commentHandler)