import React from 'react'


const Particles = ({ count = 5000 }) => {
    const mesh = useRef()
    const light = useRef()
    const { size, mouse } = useThree()
    const [hovered, setHovered] = useState(false)
  
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const particles = useMemo(() => {
      const temp = []
      for (let i = 0; i < count; i++) {
        const t = Math.random() * 100
        const factor = 20 + Math.random() * 100
        const speed = 0.01 + Math.random() / 200
        const xFactor = -50 + Math.random() * 100
        const yFactor = -50 + Math.random() * 100
        const zFactor = -50 + Math.random() * 100
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
      }
      return temp
    }, [count])
  
    useFrame((state) => {
      light.current.position.set(mouse.x * 20, mouse.y * 20, 0)
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle
        t = particle.t += speed / 2
        const a = Math.cos(t) + Math.sin(t * 1) / 10
        const b = Math.sin(t) + Math.cos(t * 2) / 10
        const s = Math.max(1.5, Math.cos(t) * 5)
        
        if (hovered) {
          particle.mx += (mouse.x * size.width - particle.mx) * 0.02
          particle.my += (mouse.y * size.height - particle.my) * 0.02
        } else {
          particle.mx += ((state.mouse.x * size.width) / 10 - particle.mx) * 0.1
          particle.my += ((state.mouse.y * size.height) / 10 - particle.my) * 0.1
        }
        
        dummy.position.set(
          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        )
        dummy.scale.set(s, s, s)
        dummy.updateMatrix()
        mesh.current.setMatrixAt(i, dummy.matrix)
      })
      mesh.current.instanceMatrix.needsUpdate = true
    })
  
    return (
      <>
        <pointLight ref={light} distance={40} intensity={8} color="cyan" />
        <instancedMesh 
          ref={mesh} 
          args={[null, null, count]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <dodecahedronGeometry args={[0.2, 0]} />
          <meshPhongMaterial color="#00ffff" />
        </instancedMesh>
      </>
    )
  }



//   const Particles = ({ count = 5000 }) => {
//     const mesh = useRef()
//     const light = useRef()
  
//     const dummy = useMemo(() => new THREE.Object3D(), [])
//     const particles = useMemo(() => {
//       const temp = []
//       for (let i = 0; i < count; i++) {
//         const t = Math.random() * 100
//         const factor = 20 + Math.random() * 100
//         const speed = 0.01 + Math.random() / 200
//         const xFactor = -50 + Math.random() * 100
//         const yFactor = -50 + Math.random() * 100
//         const zFactor = -50 + Math.random() * 100
//         temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
//       }
//       return temp
//     }, [count])
  
//     useFrame((state) => {
//       particles.forEach((particle, i) => {
//         let { t, factor, speed, xFactor, yFactor, zFactor } = particle
//         t = particle.t += speed / 2
//         const a = Math.cos(t) + Math.sin(t * 1) / 10
//         const b = Math.sin(t) + Math.cos(t * 2) / 10
//         const s = Math.cos(t)
//         particle.mx += (state.mouse.x * 1000 - particle.mx) * 0.01
//         particle.my += (state.mouse.y * 1000 - 1 - particle.my) * 0.01
//         dummy.position.set(
//           (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
//           (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
//           (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
//         )
//         dummy.scale.set(s, s, s)
//         dummy.rotation.set(s * 5, s * 5, s * 5)
//         dummy.updateMatrix()
//         mesh.current.setMatrixAt(i, dummy.matrix)
//       })
//       mesh.current.instanceMatrix.needsUpdate = true
//     })
  
//     return (
//       <>
//         <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
//         <instancedMesh ref={mesh} args={[null, null, count]}>
//           <dodecahedronGeometry args={[0.2, 0]} />
//           <meshPhongMaterial color="#050505" />
//         </instancedMesh>
//       </>
//     )
//   }
export default Particles
