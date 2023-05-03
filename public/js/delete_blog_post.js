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

document.addEventListener("click", deletePostHandling);