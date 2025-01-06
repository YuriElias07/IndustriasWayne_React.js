import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import wrong from "../../assets/sounds/wrong.mp3";
import success from "../../assets/sounds/bem_vindo.mp3";
import audio_click from "../../assets/sounds/click-151673.mp3";
import Lottie from "lottie-react";
import animation from "../../assets/animations/Animation - 1734464357784.json";
import axios from "axios";
import { fetchUser } from "../../services/API";

export const Login = () => {
  const [user, setUser] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = user.find(
      (user) => user.login === username && user.senha === password
    );

    localStorage.setItem("authenticated", "true");

    if (users) {
      const successAudio = new Audio(success);
      successAudio.volume = 0.2;
      successAudio.play();
      setAuthenticated(true);
      setShake(false);
      localStorage.setItem("authenticated", true);
      setTimeout(() => {
        navigate("/arsenal");
      }, 3000);
    } else {
      const errorAudio = new Audio(wrong);
      errorAudio.volume = 0.3;
      errorAudio.play();
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleGoBack = () => {
    const audio = new Audio(audio_click);
    audio.play();
    navigate(-1);
  };

  return (
    <section id="sec1">
      <div className="login-container">
        <div className={`login-box ${shake ? "shake" : ""}`}>
          <button className="close-btn" onClick={handleGoBack}>
            X
          </button>
          <h1 className="login-title">Login</h1>
          {!authenticated ? (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Nome de Usuário</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Senha</label>
                <div className="password-container">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <button type="submit" className="login-btn">
                ENTRAR
              </button>
            </form>
          ) : (
            <div className="success-container">
              <Lottie animationData={animation} />
              <h2 className="login-h2">Bem-vindo!</h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
