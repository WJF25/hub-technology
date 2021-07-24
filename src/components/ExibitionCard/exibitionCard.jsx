import "./card.css";
export function ExibitionCard({ nome, curso, tecnologia, handleClickDelete }) {
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
      <p className="paragrafoCard">Tecnologias Conhecidas</p>
      <ul>
        {tecnologia.map((item) => (
          <>
            <li key={item.id}>
              <div className="poseButton">
                {item.title}
                <button onClick={() => handleClickDelete(item.id)}>
                  Deletar
                </button>
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
