import salonImage from '../assets/estetika.jpg'; 
import enterijerImage from '../assets/enterijer.jpg';
import uslugeImage from "../assets/usluge.jpg";


function Home() {
  return (
    
    <>
    <h1>Dobrodošli u naš Salon lepote</h1>
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-text">
          

          <p>
            U našem salonu lepote, vaša nega i zadovoljstvo su na prvom mestu. Sa pažljivo biranim tretmanima, profesionalnim osobljem i prijatnom atmosferom...
          </p>

          <p>
            Nudimo širok spektar usluga – od profesionalnog šminkanja, preko manikira i pedikira, do tretmana lica i tela...
          </p>

          <p className="cta">
            ✨ Vaša lepota. Naša strast. ✨
          </p>
        </div>
        <div className="home-image">
          <img src={salonImage} alt="Salon lepote" />
        </div>
      </div>

      <div className="home-container">
        <div className="home-text">
          <h2>Gde se nalazimo?</h2>
          <p>
            Naš salon se nalazi u samom srcu grada, na lako dostupnoj lokaciji, idealnoj za sve one koji žele da sebi priušte trenutke opuštanja i nege.
          </p>
          <p>
            Posetite nas na adresi: <strong>Ulica lepote 123, Beograd</strong>. U neposrednoj blizini su parking mesta i gradski prevoz, što vašu posetu čini još lakšom.
          </p>
        </div>

        <div className="home-image">
          <img src={enterijerImage} alt="Enterijer salona" />
        </div>
      </div>


    </div>
    <h2>Naše usluge</h2>
    <div className='home-wrapper'>
    
        <div className="home-container" style={{ textAlign: 'center', padding: '20px 0' }}>
          
          <p>
            Nudimo širok spektar usluga uključujući profesionalni make-up, negu lica,
            tretmane kože, masaže i još mnogo toga. <br />
            Koristimo samo najkvalitetnije proizvode kako bismo osigurali vrhunske rezultate.
            <br>
            </br>
            </p>

          <p className="cta">
           <i> Pronađite pravi tretman za sebe.</i>
          </p>
          
          
        </div>
        <div className="home-image">
          <img src={uslugeImage} alt="Usluge salona" />
        </div>


      </div></>

  );
}

export default Home;
