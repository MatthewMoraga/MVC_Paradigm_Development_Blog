// function the makes a new blogpost with the attributes from the Post model
// sends a fetch request to /api/posts and stringifies title, content from the Post model
// then js tells the browser that the content-type is json
// then a submit event is listened for
// then upon success the user is taken to the dashboard page where they will see their new post
// otherwise throw the user an alert error


const createNewBlogPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#blogPostTitlePost").value.trim();
    const content = document.querySelector("#blogPostContentPost").value.trim();

    if (title && content) {
        const blogPostResponse = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        });

        if (blogPostResponse.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("new blog post failed");
        }
    }
};

const createNewBlogPostForm = document.querySelector(".createBlogPostForm");
if (createNewBlogPostForm) {
    createNewBlogPostForm.addEventListener("submit", createNewBlogPost);
}