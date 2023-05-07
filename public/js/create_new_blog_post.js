// function the makes a new blogpost with the attributes from the Post model
// sends a fetch request to /api/posts and stringifies title, content from the Post model
// then js tells the browser that the content-type is json
// then a submit event is listened for
// then upon success the user is taken to the dashboard page where they will see their new post
// otherwise throw the user an alert error
// then the event listener checks to see of the conditions and values are there and initiates the function


const createNewBlogPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector("#create-blog-post-title").value.trim();
    const content = document.querySelector("#create-blog-post-content").value.trim();

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

// event listener for the form submit button on the create post page

const createNewBlogPostForm = document.querySelector(".create-blog-post-form");
if (createNewBlogPostForm) {
    createNewBlogPostForm.addEventListener("submit", createNewBlogPost);
}