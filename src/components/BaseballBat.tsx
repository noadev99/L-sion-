'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Environment, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

function BatModel() {
    const meshRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating/rotating animation
            meshRef.current.rotation.y += 0.005
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            rotation={[0, 0, Math.PI / 4]}
        >
            {/* Bat Handle (Grip) */}
            <mesh position={[0, -2, 0]}>
                <cylinderGeometry args={[0.15, 0.12, 1.5, 32]} />
                <meshStandardMaterial color="#222" roughness={0.8} />
            </mesh>

            {/* Knob at bottom of handle */}
            <mesh position={[0, -2.75, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Transition Handle to Barrel */}
            <mesh position={[0, -0.75, 0]}>
                <cylinderGeometry args={[0.35, 0.15, 1, 32]} />
                <meshStandardMaterial color="#f0d6b0" roughness={0.3} metalness={0.1} />
            </mesh>

            {/* Bat Barrel (Main body) */}
            <mesh position={[0, 1, 0]}>
                <cylinderGeometry args={[0.4, 0.35, 2.5, 32]} />
                <meshStandardMaterial color="#f0d6b0" roughness={0.3} metalness={0.1} />

                {/* Lésion Branding */}
                <Text
                    position={[0, 0, 0.41]}
                    rotation={[0, 0, -Math.PI / 2]}
                    fontSize={0.4}
                    color="black"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKGGKmXYA.woff"
                    anchorX="center"
                    anchorY="middle"
                >
                    LÉSION
                </Text>
            </mesh>

            {/* Bat Top (Cap) */}
            <mesh position={[0, 2.25, 0]}>
                <sphereGeometry args={[0.4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#f0d6b0" roughness={0.3} metalness={0.1} />
            </mesh>
        </group>
    )
}

export default function BaseballBat() {
    return (
        <div className="w-full h-[400px] lg:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas shadows camera={{ position: [0, 0, 7], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 1500 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <BatModel />
                    </Float>
                </PresentationControls>

                <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
