import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import wrong from "../../../assets/sounds/wrong.mp3";
import success from "../../../assets/sounds/correct.mp3";
import audio_click from "../../../assets/sounds/click-151673.mp3";
import Lottie from "lottie-react";
import animation2 from "../../../assets/animations/Animation - 1734574554659.json";
import "./style.css";

export const Edit = () => {
  const [formData, setFormData] = useState({
    nome: "",
    detalhe: "",
    imagem: "",
  });
  const [add, setAdd] = useState("Atualizando...");
  const [authenticated, setAuthenticated] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await axios.get(
          `https://backend-industriaswayne.onrender.com/getArsenal/${id}`
        );
        setFormData(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao carregar item:", error);
      }
    };
    fetchItem();
  }, [id]);

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
        const response = await axios.patch(
          `https://backend-industriaswayne.onrender.com/patchArsenal/${id}`,
          {
            nome,
            detalhe,
            imagem,
          }
        );
        const successAudio = new Audio(success);
        successAudio.volume = 0.4;
        successAudio.play();
        setAuthenticated(true);
        setShake(false);
        setTimeout(() => {
          setAdd("Atualizado com sucesso!");
          setTimeout(() => {
            navigate("/arsenal");
            window.location.reload();
          }, 1000); 
        }, 3000);
      } catch (error) {
        console.error(
          "Erro ao atualizar item:",
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
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

              }}
              onSubmit={handleSubmit}
            >
              <h1 className="edit-title">EDITAR ITEM</h1>
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
                <input
                  type="text"
                  id="detalhe"
                  name="detalhe"
                  value={formData.detalhe}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="imagem">Imagem(URL):</label>
                <input
                  type="text"
                  id="imagem"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleChange}
                  placeholder="Opcional"
                />
              </div>

              <button type="submit" className="add-btn">
                ATUALIZAR
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
