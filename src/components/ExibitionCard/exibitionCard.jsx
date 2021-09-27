import { useState } from "react";
import { FiDelete, FiEdit, FiSend } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./card.css";
export function ExibitionCard({
  nome,
  curso,
  tecnologia,
  handleClickDelete,
  updateTech,
}) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(true);

  const editShow = (param) => {
    setShow(param);
  };

  return (
    <div className="Card">
      <p className="paragrafoCard">
        {" "}
        <span>Nome:</span>
        {nome}
      </p>
      <p className="paragrafoCard">
        <span>Curso-Modulo:</span>
        {curso}
      </p>
      <p className="paragrafoCardTitle">Tecnologias Conhecidas</p>
      <ul>
        {tecnologia.map((item) => (
          <>
            <li key={item.id}>
              <div className="poseButton">
                <p>{item.title}</p>

                <FiDelete
                  className="delete"
                  type="submit"
                  onClick={() => handleClickDelete(item.id, item.title)}
                />
                {show && (
                  <FiEdit type="submit" onClick={() => editShow(item.id)} />
                )}

                {show === item.id && (
                  <div className="editConditional">
                    <FiSend
                      onClick={() => {
                        updateTech(value, item.id, item.title);
                        editShow(true);
                      }}
                    />
                    <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Atualizar Status"
                    />
                    <AiOutlineCloseCircle onClick={() => editShow(true)} />
                  </div>
                )}
              </div>

              <p>
                <span>Status:</span> {item.status}
              </p>
            </li>{" "}
          </>
        ))}
      </ul>
    </div>
  );
}
