const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/prediction', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
    const geo = await geoRes.json();

    const lat = geo.latitude || 0;
    const lng = geo.longitude || 0;

    const now = new Date();
    const planetaryHour = calculatePlanetaryHour(now, lat, lng);
    const figures = ['Fortuna Major', 'Via', 'Puella', 'Albus', 'Tristitia'];
    const figure = figures[Math.floor(Math.random() * figures.length)];

    res.json({ figure, planetaryHour });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get prediction' });
  }
});

function calculatePlanetaryHour(date, lat, lng) {
  const hours = ['☉', '☽', '♂', '☿', '♃', '♀', '♄'];
  const startHour = date.getHours();
  return hours[startHour % 7];
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
