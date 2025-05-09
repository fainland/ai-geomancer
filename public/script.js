fetch('/api/prediction')
  .then(res => res.json())
  .then(data => {
    const symbols = {
      'Fortuna Major': '░░░█░░░█\n░░░█░░░█',
      'Via': '░░░█\n░░░█\n░░░█\n░░░█',
      'Puella': '█░░░█\n░░░█░░',
      'Albus': '█░░░█\n█░░░█',
      'Tristitia': '░░░█\n█░░░█\n░░░█'
    };
    document.getElementById('symbol').innerText = symbols[data.figure] || '?';
    document.getElementById('interpretation').innerText =
      `Figure: ${data.figure}\nPlanetary Hour: ${data.planetaryHour}`;
  })
  .catch(() => {
    document.getElementById('interpretation').innerText = "Failed to load prediction.";
  });
