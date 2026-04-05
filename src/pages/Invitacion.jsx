import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { leerInvitadoUnico, actualizarDatos } from '../services/api'
import { sizeVariable } from '../utils/sizeVariable'
import { itinerarioActividades } from '../data/dataInvitacion'

import { Loader } from '../components/Loader'
import { Lienzo } from '../components/Lienzo'
import { DecoracionHoja } from '../components/DecoracionHoja'
import { Reproductor } from '../components/Reproductor'
import { IconoPlay } from '../assets/icon/IconosReproductor'
import { 
    IconoCalendario,
    IconoRuta,
    IconoIglesia,
    IconoBanquete,
    IconoHorario,
    IconoRegaloDinero,
    IconoVestido,
    IconoZapato,
    IconoUsuarioConfirmado,
    IconoWhatsapp,
    IconoCorazon
} from '../assets/icon/IconosInvitacion'
import { LineaTemporal } from '../components/LineaTemporal'

import '../styles/invitacion.css'

export const Invitacion = () => {
    const [datos, setDatos] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [abierta, setAbierta] = useState(null)
    const { slug } = useParams()
    
    const estado = (datos) => {
        if (datos.estado == 'confirmado') return 'confirmado'
        if (datos.estado == 'cancelado') return 'cancelado'

        return 'pendiente'
    }

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

    if (cargando) return <Loader />
    if (!datos || !datos.encontrado) return <p>Invitacion no encontrada</p>

    return (
        <main>
            
            {/* --- PARTE 1: EL SOBRE / PASTA (Siempre visible o hasta que se abra) --- */}
            {!abierta ? (
                <div className="fade-in" key={'sobre'}>
                <Lienzo color="var(--carta-color-1)" clas>
                    {/* Decoraciones de la portada */}
                    <DecoracionHoja fila={1} columna={2} size={sizeVariable(200, 25, 250)} top="-100px" left="-80px" rotation={-240} />
                    <DecoracionHoja fila={2} columna={4} size={sizeVariable(180, 25, 220)} bottom="-90px" right="-80px" rotation={-30} />

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

                    <Lienzo color="var(--carta-color-1)">
                        <DecoracionHoja fila={1} columna={3} size="150px" top="0" right="0" />
                        <p className="txt-romantic" style={{marginBottom: 0}}>" Ya no son dos, sino uno solo.</p>
                        <p className="txt-romantic" style={{marginTop: 0}}>Por tanto, lo que Dios ha unido, que no lo separe el hombre. " (Mateo 19:6)</p>
        
                        <div className="novios-nombres" style={{ padding: '20px 0'}}>
                            Kenny <div className='icon' style={{ paddingTop: '20px'}}> <IconoCorazon size='70'/> </div> Mauricio
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

                        <div className='separator' />

                        <div className='txt-details conteiner' style={{gap: '0', color: 'var(--text-lienzo-accent-2)'}}>
                            <p>Anota la </p>
                                <div className='box' style={{border: '0px solid #000'}}>
                                    <div className='icon'> {<IconoCalendario size='24' />} </div> <strong>fecha</strong>
                                </div>
                            <p>de la celebración</p>
                        </div>

                        <div className='fecha-container'>
                            <div className='day-letter'>Sáb</div>
                            <div className='mounth-letter'>
                                <p>Mayo</p>
                                <div className='day'>16</div>
                            </div>
                            <div className='year-letter'>2026</div>
                        </div>
                    </Lienzo>

                    <Lienzo color="var(--carta-color-1)">
                        
                        <div className='informacion-actividad'>
                            <div className='icon'> <IconoIglesia size='55' /> </div>
                            <p><strong>Ceremonia Religiosa</strong></p>
                        </div>
                        <p className='label-mapa'>
                            Iglesia Divina Misericordia, Valle Nuevo, San José La Majada, Juayúa, Sonsonate.
                        </p>

                        <div className='mapa' style={{ width: sizeVariable(280, 100, 500)}}>
                            <div className='mapa-proporcion'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1936.9582755026534!2d-89.70667625950028!3d13.844047469387293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62bf0047a87331%3A0x98566767c81792f3!2sIglesia%20Profetica%20la%20Ciudad%20de%20Sion%20Col.%20San%20Rafael%20Valle%20Nuevo%20LA%20Majada%20Juay%C3%BAa%20Sonsonate!5e0!3m2!1ses-419!2ssv!4v1775355807193!5m2!1ses-419!2ssv" 
                                    allowfullscreen="" 
                                    loading="lazy" 
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                        
                        <a
                            href="https://waze.com/ul?ll=13.8441374,-89.7058395&navigate=yes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='btn-mapa'>
                            <div className='icon'> <IconoRuta size='30' /> </div>
                            <p>Ver trayecto en <strong>Waze</strong></p>
                        </a>
                        
                        <div className='separator' />

                        <div className='informacion-actividad'>
                            <div className='icon'> <IconoBanquete size='55' /> </div>
                            <p><strong>Recepción</strong></p>
                        </div>
                        <p className='label-mapa'>
                            Rancho el Plan,  Valle Nuevo, San José La Majada, Juayúa, Sonsonate (contiguo a la Iglesia Divina Misericordia).
                        </p>

                        <div className='mapa' style={{ width: sizeVariable(280, 100, 500)}}>
                            <div className='mapa-proporcion'>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1936.9577981711482!2d-89.70692302272967!3d13.844104763814594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62bfda4987bdaf%3A0xf01d220d0bb7932f!2sRANCHO%20EL%20PLAN!5e0!3m2!1ses-419!2ssv!4v1775349389383!5m2!1ses-419!2ssv"
                                    allowfullscreen="" 
                                    loading="lazy" 
                                    referrerpolicy="no-referrer-when-downgrade">
                                </iframe>
                            </div>
                        </div>
                        
                        <a 
                            href="https://waze.com/ul?ll=13.8442,-89.7025&navigate=yes" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='btn-mapa'>
                            <div className='icon'> <IconoRuta size='25' /> </div>
                            <p>Ver trayecto en <strong>Waze</strong></p>
                        </a>

                    </Lienzo>
                    
                    <Lienzo color='var(--carta-color-2)'>
                        <div className='informacion-actividad' style={{ color: 'var(--text-lienzo-accent-2)' }}>
                            <div className='icon'>
                                <IconoHorario size='75' /> 
                            </div>
                            <p><strong>Itinerario</strong></p>
                        </div>    

                        <p className='txt-details' style={{ color: 'var(--text-lienzo-accent-2)' }} >
                            El día de nuestra boda.
                        </p>                    

                        <LineaTemporal data={itinerarioActividades}></LineaTemporal>
                    </Lienzo>

                    <Lienzo color='var(--carta-color-1)'>
                        <div className='informacion-actividad'>
                            <div className='icon'>
                                <IconoVestido size='50'/>
                                <IconoZapato size='50' />
                            </div>
                            <p><strong>Vestimenta</strong></p>   
                        </div> 

                        <p className='label-mapa'>
                            Para honrar la integridad del estilo nupcial y el protagonismo de la novia, solicitamos a nuestras invitadas asistir con gala formal, <strong>omitiendo el uso de prendas blancas o niveas</strong> durante el evento.
                        </p>

                        <div className='separator' style={{paddingTop: '30px'}}/>

                        <div className='informacion-actividad'>
                            <div className='icon'>
                                <IconoRegaloDinero size='75'/>
                            </div>
                            <p><strong>Sugerencia de Regalos</strong></p>   
                        </div> 

                        <p className='label-mapa'>
                            Su presencia es el mayor obsequio que podemos recibir. No obstante, si desea tener un detalle con nosotros, agradeceremos su muestra de afecto mediante un sobre el dia de nuestro enlace.
                        </p> 
                    </Lienzo>

                    <Lienzo color='var(--carta-color-2)'>
                        <div className='informacion-actividad' style={{ color: 'var(--text-lienzo-accent-2)' }}>
                            <div className='icon'>
                                <IconoUsuarioConfirmado size='50' /> 
                            </div>
                            <p><strong>Confirmar Asistencia</strong></p>
                        </div>    

                        <p className='label-mapa' style={{ color: 'var(--text-lienzo-accent-2)' }}>
                            Agradecemos que confirmes tu asistencia <strong>antes del 10 de mayo de 2026</strong>
                        </p>

                        <div className='confirmar-container'>
                            <h2 className="invitado-nombre-portada">{datos.nombre}</h2>
                            <div className="asientos-cantidad">
                                <strong>
                                    {datos.reserva} {datos.reserva > 1 ? 'PASES RESERVADOS' : 'PASE RESERVADO'}
                                </strong>
                            </div>

                            <p className='label-mapa'>
                                Su respuesta a la invitación es
                            </p>

                            <p className={`estado-invitado ${estado(datos)}`} style={{ color: 'var(--text-lienzo-accent-2)' }} >
                                {datos.estado}
                            </p>  
                        </div>

                        <div className="acciones">
                            <button onClick={() => confirmar('confirmado')}>Confirmar Asistencia</button>
                            <button onClick={() => confirmar('cancelado')}>No podre asistir</button>
                        </div>
                    </Lienzo>

                    <Lienzo color="var(--carta-color-1)">
                        <div className="final-agradecimiento">
                            <p className="texto-despedida">
                                <div className='icon'> <IconoCorazon size='70'/> </div>
                                Esperamos contar con su presencia
                            </p>

                            <button 
                                className="btn-cerrar-vista"
                                onClick={() => setAbierta(false)} 
                            >
                                Finalizar
                            </button>
                        </div>
                    </Lienzo>
                </div>
            )}
        </main>  
    )
}