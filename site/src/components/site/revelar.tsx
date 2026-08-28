"use client"

import { motion, useReducedMotion } from "motion/react"

/** Curva de salida del sistema. Nunca ease-in, ni entrando ni saliendo. */
const SALIDA = [0.23, 1, 0.32, 1] as const

type Props = {
  children: React.ReactNode
  className?: string
  /** Segundos de retraso. Para escalonar, entre 0.03 y 0.08 por elemento. */
  retraso?: number
  /** Anima al montar en vez de al entrar en pantalla. Para el hero. */
  alCargar?: boolean
}

export function Revelar({
  children,
  className,
  retraso = 0,
  alCargar = false,
}: Props) {
  const reducir = useReducedMotion()

  // Con movimiento reducido se conserva el fundido y se quita el
  // desplazamiento: más suave, no ausente.
  const oculto = reducir
    ? { opacity: 0 }
    : { opacity: 0, transform: "translateY(24px)" }
  const visible = reducir
    ? { opacity: 1 }
    : { opacity: 1, transform: "translateY(0px)" }

  const transicion = {
    duration: reducir ? 0.3 : 0.7,
    delay: retraso,
    ease: SALIDA,
  }

  if (alCargar) {
    return (
      <motion.div
        className={className}
        initial={oculto}
        animate={visible}
        transition={transicion}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={oculto}
      whileInView={visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={transicion}
    >
      {children}
    </motion.div>
  )
}
