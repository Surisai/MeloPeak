/*******************************************************************************************
 * check the image function to display in the correct way. Working on tonight./
 * ********************************************************************************************/ // All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;
// For debugging, display all of our data in the console.
console.log({
    artists,
    songs
}, "App Data");
document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById("menu");
    const artistNameElement = document.getElementById("artist-name");
    const artistLinksElement = document.getElementById("artist-links");
    const songTableBody = document.getElementById("song-table-body");
    const songCardContainer = document.getElementById("song-card-container");
    const newsletterForm = document.getElementById("newsletterForm");
    const subscribeMessageContainer = document.getElementById("subscribe-message-container");
    const artistRequestForm = document.getElementById("artistRequestForm");
    const addMoreLinksButton = document.getElementById("add-more-links");
    const submitArtistRequestButton = document.getElementById("submit-artist-request");
    // Function to create artist buttons dynamically
    function createArtistButtons() {
        artists.forEach((artist)=>{
            const button = document.createElement("button");
            button.textContent = artist.name;
            button.setAttribute("aria-label", `View details for ${artist.name}`);
            button.addEventListener("click", ()=>showArtistInfo(artist));
            menu.appendChild(button);
        });
    }
    // Function to display artist info and songs
    function showArtistInfo(artist) {
        artistNameElement.textContent = artist.name;
        artistLinksElement.innerHTML = "";
        const artistLinks = artist.urls.map((link)=>`<a href="${link.url}" target="_blank">${link.name}</a>`).join(", ");
        artistLinksElement.innerHTML = `(${artistLinks})`;
        const filteredSongs = songs.filter((song)=>song.artistId === artist.artistId && !song.explicit);
        // Clear the previous content
        songTableBody.innerHTML = "";
        songCardContainer.innerHTML = "";
        filteredSongs.forEach((song)=>{
            // Create and append table row
            const row = createSongTableRow(song);
            songTableBody.appendChild(row);
            // Create and append card
            const card = createSongCard(song);
            songCardContainer.appendChild(card);
        });
    }
    // Function to create a table row for a song
    function createSongTableRow(song) {
        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        titleCell.innerHTML = `<a href="${song.url}" target="_blank">${song.title}</a>`;
        row.appendChild(titleCell);
        const yearCell = document.createElement("td");
        yearCell.textContent = song.year;
        row.appendChild(yearCell);
        const durationCell = document.createElement("td");
        durationCell.textContent = convertSecondsToMinutes(song.duration);
        row.appendChild(durationCell);
        return row;
    }
    // Function to create a card for a song
    function createSongCard(song) {
        const card = document.createElement("div");
        card.classList.add("card");
        const songImg = document.createElement("img");
        songImg.src = song.imageURL;
        songImg.alt = `Image of ${song.title}`;
        songImg.classList.add("card-image");
        songImg.addEventListener("click", ()=>{
            window.open(song.url, "_blank");
        });
        card.appendChild(songImg);
        const songTitle = document.createElement("h3");
        songTitle.classList.add("card-title");
        songTitle.textContent = song.title;
        card.appendChild(songTitle);
        const songYear = document.createElement("time");
        songYear.classList.add("card-year");
        songYear.textContent = song.year;
        card.appendChild(songYear);
        const songDuration = document.createElement("span");
        songDuration.classList.add("card-duration");
        songDuration.textContent = convertSecondsToMinutes(song.duration);
        card.appendChild(songDuration);
        return card;
    }
    // Function to convert seconds to minutes and seconds
    function convertSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
    // Event listener for the newsletter form submission
    newsletterForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from actually submitting
        // Clear any existing messages
        subscribeMessageContainer.innerHTML = "";
        // Show the subscribed message
        const subscribedMessage = document.createElement("p");
        subscribedMessage.textContent = "You are subscribed!";
        subscribedMessage.style.color = "#4caf50"; // Success color
        subscribeMessageContainer.appendChild(subscribedMessage);
        // Clear the email input field
        newsletterForm.querySelector('input[type="email"]').value = "";
    });
    // Function to add a new link input field
    function addLink(containerId) {
        const container = document.getElementById(containerId);
        // Create new input field
        const newInput = document.createElement("input");
        newInput.type = "url";
        newInput.name = "url";
        newInput.placeholder = "Enter URL";
        newInput.required = true;
        // Create new remove button
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", ()=>{
            container.removeChild(newInput);
            container.removeChild(removeButton);
        });
        container.appendChild(newInput);
        container.appendChild(removeButton);
    }
    // Initialize the artist request form (if exists)
    function initializeArtistRequestForm() {
        if (addMoreLinksButton) addMoreLinksButton.addEventListener("click", ()=>addLink("artist-links-container"));
        if (submitArtistRequestButton) submitArtistRequestButton.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the form from actually submitting
            // Optionally, handle form submission logic here
            // Clear any existing messages
            const messageContainer = document.getElementById("artist-request-message-container");
            messageContainer.innerHTML = "";
            // Show the thank you message
            const thankYouMessage = document.createElement("p");
            thankYouMessage.textContent = "Thank you for your artist request!";
            thankYouMessage.style.color = "#4caf50"; // Success color
            messageContainer.appendChild(thankYouMessage);
            // Optionally, clear form fields here
            artistRequestForm.reset();
        });
    }
    // Initialize the artist buttons and form handling
    createArtistButtons();
    initializeArtistRequestForm();
});

//# sourceMappingURL=index.8f0c9192.js.map
