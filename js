let currentPage = 1;
let currentKeyword = "";

async function searchImages(newSearch = true) {
  const keyword = document.getElementById("keyword").value;
  const resultsDiv = document.getElementById("results");

  // If it's a new search, reset everything
  if (newSearch) {
    currentKeyword = keyword;
    currentPage = 1;
    resultsDiv.innerHTML = "";
  }

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${currentKeyword}&page=${currentPage}&per_page=30&client_id=YOUR_ACCESS_KEY`
  );

  const data = await response.json();

  if (data.results.length > 0) {
    // Shuffle results randomly
    const shuffled = data.results.sort(() => 0.5 - Math.random());

    // Show 6 random photos from this page
    const selected = shuffled.slice(0, 6);

    selected.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.urls.regular;
      img.alt = currentKeyword;
      resultsDiv.appendChild(img);
    });

    currentPage++; // move to next page for future fetch
  } else {
    resultsDiv.innerHTML += "<p>No more results found.</p>";
  }
}

// Detect when user scrolls near bottom
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    // Load more results if available
    if (currentKeyword) {
      searchImages(false);
    }
  }
});
