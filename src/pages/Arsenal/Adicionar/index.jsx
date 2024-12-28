import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import wrong from "../../../assets/sounds/wrong.mp3";
import success from "../../../assets/sounds/correct.mp3";
import audio_click from "../../../assets/sounds/click-151673.mp3";
import Lottie from "lottie-react";
import animation2 from "../../../assets/animations/Animation - 1734574554659.json";
import axios from "axios";
import { use } from "react";

export const Add = () => {
  const [formData, setFormData] = useState({
    nome: "",
    detalhe: "",
    imagem: "",
  });
  const [add, setAdd] = useState("Adicionando...");
  const [authenticated, setAuthenticated] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nome, detalhe, imagem } = formData;

    if (!nome || !detalhe) {
      const errorAudio = new Audio(wrong);
      errorAudio.volume = 0.3;
      errorAudio.play();
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      try {
        const response = await axios.post("https://backend-industriaswayne.onrender.com/postArsenal", {
          nome,
          detalhe,
          imagem,
        });
        const successAudio = new Audio(success);
        successAudio.volume = 0.4;
        successAudio.play();
        setAuthenticated(true);
        setShake(false);
        setTimeout(() => {
          setAdd("Adicionado com sucesso!");
          setTimeout(() => {
            navigate("/arsenal");
            window.location.reload();
          }, 1000)
        }, 3000);
      } catch (error) {
        console.error(
          "Erro ao adicionar item:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    const audio = new Audio(audio_click);
    audio.play();
    navigate("/arsenal");
  };

  return (
    <section id="sec1">
      <div className="add-container">
        <div className={`add-box ${shake ? "shake" : ""}`}>
          <button className="close-btn" onClick={handleGoBack}>
            X
          </button>
          {!authenticated ? (
            <form
              onSubmit={handleSubmit}
            >
              {/* <h1 className="add-item-btn">ADICIONAR ITEM</h1> */}
              <div className="input-group">
                <label htmlFor="nome">Nome do item:</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="detalhe">Descrição:</label>
                <div className="description-container">
                  <input
                    type="text"
                    id="detalhe"
                    name="detalhe"
                    value={formData.detalhe}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="input-group">
                <label htmlFor="imagem">Imagem(URL):</label>
                <div className="image-container">
                  <input
                    type="text"
                    id="imagem"
                    name="imagem"
                    value={formData.imagem}
                    onChange={handleChange}
                    placeholder="Opcional"
                  />
                </div>
              </div>

              <button type="submit" className="add-btn">
                ADICIONAR
              </button>
            </form>
          ) : (
            <div className="success-container">
              <Lottie animationData={animation2} loop={false} />
              <h2>{add}</h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
