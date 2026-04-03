import '../styles/lienzo.css'

export const Lienzo = ({ children, color = 'var(--bg)' }) => {
  return (
    <div className="lienzo" style={{ backgroundColor: color }}>
      <div className="contenido-lienzo">
        {children}
      </div>
    </div>
  );
};