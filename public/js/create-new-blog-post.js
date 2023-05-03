const createNewBlogPost = async (event) => {
    event.preventDefault();

    const blogPostTitle = document.querySelector("#blogPostTitlePost").value.trim();
    const blogPostContent = document.querySelector("#blogPostContentPost").value.trim();

    if (blogPostTitle && blogPostContent) {
        const blogPostResponse = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({ blogPostTitle, blogPostContent }),
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