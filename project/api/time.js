export default async function handler(req, res) {
  const zones = {
    "🇪🇸 España": "Europe/Madrid",
    "🇨🇱 Chile": "America/Santiago",
    "🇦🇷 Argentina": "America/Argentina/Buenos_Aires",
    "🇺🇾 Uruguay": "America/Montevideo",
  };

  try {
    const responses = await Promise.all(
      Object.entries(zones).map(async ([flag, zone]) => {
        const r = await fetch(`https://worldtimeapi.org/api/timezone/${zone}`);
        const data = await r.json();
        const hora = data.datetime.slice(11, 16);
        return `${flag}: ${hora}`;
      })
    );

    res.status(200).send(`🕓 ${responses.join(" | ")}`);
  } catch (e) {
    res.status(500).send("Error obteniendo hora 😢");
  }
}
