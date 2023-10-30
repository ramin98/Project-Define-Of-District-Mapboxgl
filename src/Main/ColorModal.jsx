function ColorModal({ setColor, colors, setModalVisible }) {
  return (
    <div className="color-modal-container">
      <div className="color-modal">
        <button onClick={() => setModalVisible(false)} className="close">X</button>
        <ul>
          {colors.map((item) => {
            return(
            <li key={item}>
              <button style={{backgroundColor: item}} onClick={() => {
                setColor(item)
                setModalVisible(false)}}></button>
            </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default ColorModal;
