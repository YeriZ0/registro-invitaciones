import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { leerInvitadoUnico, actualizarDatos } from '../services/api'

import { Lienzo } from './Lienzo'
import { DecoracionHoja } from './DecoracionHoja'
import { Reproductor } from './Reproductor'
import { IconoPlay } from '../assets/icon/IconosReproductor'
import { IconoCalendario } from '../assets/icon/iconosInvitacion'

import '../styles/invitacion.css'

export const Invitacion = () => {
    const [datos, setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [abierta, setAbierta] = useState(null)
    const { slug } = useParams()
    
    useEffect(() => {
        const traerDatos = async () => {
            try {
                const resultado = await leerInvitadoUnico(slug)
                setDatos(resultado)
            } catch (error) {
                console.error("Error al cargar la invitacion: ", error)
            } finally {
                setCargando(false)
            }
        }
        traerDatos()
    }, [slug])

    const confirmar = async (nuevoEstado) => {
        const res = await actualizarDatos(datos.id, datos.reserva, nuevoEstado)
        if (res.completado) {
            setDatos({...datos, estado: nuevoEstado})
        }
    }

    if (cargando) return <p>Cargando invitacion...</p>
    if (!datos || !datos.encontrado) return <p>Invitacion no encontrada</p>

    return (
        <main>
            
            {/* --- PARTE 1: EL SOBRE / PASTA (Siempre visible o hasta que se abra) --- */}
            {!abierta ? (
                <div className="fade-in" key={'sobre'}>
                <Lienzo color="var(--white)" clas>
                    {/* Decoraciones de la portada */}
                    <DecoracionHoja fila={1} columna={2} size="250px" top="-100px" left="-80px" rotation={-240} />
                    <DecoracionHoja fila={2} columna={4} size="220px" bottom="-90px" right="-80px" rotation={-30} />

                    <div className="portada-contenedor">
                            <div className="novios-nombres">
                                Kenny <span className="novios-separador">&</span> Mauricio
                            </div>

                            <div className="pase-seccion">
                                <p className="txt-details" style={{ marginBottom: '10px' }}>Especialmente para</p>
                                <h2 className="invitado-nombre-portada">{datos.nombre}</h2>
                            <div className="asientos-cantidad">
                                <strong>
                                    {datos.reserva} {datos.reserva > 1 ? 'PASES RESERVADOS' : 'PASE RESERVADO'}
                                </strong>
                            </div>
                            </div>

                            <button className="btn-abrir" onClick={() => setAbierta(true)}>
                                Abrir Invitación
                            </button>
                    </div>
                </Lienzo>
                </div>
            ) : (
                /* --- PARTE 2: CONTENIDO INTERIOR (Se revela al abrir) --- */
                <div className="fade-in" key={'interior'}>

                    <Lienzo color="#EEEFEA">
                        <DecoracionHoja fila={1} columna={3} size="150px" top="0" right="0" />
                        <p className="txt-romantic">" Ya no son dos, sino uno solo. Por tanto, lo que Dios ha unido, que no lo separe el hombre. " (Mateo 19:6)</p>
        
                        <div className="novios-nombres" style={{ padding: '20px 0'}}>
                            Kenny <span className="novios-separador">&</span> Mauricio
                        </div>
                        <div className='txt-details conteiner'>
                            <p>Dale</p>
                                <div className='box'>
                                    <div className='icon'> {<IconoPlay size='24' />} </div><strong>Play</strong>
                                </div>
                            <p>a nuestra canción.</p>
                        </div>
                        
                        <Reproductor videoId={"D9W4DLjmoOM"} titulo={"Melendi - Destino o Casualidad ft. Ha*Ash"} />

                    </Lienzo>

                    <Lienzo color="var(--carta-color-2)">
                        <p className='txt-romantic' style={{ color: 'var(--text-lienzo-accent-2)', paddingBottom: '20px' }}>
                            Con el amor que nos une, la bendición de Dios y el apoyo de nuestros hijos, te invitamos a celebrar nuestra unión en matrimonio.
                        </p>

                        <div className='txt-details conteiner' style={{gap: '0', color: 'var(--text-lienzo-accent-2)'}}>
                            <p>Anota la </p>
                                <div className='box' style={{border: '0px solid #000'}}>
                                    <div className='icon'> {<IconoCalendario size='24' />} </div>fecha
                                </div>
                            <p>de la celebración</p>
                        </div>

                        <div className='fecha-container'>
                            <div className='day-letter'>Sábado</div>
                            <div className='mounth-letter'>
                                <p>Mayo</p>
                                <div className='day'>16</div>
                            </div>
                            <div className='year-letter'>2026</div>
                        </div>
                    </Lienzo>

                    <Lienzo color="var(--white)">
                        <div className="info-boda">
                            <div className="info-detalle-item">SÁBADO, 15 DE OCTUBRE, 2026</div>
                            <div className="separador-elegante"></div>
                            <div className="info-detalle-item">18:00 HORAS</div>
                            <div className="info-detalle-item" style={{ fontWeight: '600', marginTop: '1rem' }}>QUINTA LAS ROSAS</div>
                        </div>
                    </Lienzo>

                    {/* Aquí irán las secciones de Mapa, Música, Vestimenta y Confirmación */}
                    <Lienzo color="var(--white)">
                        <p>Sección de Mapa y demás detalles en construcción...</p>
                        {/* Botones de confirmación al final de todo el recorrido */}
                        <button className="btn-abrir" onClick={() => setAbierta(false)}>
                        Cerrar Invitación
                        </button>
                    </Lienzo>
                </div>
            )}
            
            {/* <div className="acciones">
                <button onClick={() => confirmar('confirmado')}>Confirmar Asistencia</button>
                <button onClick={() => confirmar('cancelado')}>No podre asistir</button>
            </div> */}
        </main>

            
    )
}