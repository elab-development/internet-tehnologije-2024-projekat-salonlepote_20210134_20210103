import { useEffect, useState } from "react";
import axios from "../api/axios";
import sminker1 from '../assets/sminker1.jpg'; 
import sminker2 from '../assets/sminker2.jpg';
import sminker3 from '../assets/sminker3.jpg';
import sminker4 from '../assets/sminker4.jpg';
import Breadcrumbs from "../components/Breadcrumbs";
import Card from "../components/Card";


function MakeupArtists() {
  const [artists, setArtists] = useState([]);
  const artistImages = [sminker1, sminker2, sminker3,sminker4];
           
  useEffect(() => {
    axios.get("/makeup-artists")
      .then(res => setArtists(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (

 <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <Breadcrumbs
          paths={[
            { name: "Početna", link: "/" },
            { name: "Šminkeri", link: "/makeupArtists" },
          ]}
        />
        

    <div>
      <h2>Naši šminkeri</h2>
      <ul>
          <div className="cards-container">
          {artists.map((artist, index) => (
          <Card
            key={artist.id}
            title={artist.name}
            subtitle={artist.email}
            description="Specijalizovan/na za glam i bridal šminku, sve vrste tretmana lica i tela, pedikir, manikir, masaže i stilizovanje frizura." 
            role="Kozmetički tehničar"
            image={artistImages[index]} 
          />
          ))}
           </div>
      </ul>
    </div>
  </div>);
}
export default MakeupArtists;
