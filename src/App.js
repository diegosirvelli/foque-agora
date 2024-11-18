import "./styles.css";
import React, { useState, useEffect } from "react";

//estados da funções//
function PomodoroTimer() {
  const [minutes, setMinutes] = useState(20); // aqui eu determino o tempo que aparece na tela
  const [seconds, setSeconds] = useState(0);
  const [isWork, setIsWork] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  const [endTime, setEndTime] = useState(null);

  const handleChange = (event) => {
    // função principal que será responsavel por atualizar a caixa de texto
    setText(event.target.value);
  };

  useEffect(() => {
    // aqui eu crio a logica do meu codigo

    let timer;
    if (isActive && endTime) {
      timer = setInterval(() => {
        const currentTime = new Date();
        const timeRemaining = Math.max(endTime - currentTime, 0);

        const newMinutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const newSeconds = Math.floor((timeRemaining / 1000) % 60);

        setMinutes(newMinutes);
        setSeconds(newSeconds);

        if (timeRemaining <= 0) {
          toggleTimer();
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, endTime]);

  const toggleTimer = () => {
    // função responsavel por alterar o periodo de trabalho e de descanso
    if (isWork) {
      setMinutes(5);
    } else {
      setMinutes(20);
    }
    setSeconds(0);
    setIsWork(!isWork);
  };

  const startPauseTimer = () => {
    if (!isActive) {
      const currentTime = new Date();
      const newEndTime = new Date(
        currentTime.getTime() + minutes * 60000 + seconds * 1000
      );
      setEndTime(newEndTime);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    // função responsavel por pausar o tempo do codigo
    setIsActive(false);
    setMinutes(isWork ? 20 : 5);
    setSeconds(0);
    setEndTime(null);
  };
  //abaixo fica a parte de hmtl
  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage:
          "url('https://rciead.baraodemaua.br/my/upload_img/arquivos/alarm-clock_144627-19768.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
      className="card"
    >
      <h1>{isWork ? "Vamos trabalhar" : "Descanse"}</h1>
      <h2>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </h2>
      <div>
        <button onClick={startPauseTimer} className="button">
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button onClick={resetTimer} className="button">
          Reiniciar
        </button>
      </div>
      <h6>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Seu trabalho do dia"
          style={{ width: "400px", height: "80px", marginTop: "200px" }}
        />
      </h6>
    </div>
  );
}

export default PomodoroTimer;
