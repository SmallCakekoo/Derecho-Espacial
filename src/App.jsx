import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Group } from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Rocket, 
  Globe, 
  Scale, 
  Users, 
  Shield, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Satellite,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Target,
  Lock,
  Gavel
} from 'lucide-react'

// Componente para estrellas titilantes y flotantes
function TwinklingStars() {
  const group1Ref = useRef()
  const group2Ref = useRef()
  const group3Ref = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Animación de titilado y movimiento flotante para cada capa de estrellas
    if (group1Ref.current) {
      const opacity1 = 0.7 + Math.sin(time * 0.5) * 0.3
      // Efecto flotante: movimiento suave en varias direcciones
      group1Ref.current.rotation.x = Math.sin(time * 0.1) * 0.05
      group1Ref.current.rotation.y = Math.cos(time * 0.15) * 0.05
      group1Ref.current.children.forEach(child => {
        if (child.material) child.material.opacity = opacity1
      })
    }
    
    if (group2Ref.current) {
      const opacity2 = 0.6 + Math.sin(time * 0.3 + 1) * 0.4
      // Movimiento flotante diferente para crear profundidad
      group2Ref.current.rotation.x = Math.cos(time * 0.12) * 0.08
      group2Ref.current.rotation.y = Math.sin(time * 0.18) * 0.08
      group2Ref.current.children.forEach(child => {
        if (child.material) child.material.opacity = opacity2
      })
    }
    
    if (group3Ref.current) {
      const opacity3 = 0.5 + Math.sin(time * 0.4 + 2) * 0.5
      // Movimiento más lento para estrellas distantes
      group3Ref.current.rotation.x = Math.sin(time * 0.08) * 0.1
      group3Ref.current.rotation.y = Math.cos(time * 0.1) * 0.1
      group3Ref.current.children.forEach(child => {
        if (child.material) child.material.opacity = opacity3
      })
    }
  })

  return (
    <>
      {/* Estrellas principales con brillo más intenso */}
      <group ref={group1Ref}>
        <Stars 
          radius={300} 
          depth={60} 
          count={30000} 
          factor={7} 
          saturation={0} 
          fade={false}
          speed={0}
        />
      </group>
      
      {/* Estrellas secundarias con titilado medio */}
      <group ref={group2Ref}>
        <Stars 
          radius={400} 
          depth={80} 
          count={15000} 
          factor={5} 
          saturation={0} 
          fade={false}
          speed={0}
        />
      </group>
      
      {/* Estrellas distantes con titilado más suave */}
      <group ref={group3Ref}>
        <Stars 
          radius={500} 
          depth={100} 
          count={10000} 
          factor={3} 
          saturation={0} 
          fade={false}
          speed={0}
        />
      </group>
    </>
  )
}

// Componente de fondo espacial interactivo con estrellas en movimiento
function SpaceBackground() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: 0,
      background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)'
    }}>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Estrellas titilantes */}
        <TwinklingStars />
      </Canvas>
    </div>
  )
}

// Componente para espacios de imágenes
function ImagePlaceholder({ src, alt, style = {}, className = "" }) {
  return (
    <div 
      className={`image-placeholder ${className}`}
      style={{
        width: '300px',
        height: '200px',
        background: 'rgba(74, 144, 226, 0.1)',
        border: '2px dashed rgba(74, 144, 226, 0.5)',
        borderRadius: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '1rem',
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '13px'
          }}
        />
      ) : (
        <img 
          src="src/images/slides/1.png" 
          alt={alt || 'Imagen relacionada'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '13px'
          }}
        />
      )}
    </div>
  )
}

// Componente de diapositiva individual
function Slide({ children, isActive, slideNumber, totalSlides }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 100 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className={`slide ${isActive ? 'active' : ''}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        overflow: 'hidden'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '1400px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'auto',
        position: 'relative'
      }}>
        {children}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)',
          background: 'rgba(0, 0, 0, 0.5)',
          padding: '0.5rem 1rem',
          borderRadius: '20px'
        }}>
          {slideNumber} / {totalSlides}
        </div>
      </div>
    </motion.div>
  )
}

// Componente para texto brillante con efecto neón
function NeonText({ children, style = {} }) {
  return (
    <motion.div
      animate={{
        textShadow: [
          // Con colores más apagados (rgba para controlar opacidad)
          `0 0 3px rgba(255,255,255,0.5), 0 0 6px rgba(255,255,255,0.3), 0 0 12px rgb(24, 23, 39, 0.6), 0 0 25px rgb(24, 23, 39, 0.4)`,
          
          `0 0 3px rgba(255,255,255,0.5), 0 0 6px rgba(255,255,255,0.3), 0 0 12px rgba(74,144,226,0.6), 0 0 25px rgba(74,144,226,0.4)`,
          
          `0 0 3px rgba(255,255,255,0.5), 0 0 6px rgba(255,255,255,0.3), 0 0 12px rgb(24, 23, 39, 0.6), 0 0 25px rgb(24, 23, 39, 0.4)`
        ]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        color: '#fff',
        textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa',
        ...style
      }}
    >
      {children}
    </motion.div>
  )
}

// Componente de tarjeta expandible interactiva
function ExpandableCard({ title, content, icon: Icon, color = '#4a90e2' }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        background: isExpanded 
          ? `linear-gradient(135deg, ${color}26 0%, ${color}0d 100%)`
          : 'rgba(74, 144, 226, 0.1)',
        padding: '1.5rem',
        borderRadius: '15px',
        border: isExpanded 
          ? `2px solid ${color}`
          : '1px solid rgba(74, 144, 226, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        minHeight: isExpanded ? '200px' : 'auto',
        height: isExpanded ? 'auto' : 'fit-content'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: isExpanded ? '1rem' : '0' }}>
        {Icon && <Icon size={30} color={isExpanded ? '#fff' : color} />}
        <h3 style={{ color: isExpanded ? '#fff' : color, margin: 0, fontSize: '1.1rem' }}>{title}</h3>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div style={{ paddingTop: '1rem', lineHeight: '1.6' }}>{content}</div>
      </motion.div>
    </motion.div>
  )
}

// Componente de ventana lateral para tratados
function TreatyModal({ isOpen, onClose, treaty, index }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              zIndex: 1000
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              bottom: 0,
              width: '400px',
              background: 'rgba(26, 26, 46, 0.95)',
              backdropFilter: 'blur(10px)',
              padding: '2rem',
              overflowY: 'auto',
              zIndex: 1001,
              borderLeft: '2px solid rgba(74, 144, 226, 0.3)'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255, 99, 99, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ✕
            </button>
            <h3 style={{ color: '#4a90e2', fontSize: '1.5rem', marginBottom: '1rem' }}>
              {treaty.year} – {treaty.title}
            </h3>
            {treaty.image && (
              <img 
                src={treaty.image} 
                alt={treaty.title}
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  background: 'rgba(74, 144, 226, 0.1)',
                  padding: '0.5rem'
                }}
              />
            )}
            <p style={{ color: '#a0a0a0', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {treaty.description}
            </p>
            <div style={{
              background: 'rgba(74, 144, 226, 0.1)',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid rgba(74, 144, 226, 0.3)'
            }}>
              <p style={{ fontSize: '0.9rem', color: '#fff' }}>{treaty.details}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Diapositiva 1: Portada con frase de impacto
function TitleSlide() {
  return (
    <Slide isActive={true} slideNumber={1} totalSlides={10}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Globe size={80} color="#4a90e2" style={{ marginBottom: '1rem' }} />
        </motion.div>
        <NeonText style={{
          fontSize: '3.2rem', 
          marginBottom: '1rem',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          DERECHO ESPACIAL
        </NeonText>
        <h2 style={{ 
          fontSize: '1.6rem', 
          color: '#a0a0a0',
          marginBottom: '2rem',
          fontWeight: '300',
          fontStyle: 'italic'
        }}>
          La ley más allá de la Tierra
        </h2>
        
        <div style={{
          background: 'rgba(74, 144, 226, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(74, 144, 226, 0.3)',
          marginBottom: '2rem',
          maxWidth: '700px'
        }}>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#e0e0e0',
            lineHeight: '1.6',
            fontStyle: 'italic',
            marginBottom: '1rem'
          }}>
            "Incluso en el vacío del cosmos hay normas que nos guían."
          </p>
        </div>
        
        <div style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>
          <p>Sary Fernanda Payán Bastidas • Universidad Icesi • 2025</p>
        </div>
      </motion.div>
    </Slide>
  )
}

// Diapositiva 2: El origen de la pregunta
function OriginSlide() {
  return (
    <Slide isActive={true} slideNumber={2} totalSlides={10}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%'
      }}>
        <div style={{ flex: 1 }}>
          <Rocket size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            El origen de la pregunta
          </h2>
          
          <div style={{
            background: 'rgba(74, 144, 226, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '1px solid rgba(74, 144, 226, 0.3)',
            marginBottom: '1.5rem'
          }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '1rem', lineHeight: '1.6', fontStyle: 'italic' }}>
              "Cuando lanzamos el Sputnik en 1957, una nueva pregunta nació:"
            </p>
            <h3 style={{ fontSize: '1.8rem', color: '#4a90e2', marginBottom: '1rem' }}>
              ¿A quién pertenece el espacio?
            </h3>
          </div>
          
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>Contexto histórico:</strong> La Guerra Fría impulsó una carrera espacial sin precedentes entre Estados Unidos y la Unión Soviética. Cada lanzamiento generaba nuevas preguntas legales sin respuesta.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>El problema:</strong> ¿Quién era responsable si un satélite causaba daños? ¿Podía un país reclamar soberanía sobre la Luna? ¿Era legal usar el espacio para fines militares?
            </p>
            <p style={{ marginBottom: '1rem' }}>
              <strong>La solución:</strong> La comunidad internacional reconoció la necesidad urgente de crear un marco legal que regulara las actividades espaciales antes de que fuera demasiado tarde.
            </p>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <ImagePlaceholder 
          src={"src/images/slides/1.png"}
            alt="Sputnik 1 - Primer satélite artificial"
            style={{ width: '530px', height: '350px' }}
          />
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 3: ¿Qué es el Derecho Espacial?
function WhatIsSpaceLawSlide() {
  return (
    <Slide isActive={true} slideNumber={3} totalSlides={10}>
      <div style={{ maxWidth: '1100px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Scale size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            ¿Qué es el Derecho Espacial?
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginTop: '2rem'
        }}>
          <ExpandableCard
            title="Definición"
            icon={Scale}
            color="#4a90e2"
            content={
              <div>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Rama del Derecho Internacional Público que regula actividades más allá de la atmósfera terrestre.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#fff' }}>
                  Emergió en respuesta a la exploración espacial y la necesidad de regular las actividades fuera de nuestro planeta.
                </p>
              </div>
            }
          />
          
          <ExpandableCard
            title="Alcance"
            icon={Globe}
            color="#4a90e2"
            content={
              <div>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Se aplica a Estados, empresas privadas y particulares que participan en actividades espaciales.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#fff' }}>
                  Todos los actores espaciales deben cumplir con los tratados y normas internacionales.
                </p>
              </div>
            }
          />
          
          <ExpandableCard
            title="Objetivo"
            icon={Target}
            color="#4a90e2"
            content={
              <div>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  Busca mantener el espacio como patrimonio común de la humanidad.
                </p>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#fff' }}>
                  Promueve el uso pacífico del espacio y la cooperación internacional para beneficio de todos.
                </p>
              </div>
            }
          />
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 4: Breve historia y evolución
function HistorySlide() {
  const timelineEvents = [
    {
      year: 1957,
      title: 'Sputnik',
      description: 'Primer satélite artificial lanzado por la Unión Soviética',
      details: 'El lanzamiento del Sputnik marcó el inicio de la era espacial y generó la primera necesidad de regulación legal internacional para el espacio exterior.'
    },
    {
      year: 1967,
      title: 'Tratado del Espacio Ultraterrestre',
      description: 'Constitución cósmica básica',
      details: 'Estableció los principios fundamentales: uso pacífico del espacio, no apropiación, responsabilidad estatal y cooperación internacional.'
    },
    {
      year: 1979,
      title: 'Acuerdo sobre la Luna',
      description: 'Regulación de recursos lunares',
      details: 'Declaró que la Luna y sus recursos son patrimonio común de la humanidad, estableciendo pautas para la futura explotación de recursos espaciales.'
    },
    {
      year: 2000,
      title: 'Empresas Privadas',
      description: 'SpaceX, Blue Origin, y el New Space',
      details: 'La entrada de empresas privadas en la carrera espacial ha revolucionado el sector, requiriendo actualizaciones en el marco legal para regular estas nuevas actividades comerciales.'
    }
  ]

  return (
    <Slide isActive={true} slideNumber={4} totalSlides={10}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%',
        padding: '1rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <BookOpen size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            Breve historia y evolución
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginTop: '1rem',
          width: '100%'
        }}>
          {timelineEvents.map((event, index) => (
            <ExpandableCard
              key={index}
              title={event.year}
              icon={Rocket}
              color="#4a90e2"
              content={
                <div style={{ 
                  maxHeight: '300px', 
                  overflowY: 'auto',
                  paddingRight: '8px'
                }}>
                  <style>
                    {`
                      .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                      }
                      .custom-scrollbar::-webkit-scrollbar-track {
                        background: rgba(74, 144, 226, 0.1);
                        border-radius: 10px;
                      }
                      .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #4a90e2;
                        border-radius: 10px;
                      }
                      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #7b68ee;
                      }
                    `}
                  </style>
                  <div className="custom-scrollbar">
                    <h4 style={{ color: '#4a90e2', marginBottom: '0.5rem', fontSize: '1rem' }}>{event.title}</h4>
                    <p style={{ fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '0.8rem', color: '#fff' }}>
                      {event.description}
                    </p>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#e0e0e0' }}>
                      {event.details}
                    </p>
                  </div>
                </div>
              }
            />
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          marginTop: '1rem',
          textAlign: 'center',
          width: '100%'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', fontStyle: 'italic' }}>
            "Del control político a la cooperación y el comercio espacial"
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <ImagePlaceholder 
            src="src/images/slides/2.jpg"
            alt="Línea de tiempo espacial"
            style={{ width: '300px', height: '200px' }}
          />
          <ImagePlaceholder 
            src="src/images/slides/3.png"
            alt="Evolución de la tecnología espacial"
            style={{ width: '300px', height: '200px' }}
          />
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 5: Principios fundamentales
function PrinciplesSlide() {
  const principles = [
    { title: 'Uso pacífico', desc: 'Prohibido militarizar el espacio', detail: 'El espacio debe ser utilizado exclusivamente para fines pacíficos, prohibiendo el emplazamiento de armas nucleares o cualquier tipo de armas de destrucción masiva en órbitas terrestres.', icon: Scale },
    { title: 'No apropiación', desc: 'Nadie puede "poseer" un planeta', detail: 'Ningún Estado puede reclamar soberanía sobre el espacio exterior, la Luna o cualquier otro cuerpo celeste mediante ocupación u otros medios.', icon: Globe },
    { title: 'Responsabilidad', desc: 'Los Estados responden por lo que lancen', detail: 'Los Estados son internacionalmente responsables por las actividades espaciales nacionales realizadas por organismos gubernamentales o entidades no gubernamentales.', icon: Gavel },
    { title: 'Cooperación', desc: 'El espacio es para todos', detail: 'Se promueve la cooperación y asistencia mutua en las actividades espaciales, especialmente en el rescate de astronautas en peligro.', icon: Users },
    { title: 'Libertad', desc: 'Cualquier nación puede investigar', detail: 'Todos los Estados tienen libertad para explorar y usar el espacio exterior sin discriminación, en condiciones de igualdad y de conformidad con el derecho internacional.', icon: Rocket }
  ]

  return (
    <Slide isActive={true} slideNumber={5} totalSlides={10}>
      <div style={{ maxWidth: '1100px', width: '100%', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Shield size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            Principios fundamentales
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {principles.map((principle, index) => (
            <ExpandableCard
              key={index}
              title={principle.title}
              icon={principle.icon}
              color="#4a90e2"
              content={
                <div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '0.8rem', color: '#fff' }}>
                    {principle.desc}
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#e0e0e0' }}>
                    {principle.detail}
                  </p>
                </div>
              }
            />
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', fontStyle: 'italic' }}>
            "El espacio no tiene dueño, pero sí reglas."
          </p>
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 6: Tratados internacionales clave
function TreatiesSlide() {
  const [selectedTreaty, setSelectedTreaty] = useState(null)
  
  const treaties = [
    {
      year: 1967,
      title: 'Tratado del Espacio Exterior',
      description: 'Constitución cósmica básica',
      details: 'Establece que el espacio exterior, incluida la Luna y otros cuerpos celestes, es patrimonio común de la humanidad. Prohíbe la apropiación nacional, el emplazamiento de armas nucleares y establece que el espacio debe usarse solo para fines pacíficos.',
      image: 'src/images/slides/TratadodelEspacioExterior.jpg'
    },
    {
      year: 1968,
      title: 'Acuerdo de Rescate',
      description: 'Rescate de astronautas',
      details: 'Obliga a los Estados a prestar asistencia a los astronautas en caso de accidente, peligro o aterrizaje no programado, considerando a los astronautas como enviados de la humanidad.',
      image: 'src/images/slides/AcuerdodeRescate.jpg'
    },
    {
      year: 1972,
      title: 'Convenio de Responsabilidad',
      description: 'Daños por objetos espaciales',
      details: 'Establece la responsabilidad absoluta de un Estado lanzador por los daños causados por sus objetos espaciales en la Tierra o en vuelo. El Estado lanzador es completamente responsable de cualquier daño causado por sus objetos espaciales.',
      image: 'src/images/slides/ConvenioDeResponsabilidad.png'
    },
    {
      year: 1975,
      title: 'Convenio de Registro',
      description: 'Registro de objetos espaciales',
      details: 'Requiere el registro en Naciones Unidas de todos los objetos lanzados al espacio exterior, proporcionando información sobre órbita, función y parámetros básicos. Mantiene un registro internacional de actividades espaciales.',
      image: 'src/images/slides/RegistroDeObjetosEspaciales.jpg'
    },
    {
      year: 1979,
      title: 'Acuerdo sobre la Luna',
      description: 'Recursos lunares',
      details: 'Declara que la Luna y sus recursos naturales son patrimonio común de la humanidad. Establece un régimen internacional para la explotación de recursos lunares cuando sea factible, aunque no ha sido ratificado por las principales potencias espaciales.',
      image: 'src/images/slides/RecursosLunares.jpg'
    }
  ]

  return (
    <Slide isActive={true} slideNumber={6} totalSlides={10}>
      <div style={{ maxWidth: '1000px', width: '100%', padding: '1rem', overflowX: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <BookOpen size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            Tratados internacionales clave
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#a0a0a0' }}>Haz clic en cada tratado para ver detalles</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem',
          maxWidth: '100%'
        }}>
          {treaties.map((treaty, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedTreaty(index)}
              style={{
                background: 'rgba(74, 144, 226, 0.1)',
                padding: '1.5rem',
                borderRadius: '15px',
                border: '2px solid rgba(74, 144, 226, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: '#4a90e2', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  {treaty.year}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.4', color: '#a0a0a0', marginBottom: '0.5rem' }}>
                  {treaty.title}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#4a90e2' }}>
                  {treaty.description}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#ffc107', marginTop: '0.5rem' }}>
                  → Haz clic para detalles
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', fontStyle: 'italic' }}>
            "Estos tratados son el equivalente a una constitución cósmica."
          </p>
        </div>
      </div>
      
      <TreatyModal 
        isOpen={selectedTreaty !== null}
        onClose={() => setSelectedTreaty(null)}
        treaty={selectedTreaty !== null ? treaties[selectedTreaty] : null}
        index={selectedTreaty}
      />
    </Slide>
  )
}

// Diapositiva 7: Aplicaciones prácticas
function ApplicationsSlide() {
  const applications = [
    { title: 'Registro de satélites', desc: 'Cada objeto lanzado debe registrarse en la ONU', detail: 'Objetivo: garantizar trazabilidad y transparencia de actividades espaciales. Cada Estado debe proporcionar información sobre órbita, función y parámetros operativos.', icon: Satellite, color: '#4a90e2' },
    { title: 'Basura espacial', desc: 'Más de 500,000 objetos en órbita', detail: 'Challenge: desechos de misiones anteriores colisionan constantemente. Necesidad urgente de regulación para limpieza y prevención de colisiones catastróficas.', icon: AlertTriangle, color: '#ff6b6b' },
    { title: 'Responsabilidad por daños', desc: 'Estados responden por sus objetos lanzados', detail: 'Responsabilidad absoluta del Estado lanzador. Precedente: URSS pagó 3 millones CAD a Canadá por Cosmos 954 (1978).', icon: Gavel, color: '#4a90e2' },
    { title: 'Comercio de datos', desc: 'Mercado de datos satelitales en crecimiento', detail: 'GPS, comunicaciones, imágenes satelitales generan billones. Regulación de propiedad intelectual, privacidad y soberanía de datos espaciales.', icon: TrendingUp, color: '#4a90e2' }
  ]

  return (
    <Slide isActive={true} slideNumber={7} totalSlides={10}>
      <div style={{ maxWidth: '1200px', width: '100%', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Target size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            Aplicaciones prácticas
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem',
          marginTop: '1rem',
          width: '100%'
        }}>
          {applications.map((app, index) => (
            <ExpandableCard
              key={index}
              title={app.title}
              icon={app.icon}
              color={app.color}
              content={
                <div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '0.8rem', color: '#fff' }}>
                    {app.desc}
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#e0e0e0' }}>
                    {app.detail}
                  </p>
                </div>
              }
            />
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255, 107, 107, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          marginTop: '1.5rem',
          width: '100%'
        }}>
          <h3 style={{ color: '#ff6b6b', marginBottom: '0.8rem', fontSize: '1.2rem' }}>🛰️ Caso real: Cosmos 954 (1978)</h3>
          <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
            Satélite soviético con reactor nuclear que cayó en Canadá. 
            <strong style={{ color: '#ff6b6b' }}> La URSS tuvo que pagar 3 millones CAD por contaminación radiactiva.</strong>
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '1.5rem'
        }}>
          <ImagePlaceholder 
            src="src/images/slides/4.png"
            alt="Cosmos 954 - Satélite soviético"
            style={{ width: '600px', height: '200px' }}
          />
          <ImagePlaceholder 
            src="src/images/slides/5.jpg"
            alt="Mapa de impacto en Canadá"
            style={{ width: '300px', height: '200px' }}
          />
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 8: Desafíos del presente
function ChallengesSlide() {
  const challenges = [
    { title: 'Basura espacial', desc: 'Más de 500,000 objetos', detail: 'Debris de misiones anteriores colisiona constantemente. Necesidad urgente de regulación para limpieza, prevención y gestión de desechos orbitales para evitar colisiones catastróficas que inutilicen órbitas valiosas.', icon: AlertTriangle, color: '#ff6b6b' },
    { title: 'Minería espacial', desc: '¿De quién son los recursos?', detail: 'Asteroides ricos en metales preciosos plantean preguntas sobre derecho de propiedad. ¿Quién puede extraer recursos? ¿Cómo se distribuyen las ganancias? ¿Sovereignty vs. commons?', icon: Target, color: '#ff6b6b' },
    { title: 'Militarización', desc: 'Satélites espías y armas orbitales', detail: 'Uso creciente de activos espaciales para defensa, vigilancia y potencial ofensa. Límites difusos entre pacífico y militar. Amenaza de carrera armamentística espacial.', icon: Shield, color: '#ff6b6b' },
    { title: 'Empresas privadas', desc: 'Nuevas potencias sin bandera', detail: 'SpaceX, Blue Origin, Virgin Galactic desafían el modelo estatal tradicional. ¿Quién regula sus actividades? ¿Cómo se adjudica responsabilidad? ¿Transparentación internacional de operaciones privadas?', icon: Rocket, color: '#ff6b6b' }
  ]

  return (
    <Slide isActive={true} slideNumber={8} totalSlides={10}>
      <div style={{ maxWidth: '1100px', width: '100%', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <AlertTriangle size={60} color="#ff6b6b" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#ff6b6b' }}>
            Desafíos del presente
          </h2>
        </div>
        
        <div style={{
          background: 'rgba(255, 107, 107, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.3rem', color: '#ff6b6b', fontStyle: 'italic' }}>
            "El espacio no es tan vacío como parece"
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {challenges.map((challenge, index) => (
            <ExpandableCard
              key={index}
              title={challenge.title}
              icon={challenge.icon}
              color={challenge.color}
              content={
                <div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '0.8rem', color: '#fff' }}>
                    {challenge.desc}
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#e0e0e0' }}>
                    {challenge.detail}
                  </p>
                </div>
              }
            />
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', fontStyle: 'italic' }}>
            "El derecho espacial envejece más rápido que los cohetes."
          </p>
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 9: Futuro del Derecho Espacial
function FutureSlide() {
  const futures = [
    { title: 'Colonias espaciales', desc: 'Luna y Marte como nuevos hogares', detail: 'Necesidad de establecer derechos de residencia, jurisdicción territorial, normas de convivencia y gobierno en ambientes fuera de la Tierra. ¿Qué ley rige cuando alguien nace en Marte?', icon: Globe, color: '#4a90e2' },
    { title: 'Turismo espacial', desc: 'Viajeros espaciales privados', detail: 'Regulación de seguridad, seguros, responsabilidad civil y estándares de entrenamiento para ciudadanos no-astronautas que viajen al espacio como turistas.', icon: Rocket, color: '#4a90e2' },
    { title: 'Legislación nacional', desc: 'Cada país desarrolla sus normas', detail: 'Estados Unidos, Luxemburgo, Emiratos Árabes Unidos ya tienen leyes de minería espacial. Colombia y otros países latinoamericanos están desarrollando marcos regulatorios propios.', icon: Target, color: '#4a90e2' }
  ]

  return (
    <Slide isActive={true} slideNumber={9} totalSlides={10}>
      <div style={{ maxWidth: '1100px', width: '100%', padding: '1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <TrendingUp size={60} color="#4a90e2" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#4a90e2' }}>
            Futuro del Derecho Espacial
          </h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {futures.map((future, index) => (
            <ExpandableCard
              key={index}
              title={future.title}
              icon={future.icon}
              color={future.color}
              content={
                <div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.6', marginBottom: '0.8rem', color: '#fff' }}>
                    {future.desc}
                  </p>
                  <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#e0e0e0' }}>
                    {future.detail}
                  </p>
                </div>
              }
            />
          ))}
        </div>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          marginTop: '1.5rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#ffc107', fontStyle: 'italic' }}>
            "Necesitamos leyes que protejan no solo la Tierra, sino el cosmos que habitaremos."
          </p>
        </div>
      </div>
    </Slide>
  )
}

// Diapositiva 10: Cierre/Conclusión
function ConclusionSlide() {
  return (
    <Slide isActive={true} slideNumber={10} totalSlides={10}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <Users size={80} color="#4a90e2" style={{ marginBottom: '1rem' }} />
        </motion.div>
        <NeonText style={{
          fontSize: '2.8rem', 
          marginBottom: '2rem',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          CONCLUSIÓN
        </NeonText>
        
        <div style={{
          background: 'rgba(74, 144, 226, 0.1)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid rgba(74, 144, 226, 0.3)',
          marginBottom: '2rem',
          maxWidth: '700px'
        }}>
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#e0e0e0',
            lineHeight: '1.6',
            fontStyle: 'italic',
            marginBottom: '1.5rem'
          }}>
            "El espacio exterior no tiene fronteras,<br/>
            pero nuestra responsabilidad sí debe alcanzarlas."
          </p>
        </div>
        
        <div style={{
          background: 'rgba(255, 193, 7, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          border: '1px solid rgba(255, 193, 7, 0.3)',
          marginBottom: '2rem',
          maxWidth: '600px'
        }}>
          <h3 style={{ color: '#ffc107', marginBottom: '1rem', fontSize: '1.3rem' }}>
            Pregunta al público:
          </h3>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#ffc107',
            fontStyle: 'italic'
          }}>
            "¿Y si alguien nace fuera de la Tierra... bajo qué ley vivirá?"
          </p>
        </div>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#a0a0a0'
        }}>
          Gracias por su atención
        </p>
      </motion.div>
    </Slide>
  )
}

// Componente principal de la aplicación
function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [slideTimer, setSlideTimer] = useState(null)

  const slides = [
    { component: TitleSlide, duration: 5000 },
    { component: OriginSlide, duration: 45000 },
    { component: WhatIsSpaceLawSlide, duration: 45000 },
    { component: HistorySlide, duration: 45000 },
    { component: PrinciplesSlide, duration: 45000 },
    { component: TreatiesSlide, duration: 45000 },
    { component: ApplicationsSlide, duration: 45000 },
    { component: ChallengesSlide, duration: 45000 },
    { component: FutureSlide, duration: 45000 },
    { component: ConclusionSlide, duration: 30000 },
  ]

  const totalSlides = slides.length

  // Función para avanzar a la siguiente diapositiva
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  // Función para retroceder a la diapositiva anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  // Función para reproducir/pausar presentación automática
  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(slideTimer)
      setIsPlaying(false)
    } else {
      const timer = setInterval(nextSlide, slides[currentSlide]?.duration || 30000)
      setSlideTimer(timer)
      setIsPlaying(true)
    }
  }

  // Función para reiniciar la presentación
  const resetPresentation = () => {
    clearInterval(slideTimer)
    setCurrentSlide(0)
    setIsPlaying(false)
  }

  // Limpiar timer al desmontar
  useEffect(() => {
    return () => clearInterval(slideTimer)
  }, [slideTimer])

  const CurrentSlideComponent = slides[currentSlide]?.component

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Fondo espacial 3D - Se carga inmediatamente */}
      <SpaceBackground />
      
      {/* Contenido de la presentación */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 1
      }}>
        <AnimatePresence mode="wait">
          {CurrentSlideComponent && (
            <CurrentSlideComponent key={currentSlide} />
          )}
        </AnimatePresence>
      </div>

      {/* Controles de navegación */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '1rem',
        zIndex: 10,
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '1rem',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={prevSlide}
          style={{
            background: 'rgba(74, 144, 226, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={togglePlayPause}
          style={{
            background: isPlaying ? 'rgba(255, 99, 99, 0.8)' : 'rgba(99, 255, 99, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        
        <button
          onClick={nextSlide}
          style={{
            background: 'rgba(74, 144, 226, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          <ChevronRight size={24} />
        </button>
        
        <button
          onClick={resetPresentation}
          style={{
            background: 'rgba(255, 193, 7, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white'
          }}
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Indicador de progreso */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '2px',
        zIndex: 10
      }}>
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #4a90e2, #7b68ee)',
            borderRadius: '2px'
          }}
          initial={{ width: '0%' }}
          animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}

export default App