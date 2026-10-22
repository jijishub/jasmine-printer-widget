// 1. Set the receipt header for this mode
document.querySelector(".receipt-header").textContent = "♪ TOP SONGS THIS WEEK ♪";

//2. Async function to fetch 7-day top tracks from Last.fm
async function fetchWeeklyTopTracks() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${USERNAME}&api_key=${API_KEY}&period=7day&limit=${LIMIT}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const tracks = data.toptracks?.track || [];
        renderTracks(tracks);
    } catch (err) {
        console.error("Failed to load Last.fm tracks:", err);
    }
}

// 3. Render tracks to the receipt list
function renderTracks(tracks) {
    const listElement = document.getElementById("hobby-list");
    listElement.innerHTML = "";

    tracks.forEach((track, index) => {
        const li = document.createElement("li");
        li.className = "hobby-item";
        li.innerHTML =
        `<span class="hobby-title">${index + 1}.${track.name}- ${track.artist.name}</span>`;
        listElement.appendChild(li);
    });
}

fetchWeeklyTopTracks();
setInterval(fetchWeeklyTopTracks, 3 * 60 * 1000); // auto-refresh every 3 minutes