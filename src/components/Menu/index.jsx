import "../Menu/App.css";
import logo from "../../assets/logoArsenal.png";
import video from "../../assets/Gotham.mp4";
import audio_click from "../../assets/sounds/click-151673.mp3";
import { Link, Outlet } from "react-router-dom";

export const Menu = () => {
  const handleClick = () => {
    const audio = new Audio(audio_click);
    audio.play();
  };

  return (
    <>
      <header className="header_menu">
        <div className="logoWayne">
          <Link to={"/"}>
            {" "}
            <img src={logo} alt="logo" />
          </Link>

          <h1>
            Indústria <br /> Bruce Wayne
          </h1>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="#contacts"
              >
                CONTACTS
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="sec1_menu">
        <Outlet />
        <div className="containerAll">
          <div className="containerWelcome">
            <div className="welcome">
              <h1>Bem-vindo às Indústrias Wayne</h1>
              <p>Segurança e inovação para Gotham City.</p>
            </div>
            <p className="textWelcome">
              Bem-vindo às Indústrias Wayne, onde tecnologia e inovação se
              encontram para garantir um futuro mais seguro e brilhante para
              Gotham City. <br />
              Aqui, trabalhamos incansavelmente para proteger nossa cidade e
              impulsionar o progresso com soluções que fazem a diferença.
              Prepare-se para explorar o melhor em segurança, inovação e
              excelência, porque juntos, construímos um mundo mais forte e
              protegido!
            </p>
          </div>
          <div className="containerButton">
            <Link to={"/login"}>
              <button onClick={handleClick}>LOGIN</button>
            </Link>
          </div>
        </div>
        <img id="bg_mobile" src="https://applescoop.org/image/wallpapers/iphone/batman-dark-cartoon-tv-show-comic-book-comicbook-17-09-2024-1726571015.webp" alt="" />
        <video id="bgvideo" src={video} autoPlay muted loop></video>
      </section>
      <footer id="footer_wayne_menu">
        <div id="contacts">
          <a target="blank" href="mailto:yuririelias15@gmail.com?subject=Assunto%20do%20E-mail&body=Olá,%20gostaria%20de%20mais%20informações.">
            <img
              style={{ width: 30 }}
              src="https://logodownload.org/wp-content/uploads/2018/03/gmail-logo-2-1.png"
              alt=""
            />
          </a>
          <a target="blank" href="https://github.com/YuriElias07">
            <img
              style={{
                width: 30,
                backgroundColor: "white",
                borderRadius: 50,
                marginLeft: 20,
              }}
              src="https://cdn-icons-png.flaticon.com/256/25/25231.png"
              alt=""
            />
          </a>
          <a target="blank" href="https://www.linkedin.com/in/yuri-elias-491221255/">
            <img
              style={{ width: 50, borderRadius: 50, marginLeft: 10 }}
              src="https://static.vecteezy.com/system/resources/previews/018/930/480/non_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
              alt=""
            />
          </a>
        </div>

        <div className="rodape">
          <h2 className="rodape_titulo">Infinity School</h2>
          <p className="rodape_texto">Projeto Industrias Bruce Wayne</p>
          <p className="rodape_dev">Desenvolvido por: Yuri Elias Alcântara</p>
        </div>
      </footer>
    </>
  );
};
