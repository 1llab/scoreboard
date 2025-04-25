
  const SPREADSHEET_ID = "1ZM_eN_XKNl4YFvVzJpbNgZlJjUbrx3qtlVqagKLcHkE";
  const SHEET_NAME = "Shy";
  const URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?sheet=${SHEET_NAME}`;

  fetch(URL)
    .then(res => res.text())
    .then(rep => {
      const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
      const rows = jsonData.table.rows;

      const data = rows.map(row => {
        const cells = row.c;
        return {
          team: cells[0]?.v || "",
          sum: cells[10]?.v || 0,
          rank: parseInt(cells[11]?.v) || 99,
        };
      });

      data.sort((a, b) => a.rank - b.rank);

      // 🥇🥈🥉 단상
      const podium = document.getElementById("podium");
      const emoji = ["🥇", "🥈", "🥉"];
      const podiumClass = ["first", "second", "third"];

      [1, 0, 2].forEach((order, i) => {
        const person = data[order];
        const div = document.createElement("div");
        div.className = podiumClass[i];
        div.innerHTML = `${emoji[i]}<br>${person.team}<br>${person.sum}점`;
        podium.appendChild(div);
      });

      // 전체 팀 순위 표
      const tableBody = document.querySelector("#scoreTable tbody");
      data.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.rank}</td>
          <td>${row.team}</td>
          <td>${row.sum}</td>
        `;
        tableBody.appendChild(tr);
      });
    })
    .catch(err => {
      console.error("시트 불러오기 실패:", err);
    });

