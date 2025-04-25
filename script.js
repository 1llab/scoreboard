
    const API_KEY = "AIzaSyB_147SKi5nH8n5S0P05pcT1ZjGIvIQryg";  // 발급한 API 키 입력
    const SPREADSHEET_ID = "1ZM_eN_XKNl4YFvVzJpbNgZlJjUbrx3qtlVqagKLcHkE";  // 구글 스프레드시트 ID
    const SHEET_NAME = "Shy";  // 시트 이름
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const rows = data.values;
        const headers = rows[0];
        const teamIndex = headers.indexOf("team");
        const sumIndex = headers.indexOf("sum");
        const rankIndex = headers.indexOf("rank");

        const tbody = document.querySelector("#scoreTable tbody");
        const podium = document.getElementById("podium");

        const teams = rows.slice(1).map(row => ({
          team: row[teamIndex],
          sum: row[sumIndex],
          rank: parseInt(row[rankIndex])
        }));

        teams.sort((a, b) => a.rank - b.rank);

        // podium 만들기
        const emoji = ["🥇", "🥈", "🥉"];
        ["second", "first", "third"].forEach((cls, i) => {
          const div = document.createElement("div");
          div.className = cls;
          const t = teams[i];
          div.innerHTML = `${emoji[i]}<br>${t.team}<br>${t.sum}점`;
          podium.appendChild(div);
        });

        // 나머지 팀 표에 추가
        teams.slice(3).forEach(team => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${team.rank}</td><td>${team.team}</td><td>${team.sum}</td>`;
          tbody.appendChild(tr);
        });
      })
      .catch(err => {
        console.error("불러오기 실패:", err);
      });
fetchLeaderboard();
setInterval(fetchLeaderboard, 10000);
