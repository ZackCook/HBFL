async function loadRoster(teamName) {
  try {
    const response = await fetch("../Data/rosters.json"); // path to your JSON file
    const data = await response.json();
    const roster = data[teamName];

    const container = document.getElementById("roster");
    container.innerHTML = ""; // clear old content

    if (!roster) {
      container.innerHTML = "<p>No roster found.</p>";
      return;
    }

    // Build table
    const table = document.createElement("table");
    table.border = "1";
    table.cellPadding = "5";

    const headerRow = table.insertRow();
    ["Name", "Matches Fought", "Round Wins", "Rounds Fought", "Rounds Lost", "Round 3s Fought", "Round 3s Won"].forEach((text) => {
      const th = document.createElement("th");
      th.innerText = text;
      headerRow.appendChild(th);
    });

    roster.forEach((player) => {
      const row = table.insertRow();
      row.insertCell().innerText = player.Name;
      row.insertCell().innerText = player.matchesFought;
      row.insertCell().innerText = player.roundsWon;
      row.insertCell().innerText = player.roundsFought;
      row.insertCell().innerText = player.roundsLost;
      row.insertCell().innerText = player.round3sFought;
      row.insertCell().innerText = player.round3sWon;
    });

    container.appendChild(table);
  } catch (err) {
    console.error("Failed to load roster:", err);
  }
}
