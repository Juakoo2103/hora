import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/time", async (req, res) => {
  try {
    const zones = {
      "🇪🇸 España": "Europe/Madrid",
      "🇨🇱 Chile": "America/Santiago",
      "🇦🇷 Argentina": "America/Argentina/Buenos_Aires",
      "🇺🇾 Uruguay": "America/Montevideo",
    };

    const results = await Promise.all(
      Object.entries(zones).map(async ([flag, zone]) => {
        const r = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
        const data = await r.json();
        const time = data.datetime.slice(11, 16);
        return `${flag}: ${time}`;
      })
    );

    res.send("🕓 " + results.join(" | "));
  } catch (e) {
    console.error(e);
    res.status(500).send("Error obteniendo la hora 😢");
  }
});

app.listen(3000, () => console.log("Servidor de hora listo en puerto 3000"));
