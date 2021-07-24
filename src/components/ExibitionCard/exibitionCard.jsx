import "./card.css";
export function ExibitionCard({ nome, curso, tecnologia, handleClickDelete }) {
  return (
    <div className="Card">
      <p>Nome:{nome}</p>
      <p>Curso-Modulo:{curso}</p>
      <ul>
        <p>Tencnologias Conhecidas</p>
        {tecnologia.map((item) => (
          <>
            <li>
              {item.title}
              <button onClick={() => handleClickDelete(item.id)}>
                Deletar
              </button>
              <br></br>
              <p>Status: {item.status}</p>
            </li>{" "}
          </>
        ))}
      </ul>
    </div>
  );
}
