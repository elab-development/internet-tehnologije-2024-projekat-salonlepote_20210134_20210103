import salonImage from '../assets/estetika.jpg'; 
import enterijerImage from '../assets/enterijer.jpg';
import uslugeImage from "../assets/usluge.jpg";
import StatisticsChart from "../components/StatisticsChart";
import diplomaImg from "../assets/diplome.jpg";
import fotoJpg from "../assets/slike.jpg";
import entImg from "../assets/unutrasnjost.jpg";
import entImg2 from "../assets/unutrasnjost2.jpg";

import Testimonials from "../components/Testimonials";


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


      </div>

<div className='home-wrapper'>
   <img src={entImg} alt="Fotografija salona" style={{ maxWidth: "30%"}}/>
        <Testimonials />
        <img src={entImg2} alt="Fotografija salona" style={{ maxWidth: "30%"}}/>
      </div>

      <div className='home-wrapper'>
        <div className='home-container'>
      
      <StatisticsChart />
      <img src={diplomaImg} alt="Diplome" style={{ maxWidth: "30%",  float: "right", marginLeft: "15px"}}/>
      <img src={fotoJpg} alt="Fotografije" style={{ maxWidth: "30%",  float: "right", marginLeft: "15px"}}/>
    
      </div>
      </div>

      <div className='home-wrapper'>
        <h2>Kontakt</h2>
        <h3><br></br><br></br><br></br>Telefon: 060 123 4567 <br></br> Instagram: j&bBeautyLounge <br></br>
        mail: beautylounge@gmail.com</h3>
        <iframe
  title="Lokacija"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.232267065116!2d20.41723831549742!3d44.82412667909998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6e6d5e9e0f2f%3A0x2f2f2f2f2f2f2f2f!2sIlije%20Stojadinovi%C4%87a%2063%2C%2011032%20Beograd%2C%20Srbija!5e0!3m2!1ssr!2srs!4v1629456783456!5m2!1ssr!2srs"
  width="60%"
  height="250"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

      </div>
      
      
      </>

  );
}

export default Home;
