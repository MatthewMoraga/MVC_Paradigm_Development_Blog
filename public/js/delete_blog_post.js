// a function that handles the delete button functionality
// when the user hits the delete button the server responds back
// to check the values of the post to match with the database
// then when it deletes the post the page reloads 
// if there is something wrong or values don't match then 
// throw the user an error
// then the event listener checks for a button press


const deletePost = async (post_id) => {
    const deleteResponse = await fetch(`/api/posts/${post_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });

    if (deleteResponse.ok) {
        document.location.reload();
    } else {
        alert("not able to delete post");
    }
};

const deletePostHandling = (event) => {
    if (event.target.matches(".delete-post")) {
        const post_id = event.target.getAttribute("data-post-id");
        deletePost(post_id);
    }
};

// event listener for the delete button on the dashboard page

document.addEventListener("click", deletePostHandling);