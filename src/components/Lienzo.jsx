import '../styles/lienzo.css'

export const Lienzo = ({ children, color = 'var(--bg)', style = {} }) => {
  return (
    <div className="lienzo" style={{ backgroundColor: color }}>
      <div className="contenido-lienzo" style={style}>
        {children}
      </div>
    </div>
  );
};