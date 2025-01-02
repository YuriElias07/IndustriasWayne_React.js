import "../Arsenal/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/logoArsenal.png";
import video from "../../assets/Gotham.mp4";
import audioTransitionCarousel from "../../assets/sounds/transition.mp3";
import audio_click from "../../assets/sounds/click-151673.mp3";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchArsenal, handleDelete } from "../../services/API";
import { FaTrash, FaEdit, FaRegEdit, FaUserEdit } from "react-icons/fa";

export const Arsenal = () => {
  const [list_arsenal, setListArsenal] = useState([]);
  const [searchArsenal, setSearchArsenal] = useState("");

  const handleClick = () => {
    const audio = new Audio(audio_click);
    audio.play();
    audio.volume = 0.4;
  };

  const audioTransition = () => {
    const audio = new Audio(audioTransitionCarousel);
    audio.play();
    audio.volume = 0.4;
  };

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    vertical: false,
    arrows: true,
    variableWidth: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  useEffect(() => {
    fetchArsenal(setListArsenal);
  }, []);

  const filteredArsenal = list_arsenal.filter((item) =>
    item.nome.toLowerCase().includes(searchArsenal.toLowerCase())
  );

  return (
    <>
      <header className="header_arsenal">
        <div className="logoWayne">
          <Link to={"/arsenal"}>
            <img id="image" src={logo} alt="logo" />
          </Link>
          <h1>
            Indústria <br /> Bruce Wayne
          </h1>
        </div>
        <nav className="nav">
          <ul className="menu">
            <Link to={"/arsenal/add"}>
              <li onClick={handleClick}>ADICIONAR</li>
            </Link>
            <li>
              <input
              id="search"
                type="text"
                placeholder="PESQUISAR"
                onChange={(e) => setSearchArsenal(e.target.value)}
              />
            </li>
          </ul>
        </nav>
      </header>
      <video id="video_arsenal" src={video} autoPlay muted loop></video>
      <section className="sec1">
      <Outlet />
        <div className="container_carousel">
          <h1 className="titleGun">ITENS WAYNE</h1>
          <Slider {...slickSettings}>
            {Array.isArray(filteredArsenal) &&
              filteredArsenal.map((element) => (
                <div className="card_arsenal" key={element.id}>
                  <div style={{ display: "flex", marginTop: 10 }}>
                    <div className="div-btn">
                      <Link
                        style={{ color: "white" }}
                        to={`/arsenal/edit/${element.id}`}
                      >
                        <li>
                          <FaEdit className="edit-btn" />
                        </li>
                      </Link>

                      <li onClick={() => {
                        if (window.confirm("Deseja realmente deletar este item?")) {
                          handleDelete(element.id, setListArsenal);
                        }
                      }}>
                        <FaTrash className="delete-btn" />
                      </li>
                    </div>

                    <img
                      onClick={audioTransition}
                      className="foto"
                      src={
                        element.imagem ||
                        "https://wallpapers.com/images/high/batman-black-and-white-736-x-1308-wallpaper-c63hjzqbtxh6x6s4.webp"
                      }
                      alt="Foto do personagem"
                    />
                  </div>

                  <h2 className="nome">
                    {element.nome}
                  </h2>
                  <p className="detalhe">
                    {element.detalhe}
                  </p>
                </div>
              ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
