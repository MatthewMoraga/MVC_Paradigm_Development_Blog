
// getting the unique id of the post by splitting the URL
// into an array of strings based on the / path and then
// grabs the last element of the split array of strings

const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length -1
];

// this function updates the current blogpost
// when the user clicks on the edit post link on thier dashboard
// then they are taken to the edit post screen where they can edit their post and title
// when the user clicks on the edit post button on the edit page the event listener
// is initiated and the server responds back with a PUT request that grabs the post's id
// then the content and/or the title is changed and the user is sent back to the dashboard
// where they can see their changes

const updateBlogPostFormHandling = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#edit-post-title").value.trim();
    const content = document.querySelector("#edit-post-content").value.trim();

    if (title && content) {
        const editResponse = await fetch(`/api/posts/${post_id}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (editResponse.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("post not edited");
        }
    }
};

// this function deletes the post from the edit page
// when the user clicks the delete button the event listener is initiated
// and the server responds back with a DELETE request that grabs the
// post's id and is then deleted along with any comments attached to the post 

const deletePostOnEditForm = async (event) => {
    event.preventDefault();

    const deletePostOnEditResponse = await fetch(`/api/posts/${post_id}`, {
        method: DELETE,
    });

    if (deletePostOnEditResponse.ok) {
        document.location.replace("/dashboard");
    } else {
        alert("no post deleted");
    }
};

// event listener for the edit post button on the edit page

const editPostButton = document.querySelector("#edit-post-button");

if (editPostButton) {
    editPostButton.addEventListener("click", updateBlogPostFormHandling);
}

// event listener for the delete button on the edit page works the same as
// the delete button on the dashboard

const deletePostButton = document.querySelector("#delete-post-button");

if (deletePostButton) {
    deletePostButton.addEventListener("click", deletePostOnEditForm);
}

