// a function that handles the comment functionality on the post page
// post_id parse the last element of the pathname from window.location
// and converts it to an integer which gets the unique identifier
// from the URL of the post to match it to its comments
// when the user enters a comment and hits the submit button
// then an event listener is triggered on the form that checks and adds
// the users comment to the database with a post method  

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