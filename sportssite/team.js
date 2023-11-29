let teamGames = [];
let currentPage = 1;
const scoresPerPage = 5;

const urlParams = new URLSearchParams(window.location.search); 
const team = urlParams.get('team');

if (document.readyState == "loading") {
    addEventListener("DOMContentLoaded", (e) => {
        console.log("lodaded")
        teamGames = JSON.parse(localStorage.getItem("games")).filter(game => {
            return (game.team1.toLowerCase() == team || game.team2.toLowerCase() == team);
        });
        displayGames();
    });
}

// display games in the table
function displayGames() {
    const resultsBody = document.getElementById('resultsBody');
    const paginationDiv = document.getElementById('pagination');

    // Clear previous rows
    resultsBody.innerHTML = '';

    // Calculate start and end index based on the current page
    const startIndex = (currentPage - 1) * scoresPerPage;
    const endIndex = startIndex + scoresPerPage;

    // Loop through teamGames and add rows to the table for the current page
    teamGames.slice(startIndex, endIndex).forEach(game => {
        const row = resultsBody.insertRow();

        // Team 1 and Score 1
        const cell1 = row.insertCell(0);
        cell1.textContent = game.team1;

        const cell2 = row.insertCell(1);
        cell2.textContent = game.score1;

        // Team 2 and Score 2
        const cell3 = row.insertCell(2);
        cell3.textContent = game.team2;

        const cell4 = row.insertCell(3);
        cell4.textContent = game.score2;

        const date = row.insertCell(4);
        date.textContent = game.date;
    });

    // Create pagination buttons
    const totalPages = Math.ceil(teamGames.length / scoresPerPage);

    paginationDiv.innerHTML = '';

    // Previous button
    if (currentPage > 1) {
        const prevButton = createPaginationButton('Previous', currentPage - 1);
        paginationDiv.appendChild(prevButton);
    }

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createPaginationButton(i, i);
        paginationDiv.appendChild(pageButton);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextButton = createPaginationButton('Next', currentPage + 1);
        paginationDiv.appendChild(nextButton);
    }

}

function filterResults() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;


    // Filter teamGames based on the selected date range
    teamGames = teamGames.filter(game => {
        console.log(new Date(game.date) >= new Date(startDate) && new Date(game.date) <= new Date(endDate));
        return new Date(game.date) >= new Date(startDate) && new Date(game.date) <= new Date(endDate);
    });

    // Reset current page to 1 and display filtered results
    currentPage = 1;
    displayGames();
}

function createPaginationButton(label, page) {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add('button', 'is-link'); // Add Bulma button classes
    button.addEventListener('click', () => {
        currentPage = page;
        displayGames();
    });
    return button;
}