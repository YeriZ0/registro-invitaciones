import '../styles/loader.css'

export const Loader = () => {
  return (
    <div className="loader-container">
      <div className="bubbles">
        <span className="bubble-loader"></span>
        <span className="bubble-loader" id="bubble2"></span>
        <span className="bubble-loader" id="bubble3"></span>
      </div>
    </div>
  )
}