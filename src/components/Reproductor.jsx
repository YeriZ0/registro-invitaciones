import { useEffect, useRef, useState } from 'react'
import { IconoPlay, IconoPausa, IconoVolumenMax, IconoAltavoz } from '../assets/icon/IconosReproductor'
import { convertirTiempo } from '../utils/convertirTiempo'

import '../styles/reproductor.css'

export const Reproductor = ({ videoId, titulo }) => {
    const playerRef = useRef(null)
    const intervaloRef = useRef(null)
    
    const [reproduciendo, setReproduciendo] = useState(false)
    const [volumen, setVolumen] = useState(37)
    const [progreso, setProgreso] = useState(0)
    const [duracion, setDuracion] = useState(0)

    // Logica de inicializacion del player de Youtube
    useEffect(() => {
        if (!videoId) return
        if (!window.YT) {
            const tag = document.createElement('script')
            tag.src = "https://www.youtube.com/iframe_api"
            const firstScriptTag = document.getElementsByTagName('script')[0]
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        }
        window.onYouTubeIframeAPIReady = () => inicializarPlayer()
        if (window.YT && window.YT.Player) inicializarPlayer()

        return () => {
            if (intervaloRef.current) clearInterval(intervaloRef.current)
        }
    }, [videoId])

    const inicializarPlayer = () => {
        if (playerRef.current) return
        playerRef.current = new window.YT.Player('youtube-player', {
            videoId: videoId,
            playerVars: { controls: 0, disablekb: 1, rel: 0, modestbranding: 1, origin: window.location.origin, enablejsapi: 1 },
            events: {
                onReady: (event) => {
                    setDuracion(event.target.getDuration())
                    event.target.setVolume(volumen)
                },
                onStateChange: (event) => {
                    if (event.data === window.YT.PlayerState.PLAYING) {
                        setReproduciendo(true)
                        iniciarSeguimiento()
                    } else {
                        setReproduciendo(false)
                        if (intervaloRef.current) clearInterval(intervaloRef.current)
                    }
                }
            }
        })
    }

    const iniciarSeguimiento = () => {
        if (intervaloRef.current) clearInterval(intervaloRef.current)
        intervaloRef.current = setInterval(() => {
            if (playerRef.current?.getCurrentTime) {
                setProgreso(playerRef.current.getCurrentTime())
            }
        }, 1000)
    }

    const toggleMusica = () => {
        if (!playerRef.current) return
        reproduciendo ? playerRef.current.pauseVideo() : playerRef.current.playVideo()
    }

    return (
        <>
            <div className="reproductor-estilizado">
                <div id="youtube-player" style={{ position: 'absolute', width: 0, height: 0, opacity: 0 }}></div>

                <p className='titulo-cancion'> {titulo} </p>

                <div className="controles-audio">
                    
                    <div className="reproductor-container">

                        <div className="track-container">
                            <input type="range" min="0" max={duracion} value={progreso} 
                                onChange={(e) => playerRef.current.seekTo(e.target.value, true)} 
                                className="slider-progreso"
                            />
                        </div>
                        
                        <div className='time-container'>
                            <label className='timer-label'>{convertirTiempo(progreso)}</label>
                            <label className='timer-label'>{convertirTiempo(duracion)}</label>
                        </div>
                    </div>

                    <button className="btn-circular" onClick={toggleMusica}>
                        {reproduciendo ? 
                            <IconoPausa size="30px" color="var(--text-lienzo-accent-2)" /> : 
                            <IconoPlay size="30px" color="var(--text-lienzo-accent-2)" />
                        }
                    </button>
                </div>
            </div>

            <div className="volumen-container">

                {volumen < 1 ? 
                <IconoAltavoz size="24px" color="var(--accent)" /> :
                <IconoVolumenMax size="24px" color="var(--accent)" />}
                
                <input type="range" min="0" max="100" value={volumen} 
                    onChange={(e) => {
                        setVolumen(e.target.value)
                        playerRef.current.setVolume(e.target.value)
                    }} 
                    className="slider-volumen"
                />
            </div>
        </>
    )
}