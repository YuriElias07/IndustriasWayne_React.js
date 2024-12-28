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
            <img style={{width: 130}} src={logo} alt="logo" />
          </Link>

          <h1>
            Indústria <br /> Bruce Wayne
          </h1>
        </div>
        <nav className="nav">
          <ul>
            <li>DASHBOARD</li>
            <li>CONTACTS</li>
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
        <video id="bgvideo" src={video} autoPlay muted loop></video>
      </section>
      <footer id="footer_wayne_menu">
        <h2 className="rodape_titulo">Infinity School</h2>
        <p className="rodape_texto">Projeto Industrias Bruce Wayne</p>
        <p className="rodape_dev">Desenvolvido por: Yuri Elias Alcântara</p>
      </footer>
    </>
  );
};
