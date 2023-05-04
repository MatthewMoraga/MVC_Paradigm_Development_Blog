const addComment = async (event) => {
    event.preventDefault();

    const post_id = parseInt(window.location.pathname.split("/").pop());

    const content = document.querySelector(".comment-content").value.trim();

    if (content) {
        const commentResponse = await fetch(`/api/comments`, {
            method: "POST",
            body: JSON.stringify({ comment_text: content, post_id }),
            headers: { "Content-Type": "application/json"}
        });

        if(commentResponse.ok) {
            document.location.reload();
        } else {
            console.log("status:", commentResponse.status)
            console.log("text:", await commentResponse.text())
            alert("no comment added");
        }
    }
};

const addCommentForm = document.querySelector(".comment-form");
if (addCommentForm) {
    addCommentForm.addEventListener("submit", addComment)
}