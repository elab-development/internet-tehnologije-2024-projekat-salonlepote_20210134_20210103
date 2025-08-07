import { useEffect, useState } from "react";
import axios from "../api/axios";

function MakeupArtists() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("/makeup-artists")
      .then(res => setArtists(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Naši šminkeri</h2>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.name} – {artist.email}</li>
        ))}
      </ul>
    </div>
  );
}
export default MakeupArtists;
