// 1. Data Model (matching C# TaskItem model)
const hobbyTitles =[
    "Alice Game",
    "Styleboard",
    "Practice coding",
    "Cloudji",
    "Webtoons",
    "Poems and essay",
    "Delta Games & PC Games",
    "Reading",
    "Art",
    "Watch series",
];

const savedScores = JSON.parse(localStorage.getItem("hobbyScores")|| "{}");
// 2. Data Transformation: .map() initializes the states
const hobbies = hobbyTitles.map((title, index) => ({
    id: String(index + 1),
    title,
    score: savedScores[title] || 0 //uses saved score if it exists, otherwise 0
}));

//3. Functional pipeline: pure function returning top 5 lowest scores
const getTopForgottenHobbies = () => [...hobbies]
    .sort((a, b) => (a.score - b.score) || (a.id - b.id))
    .slice(0, 10)

// 4. Component Render: Pure state-to-DOM projection
function renderHobbies() {
    const listElement = document.getElementById("hobby-list");
    listElement.innerHTML= "";

    getTopForgottenHobbies().forEach(({id, title}) => 
    {
        const li = document.createElement("li");
        li.className = "hobby-item";
        li.innerHTML = `
        <span class="hobby-title">${title}</span>
        <button class="bump-btn" data-id="${id}" title="I worked on this!">+</button>`;
    
        li.querySelector(".bump-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            bumpHobby(id);
        });

        listElement.appendChild(li);
    });
}

// 5. State Mutation: Dedicated function to handle updates
function bumpHobby(id) {
    const target = hobbies.find(h => h.id === id);
    if (target) {
        target.score += 1;
        savedScores[target.title] = target.score; // <-- Update dictionary
        localStorage.setItem("hobbyScores", JSON.stringify(savedScores)); // save to diskl
        renderHobbies();
    }
}

// initial render
renderHobbies();