// Add a new URL input field for song/video URLs
function addSongVideoUrl() {
    const container = document.getElementById("songVideoUrlsContainer");
    const input = document.createElement("input");
    input.type = "url";
    input.className = "form-control";
    input.name = "songVideoUrls";
    input.placeholder = "Enter a song/video URL";
    container.appendChild(input);
}
// Handle form submission
document.getElementById("artistRequestForm").addEventListener("submit", function(e) {
    e.preventDefault();
    // Collect form data
    const artistName = document.getElementById("artistName").value;
    const musicGenre = document.getElementById("musicGenre").value;
    const socialMediaUrls = document.getElementById("socialMediaUrls").value;
    const songVideoUrls = Array.from(document.querySelectorAll("#songVideoUrlsContainer input")).map((input)=>input.value).filter((url)=>url);
    const explicitLyrics = document.getElementById("explicitLyrics").checked ? "Yes" : "No";
    const description = document.getElementById("description").value;
    // Build the thank you page HTML
    const thankYouPage = `
          <div class="container">
              <h1>Thank You!</h1>
              <p><strong>Artist Name:</strong> ${artistName}</p>
              <p><strong>Music Genre:</strong> ${musicGenre}</p>
              <p><strong>Social Media URLs:</strong> ${socialMediaUrls}</p>
              <p><strong>Example Song/Video URLs:</strong> ${songVideoUrls.join(", ")}</p>
              <p><strong>Explicit Lyrics:</strong> ${explicitLyrics}</p>
              <p><strong>Description:</strong> ${description}</p>
              <button class="btn-primary" onclick="window.location.reload();">Add More</button>
          </div>
      `;
    // Display the thank you page
    document.querySelector("main").innerHTML = thankYouPage;
});
// Attach event listener for adding more song/video URL fields
document.getElementById("add-song-video-url").addEventListener("click", addSongVideoUrl);

//# sourceMappingURL=request_artist.b881123f.js.map
