const apiKey = "pub_5172118ac7212a8c3079150ce165b57bea283"; // Updated API key

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchNews(query = "news") {
    try {
        const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data.results; // Assuming 'results' is the correct key based on the API response
    } catch (error) {
        console.log("Error fetching news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.image_url || "default-image.jpg"; // Use 'image_url' and a fallback image if needed
        img.alt = article.title || "No title available";

        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30
            ? article.title.slice(0, 30) + "..."
            : article.title || "No title available";
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120
            ? article.description.slice(0, 120) + "..."
            : article.description || "No description available";
        description.textContent = truncatedDes;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.style.cursor = "pointer";

        blogCard.addEventListener('click', () => {
            if (article.link) { // Use the correct key for the URL (replace 'link' with the correct key if necessary)
                window.open(article.link, "_blank"); // Open the article URL in a new tab or window
            } else {
                alert("No URL available for this article.");
            }
        });
        
        blogContainer.appendChild(blogCard);
    });
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    const articles = await fetchNews(query);
    displayBlogs(articles);
});

(async () => {
    try {
        const articles = await fetchNews();
        displayBlogs(articles);
    } catch (error) {
        console.log("Error fetching random news", error);
    }
})();
