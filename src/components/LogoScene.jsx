import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function Logo({ url }) {
  const groupRef = useRef()
  const { scene } = useGLTF(url)

  // Clone to avoid mutation issues
  const cloned = scene.clone(true)

  // Apply emissive material glow
  cloned.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        const mat = child.material.clone()
        mat.color.set('#00f5ff') // Force aqua color
        mat.emissive = new THREE.Color('#00f5ff')
        mat.emissiveIntensity = 0.5
        mat.envMapIntensity = 1.5
        child.material = mat
      }
    }
  })

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime()
      groupRef.current.rotation.y = t * 0.15
    }
  })

  return (
    <group ref={groupRef} scale={1.8} position={[0, -1.5, 0]}>
      <primitive object={cloned} />
    </group>
  )
}

function Particles() {
  const count = 800
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    // Blue to cyan color range
    const t = Math.random()
    colors[i * 3]     = 0.0 + t * 0.1
    colors[i * 3 + 1] = 0.4 + t * 0.4
    colors[i * 3 + 2] = 0.9 + t * 0.1
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const pointsRef = useRef()
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function FallbackLogo() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime()
      meshRef.current.rotation.y = t * 0.5
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.3
      meshRef.current.position.y = Math.sin(t * 0.8) * 0.12
    }
  })
  return (
    <mesh ref={meshRef} scale={1.5}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#00f5ff"
        emissive="#00f5ff"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.1}
        wireframe={false}
      />
    </mesh>
  )
}

function SceneContent({ hasGlb }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00f5ff" />
      <pointLight position={[-5, -3, -5]} intensity={1.5} color="#0077ff" />
      <spotLight position={[0, 8, 0]} intensity={1} angle={0.4} color="#ffffff" />

      <Suspense fallback={<FallbackLogo />}>
        {hasGlb ? (
          <Logo url="/logo.glb" />
        ) : (
          <FallbackLogo />
        )}
      </Suspense>

      <Particles />

      <Environment preset="night" />
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={8}
        blur={2.5}
        color="#0077ff"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 3}
      />
    </>
  )
}

export default function LogoScene({ hasGlb = true }) {
  return (
    <Canvas
      camera={{ position: [0, -1, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: 'transparent' }}
    >
      <SceneContent hasGlb={hasGlb} />
    </Canvas>
  )
}

// Preload the GLB
useGLTF.preload('/logo.glb')
