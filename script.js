const API_KEY = "AIzaSyB_147SKi5nH8n5S0P05pcT1ZjGIvIQryg";  // 발급한 API 키 입력
const SPREADSHEET_ID = "1ZM_eN_XKNl4YFvVzJpbNgZlJjUbrx3qtlVqagKLcHkE";  // 구글 스프레드시트 ID
const SHEET_NAME = "Shy";  // 시트 이름

async function fetchLeaderboard() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values.slice(1);  // 첫 번째 행(헤더) 제외

        // 데이터 정리
        let teams = rows.map(row => ({
            team: row[0],
            score: parseInt(row[4]),
            rank: parseInt(row[5])
        }));

        teams.sort((a, b) => a.rank - b.rank);

        // 1~3등 단상 업데이트
        document.querySelector("#first .team-name").textContent = teams[0].team;
        document.querySelector("#first .score").textContent = teams[0].score;

        document.querySelector("#second .team-name").textContent = teams[1].team;
        document.querySelector("#second .score").textContent = teams[1].score;

        document.querySelector("#third .team-name").textContent = teams[2].team;
        document.querySelector("#third .score").textContent = teams[2].score;

        // 전체 순위 업데이트
        let tbody = document.querySelector("#leaderboard");
        tbody.innerHTML = "";
        teams.forEach(team => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${team.rank}</td><td>${team.team}</td><td>${team.score}</td>`;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error("데이터 가져오기 실패:", error);
    }
}

// 10초마다 업데이트
fetchLeaderboard();
setInterval(fetchLeaderboard, 10000);
