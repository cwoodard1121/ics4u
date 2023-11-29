
let teams = ["Diamondbacks","Braves","Orioles","RedSox","WhiteSox","Cubs","Reds","Indians","Rockies","Tigers","Astros","Royals","Angels","Dodgers","Marlins","Brewers","Twins","Yankees","Mets","Athletics","Phillies","Pirates","Padres","Giants","Mariners","Cardinals","Rays","Rangers","BlueJays","Nationals"]; // You can add more teams here

let winsDirection = true;
let teamsDirection = true;

function redirectToTeamsPage(teamname) {
    window.location.href = `team.html/?team=${teamname}`
}


function loadGamesFromLocalStorage() {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const resultsBody = document.getElementById('resultsBody');

    // Clear existing rows
    resultsBody.innerHTML = '';

    // Add rows for each stored game
    games.forEach(game => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${game.team1}</td>
            <td>${game.score1}</td>
            <td>${game.team2}</td>
            <td>${game.score2}</td>
            <td>${game.date}</td>
            <td>${game.league}</td>
        `;
        document.getElementById(`league_${game.team1}`).textContent = game.league;
        document.getElementById(`league_${game.team2}`).textContent = game.league;
        resultsBody.appendChild(tr);
        updateStandings(game.team1, game.score1, game.team2, game.score2,game.league);
    });
}

if (document.readyState == "loading") {
    addEventListener("DOMContentLoaded", (e) => {
        initializeTable();
        initializeForm();
        loadGamesFromLocalStorage(); // Load games from localStorage on page load
    });
}

function initializeTable() {
    const standingsBody = document.getElementById('standingsBody');
    const resultsBody = document.getElementById('resultsBody');

    teams.forEach(team => {
        const tr = document.createElement('tr');    
        tr.innerHTML = `
            <td><a href="team.html?team=${team.toLowerCase()}"${team}</a>${team}</td>
            <td id="wins_${team}">0</td>
            <td id="standing_${team}">0</td>
            <td id="league_${team}">None</td>
        `;
        standingsBody.appendChild(tr);
    });

    // Load data from local storage
    teams.forEach(team => {
        const wins = localStorage.getItem(`wins_${team}`);
        const league = localStorage.getItem(`league_${team}`);
        if(league != null) {
            document.getElementById(`league_${team}`).textContent = league;
        }
        if (wins !== null) {
            document.getElementById(`wins_${team}`).textContent = wins;
        }
    });
    const games = JSON.parse(localStorage.getItem("games"));
    if(games == null) return;
}

function initializeForm() {
    const gameForm = document.getElementById('gameForm');


    teams.forEach((team, index) => {
        const teamOption1 = document.createElement('option');
        teamOption1.value = team;
        teamOption1.textContent = team;

        const teamOption2 = document.createElement('option');
        teamOption2.value = team;
        teamOption2.textContent = team;

        document.getElementById('team1Select').appendChild(teamOption1);
        document.getElementById('team2Select').appendChild(teamOption2);
    });
    let leagueOption1 = document.createElement('option');
    leagueOption1.value = "National";
    leagueOption1.textContent = "National League";

    let leagueOption2 = document.createElement('option');
    leagueOption2.value = "American";
    leagueOption2.textContent = "American League";

    document.getElementById('leagueSelect').appendChild(leagueOption1);
    document.getElementById('leagueSelect').appendChild(leagueOption2);
}

function sortTable(column) {
winsDirection = !winsDirection;
teamsDirection = !teamsDirection;
const standingsBody = document.getElementById('standingsBody');
const rows = Array.from(standingsBody.getElementsByTagName('tr'));

rows.sort(function (a, b) {
    let aValue, bValue;

    switch (column) {
        case 'team':
            aValue = a.cells[0].textContent;
            bValue = b.cells[0].textContent;
            break;
        case 'wins':
            aValue = parseInt(a.cells[1].textContent);
            bValue = parseInt(b.cells[1].textContent);
            break;
        case 'standing':
            aValue = parseInt(a.cells[2].textContent);
            bValue = parseInt(b.cells[2].textContent);
            break;
        default:
            // Default to sorting by wins if the column parameter is unrecognized
            aValue = parseInt(a.cells[1].textContent);
            bValue = parseInt(b.cells[1].textContent);
    }

    if (column !== 'team') {
        if(column == "wins") {
            return winsDirection ? bValue - aValue : aValue - bValue;
        }
        return bValue - aValue; // Sorting in descending order for numeric columns
    } else {
        // For team column, perform a string comparison

        return teamsDirection ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
});

// Remove existing rows from the table body
while (standingsBody.firstChild) {
    standingsBody.removeChild(standingsBody.firstChild);
}

// Append the sorted rows back to the table body
rows.forEach(function (row, index) {
    standingsBody.appendChild(row);
    // Update the standing numbers in the array
    row.cells[2].textContent = index + 1;
});
}

function showForm() {
    const form = document.getElementById('gameForm');
    form.style.display = 'block';
}

function cancelForm() {
    const form = document.getElementById('gameForm');
    form.style.display = 'none';
}


function updateStandings(team1, score1, team2, score2) {
    const winsElement1 = document.getElementById(`wins_${team1}`);
    const standingElement1 = document.getElementById(`standing_${team1}`);
    const winsElement2 = document.getElementById(`wins_${team2}`);
    const standingElement2 = document.getElementById(`standing_${team2}`);

    const currentWins1 = parseInt(winsElement1.textContent) || 0;
    const currentWins2 = parseInt(winsElement2.textContent) || 0;

    // Update team 1 wins
    winsElement1.textContent = currentWins1 + (score1 > score2 ? 1 : 0);

    // Update team 2 wins
    winsElement2.textContent = currentWins2 + (score2 > score1 ? 1 : 0);

    // Update the table
    rearrangeTeams();
}

function filterByLeague() {



    // Update the table
            const standingsBody = document.getElementById('standingsBody');
            while (standingsBody.firstChild) {
        standingsBody.removeChild(standingsBody.firstChild);
    }
    initializeTable();
    loadGamesFromLocalStorage();
    let rows = Array.from(standingsBody.getElementsByTagName('tr'));
    
    console.log("before length: " + rows.length)

    // Sort the rows based on the values in the second column (index 1)
    rows = rows.filter(a => {
        var aValue = a.cells[3].textContent;



        return aValue.toLowerCase() == document.getElementById("leagueFilter").value.toLowerCase();
    });

    console.log("after length: " + rows.length)

    // Remove existing rows from the table body
    while (standingsBody.firstChild) {
        standingsBody.removeChild(standingsBody.firstChild);
    }

    console.log("removed")

    

    // Append the sorted rows back to the table body
    rows.forEach(function (row, index) {
        standingsBody.appendChild(row);
    });
}

function updateResultsTable(team1, score1, team2, score2,date,league) {
    const resultsBody = document.getElementById('resultsBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${team1}</td>
        <td>${score1}</td>
        <td>${team2}</td>
        <td>${score2}</td>
        <td>${date}</td>
        <td>${league}</td>
    `;
    resultsBody.appendChild(tr);
    

    document.getElementById(`league_${team1}`).textContent = league;
    document.getElementById(`league_${team2}`).textContent = league;

    // Store the game results in localStorage
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.push({ team1, score1, team2, score2,date,league });
    localStorage.setItem('games', JSON.stringify(games));
}

function rearrangeTeams() {
    const standingsBody = document.getElementById('standingsBody');
    const rows = Array.from(standingsBody.getElementsByTagName('tr'));

    // Sort the rows based on the values in the second column (index 1)
    rows.sort(function (a, b) {
        var aValue = parseInt(a.cells[1].textContent);
        var bValue = parseInt(b.cells[1].textContent);
        return bValue - aValue; // Sorting in descending order
    });

    // Remove existing rows from the table body
    while (standingsBody.firstChild) {
        standingsBody.removeChild(standingsBody.firstChild);
    }

    // Append the sorted rows back to the table body
    rows.forEach(function (row, index) {
        standingsBody.appendChild(row);
        // Update the standing numbers in the array
        row.cells[2].textContent = index + 1;
    });
}

function submitForm(event) {
    event.preventDefault();

    const team1Select = document.getElementById('team1Select');
    const team2Select = document.getElementById('team2Select');
    const score1 = parseInt(document.getElementById('score1').value) || 0;
    const score2 = parseInt(document.getElementById('score2').value) || 0;
    const date = document.getElementById("date").value;
    const league = document.getElementById("leagueSelect").value;

    // Check if the teams are different
    if (team1Select.value === team2Select.value) {
        alert('Please select two different teams for the game.');
        return;
    }

    // Update standings
    updateStandings(team1Select.value, score1, team2Select.value, score2);

    // Update results table and store in localStorage
    updateResultsTable(team1Select.value, score1, team2Select.value, score2,date,league);

    // Clear form inputs

    // Hide the form
    cancelForm();
    document.getElementById(`league_${team1Select.value}`).textContent = league;
    document.getElementById(`league_${team2Select.value}`).textContent = league;
}