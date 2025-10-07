'use client';

import { motion } from 'framer-motion';

export default function LiquidShape() {
  return (
    <div className="relative h-32 w-44 sm:h-40 sm:w-52 md:h-48 md:w-60 flex items-center justify-center">
      <motion.div
        className="relative"
        style={{
          width: '10rem',
          height: '10rem',
          background: `
            radial-gradient(circle at 30% 30%, rgba(56, 175, 242, 0.9) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(115, 221, 110, 0.9) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(190, 93, 241, 0.9) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(254, 107, 89, 0.9) 0%, transparent 50%),
            linear-gradient(135deg, #38aff2 0%, #73dd6e 25%, #fe6b59 50%, #be5df1 75%, #38aff2 100%)
          `,
          filter: 'blur(0px)',
        }}
        animate={{
          borderRadius: [
            '20% 20% 20% 20% / 20% 20% 20% 20%', // 1. Quadrado arredondado
            '28% 25% 26% 24% / 26% 27% 24% 28%', // 2. Leve assimetria
            '38% 32% 35% 30% / 34% 36% 31% 38%', // 3. Mais orgânico
            '15% 85% 15% 85% / 85% 15% 85% 15%', // 4. FORMA DE CRUZ/FLOR
            '35% 65% 35% 65% / 65% 35% 65% 35%', // 5. Cruz suave
            '50% 50% 50% 50% / 50% 50% 50% 50%', // 6. Círculo perfeito
            '80% 20% 80% 20% / 20% 80% 20% 80%', // 7. LOSANGO EXTREMO
            '65% 35% 65% 35% / 35% 65% 35% 65%', // 8. Losango médio
            '90% 10% 90% 10% / 10% 90% 10% 90%', // 9. FORMA DE ESTRELA
            '75% 25% 75% 25% / 25% 75% 25% 75%', // 10. Estrela suave
            '45% 55% 45% 55% / 55% 45% 55% 45%', // 11. Quase circular irregular
            '10% 90% 10% 90% / 90% 10% 90% 10%', // 12. CRUZ INVERTIDA EXTREMA
            '30% 70% 30% 70% / 70% 30% 70% 30%', // 13. Forma X
            '60% 40% 60% 40% / 40% 60% 40% 60%', // 14. Blob assimétrico
            '85% 15% 50% 50% / 50% 50% 15% 85%', // 15. FORMA ABSTRATA MALUCA
            '70% 30% 45% 55% / 55% 45% 30% 70%', // 16. Irregular complexo
            '40% 60% 70% 30% / 30% 70% 60% 40%', // 17. Totalmente assimétrico
            '25% 75% 50% 50% / 50% 50% 75% 25%', // 18. Forma de gota
            '55% 45% 35% 65% / 65% 35% 45% 55%', // 19. Blob complexo
            '35% 35% 65% 65% / 65% 65% 35% 35%', // 20. Forma de coração abstrato
            '45% 55% 55% 45% / 45% 55% 55% 45%', // 21. Ondulado
            '22% 22% 22% 22% / 22% 22% 22% 22%', // 22. Retornando ao quadrado
            '20% 20% 20% 20% / 20% 20% 20% 20%', // 23. Quadrado final
          ],
          rotate: [
            0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 24, 21, 18, 15, 12, 15, 18, 21,
            18, 15, 12, 6, 0,
          ],
          scale: [
            1, 1.01, 1.02, 1.03, 1.04, 1.05, 1.06, 1.07, 1.08, 1.09, 1.08, 1.07,
            1.06, 1.05, 1.06, 1.07, 1.06, 1.05, 1.04, 1.03, 1.02, 1.01, 1,
          ],
        }}
        transition={{
          duration: 20,
          ease: [0.45, 0.05, 0.55, 0.95],
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          width: '10rem',
          height: '10rem',
          background: `
            radial-gradient(circle at 30% 30%, rgba(56, 175, 242, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(115, 221, 110, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 30% 70%, rgba(190, 93, 241, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(254, 107, 89, 0.4) 0%, transparent 50%)
          `,
          filter: 'blur(20px)',
        }}
        animate={{
          borderRadius: [
            '20% 20% 20% 20% / 20% 20% 20% 20%',
            '28% 25% 26% 24% / 26% 27% 24% 28%',
            '38% 32% 35% 30% / 34% 36% 31% 38%',
            '15% 85% 15% 85% / 85% 15% 85% 15%',
            '35% 65% 35% 65% / 65% 35% 65% 35%',
            '50% 50% 50% 50% / 50% 50% 50% 50%',
            '80% 20% 80% 20% / 20% 80% 20% 80%',
            '65% 35% 65% 35% / 35% 65% 35% 65%',
            '90% 10% 90% 10% / 10% 90% 10% 90%',
            '75% 25% 75% 25% / 25% 75% 25% 75%',
            '45% 55% 45% 55% / 55% 45% 55% 45%',
            '10% 90% 10% 90% / 90% 10% 90% 10%',
            '30% 70% 30% 70% / 70% 30% 70% 30%',
            '60% 40% 60% 40% / 40% 60% 40% 60%',
            '85% 15% 50% 50% / 50% 50% 15% 85%',
            '70% 30% 45% 55% / 55% 45% 30% 70%',
            '40% 60% 70% 30% / 30% 70% 60% 40%',
            '25% 75% 50% 50% / 50% 50% 75% 25%',
            '55% 45% 35% 65% / 65% 35% 45% 55%',
            '35% 35% 65% 65% / 65% 65% 35% 35%',
            '45% 55% 55% 45% / 45% 55% 55% 45%',
            '22% 22% 22% 22% / 22% 22% 22% 22%',
            '20% 20% 20% 20% / 20% 20% 20% 20%',
          ],
          scale: [
            1.2, 1.21, 1.22, 1.23, 1.24, 1.25, 1.26, 1.27, 1.28, 1.29, 1.28,
            1.27, 1.26, 1.25, 1.26, 1.27, 1.26, 1.25, 1.24, 1.23, 1.22, 1.21,
            1.2,
          ],
        }}
        transition={{
          duration: 20,
          ease: [0.45, 0.05, 0.55, 0.95],
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      {/* Additional floating particles */}
      <motion.div
        className="absolute"
        style={{
          width: '3rem',
          height: '3rem',
          background:
            'radial-gradient(circle, rgba(115, 221, 110, 0.6) 0%, transparent 70%)',
          filter: 'blur(8px)',
          top: '10%',
          right: '5%',
        }}
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      />

      <motion.div
        className="absolute"
        style={{
          width: '2.5rem',
          height: '2.5rem',
          background:
            'radial-gradient(circle, rgba(190, 93, 241, 0.5) 0%, transparent 70%)',
          filter: 'blur(8px)',
          bottom: '15%',
          left: '10%',
        }}
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0],
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
          delay: 0.5,
        }}
      />
    </div>
  );
}
