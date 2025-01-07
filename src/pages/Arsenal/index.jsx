import "../Arsenal/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../assets/logoArsenal.png";
import bg_img from "../../assets/bg_image_web.jpg";
import audioTransitionCarousel from "../../assets/sounds/transition.mp3";
import audio_click from "../../assets/sounds/click-151673.mp3";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { fetchArsenal, handleDelete } from "../../services/API";
import {
  FaTrash,
  FaEdit,
  FaRegEdit,
  FaUserEdit,
  FaSignOutAlt,
} from "react-icons/fa";

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
    audio.volume = 0.6;
  };

  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 700,
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
    cssEase: 'ease-in-out',
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: false,
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

  const handleLogout = () => {
    localStorage.removeItem("authenticated", false);
    navigate("/");
  };

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
            <Link to={"/"}>
              <li style={{paddingRight: 20}} onClick={() => {
                          if (
                            window.confirm(
                              "Deseja realmente sair?"
                            )
                          ) {
                            handleLogout();
                          }
                        }}>
                <FaSignOutAlt size={25} />
              </li>
            </Link>
          </ul>
        </nav>
      </header>
      <img
        id="bg_img"
        src="https://applescoop.org/image/wallpapers/iphone/batman-dark-cartoon-tv-show-comic-book-comicbook-17-09-2024-1726571015.webp"
        alt=""
      />
      <img id="video_arsenal" src={bg_img} />
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

                      <li
                        onClick={() => {
                          if (
                            window.confirm(
                              "Deseja realmente deletar este item?"
                            )
                          ) {
                            handleDelete(element.id, setListArsenal);
                          }
                        }}
                      >
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

                  <h2 className="nome">{element.nome}</h2>
                  <p className="detalhe">{element.detalhe}</p>
                </div>
              ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
