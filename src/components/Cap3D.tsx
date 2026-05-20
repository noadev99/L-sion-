'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    Float,
    Environment,
    ContactShadows,
    OrbitControls
} from '@react-three/drei'
import * as THREE from 'three'

const CAP_COLOR = '#1E3A8A' // Deep Navy Blue
const STITCH_COLOR = '#3B82F6' // Lighter Blue
const LOGO_COLOR = '#FFFFFF' 
const CROWN_RADIUS = 1.2
const CROWN_FLATTEN = 0.75

// --- Crown ---
function Crown() {
    const geometry = useMemo(() => {
        const geo = new THREE.SphereGeometry(
            CROWN_RADIUS, 64, 48,
            0, Math.PI * 2,
            0, Math.PI * 0.5
        )
        const pos = geo.attributes.position
        for (let i = 0; i < pos.count; i++) {
            let y = pos.getY(i)
            let z = pos.getZ(i)
            
            // Flatten top
            pos.setY(i, y * CROWN_FLATTEN)
            
            // Structured front panel (pulls forward and up slightly)
            if (z > 0 && y > 0.4) {
                const bump = Math.sin(y) * 0.12
                pos.setZ(i, z + bump)
                pos.setY(i, pos.getY(i) + 0.05)
            }
        }
        geo.computeVertexNormals()
        return geo
    }, [])

    return (
        <mesh geometry={geometry} castShadow receiveShadow>
            <meshStandardMaterial 
                color={CAP_COLOR} 
                roughness={0.95} 
                metalness={0.05}
            />
        </mesh>
    )
}

// --- Brim ---
function Brim() {
    const geometry = useMemo(() => {
        const innerR = 1.18
        const outerR = 2.4 
        const segments = 64
        const span = Math.PI * 0.75

        const shape = new THREE.Shape()
        for (let i = 0; i <= segments; i++) {
            const a = -span / 2 + (i / segments) * span
            // A slightly squarish baseball curve
            const r = outerR - Math.pow(Math.abs(a), 2.2) * 0.5
            shape.lineTo(Math.sin(a) * r, Math.cos(a) * r)
        }
        for (let i = segments; i >= 0; i--) {
            const a = -span / 2 + (i / segments) * span
            shape.lineTo(Math.sin(a) * innerR, Math.cos(a) * innerR)
        }
        shape.closePath()

        const geo = new THREE.ExtrudeGeometry(shape, {
            depth: 0.05,
            bevelEnabled: true,
            bevelThickness: 0.015,
            bevelSize: 0.015,
            bevelSegments: 4,
            curveSegments: 32,
        })

        const pos = geo.attributes.position
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i)
            const y = pos.getY(i) 
            const z = pos.getZ(i) 
            
            const dist = Math.sqrt(x * x + y * y)
            const nd = Math.max(0, (dist - innerR) / (outerR - innerR))
            
            // Downward bend (droop)
            const droop = Math.pow(nd, 1.6) * 0.45
            // Side curve downwards
            const sideDroop = Math.pow(Math.abs(x) / (outerR * 0.8), 2) * 0.35
            
            pos.setZ(i, z - droop - sideDroop)
        }
        geo.computeVertexNormals()
        return geo
    }, [])

    return (
        <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color={CAP_COLOR} roughness={0.9} metalness={0.1} />
        </mesh>
    )
}

// --- Seams ---
function PanelSeams() {
    const curves = useMemo(() => {
        const result = []
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2
            const pts = []
            for (let t = 0; t <= 24; t++) {
                const theta = (t / 24) * Math.PI * 0.5
                const baseR = CROWN_RADIUS * Math.sin(theta)
                const r = baseR + 0.007 // slightly outside crown
                const rawY = CROWN_RADIUS * Math.cos(theta)
                
                let y = rawY * CROWN_FLATTEN
                let z = r * Math.cos(angle)
                
                if (z > 0 && y > 0.4) {
                    z += Math.sin(y) * 0.12
                    y += 0.05
                }
                const x = r * Math.sin(angle)
                pts.push(new THREE.Vector3(x, y, z))
            }
            result.push(new THREE.CatmullRomCurve3(pts))
        }
        return result
    }, [])

    return (
        <>
            {curves.map((c, i) => (
                <mesh key={i} castShadow>
                    <tubeGeometry args={[c, 32, 0.012, 6, false]} />
                    <meshStandardMaterial color={STITCH_COLOR} roughness={0.8} />
                </mesh>
            ))}
        </>
    )
}

// --- Top Button ---
function TopButton() {
    const topY = CROWN_RADIUS * CROWN_FLATTEN + 0.02
    return (
        <mesh position={[0, topY, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.08, 0.05, 16]} />
            <meshStandardMaterial color={CAP_COLOR} roughness={0.8} />
        </mesh>
    )
}

// --- Eyelets ---
function Eyelets() {
    const data = useMemo(() => {
        const items = []
        // Angle placements for 6 eyelets
        const angles = [-0.55, 0.55, -1.57, 1.57, -2.6, 2.6]
        const theta = Math.PI * 0.32
        const baseR = CROWN_RADIUS * Math.sin(theta)
        const r = baseR + 0.01
        
        angles.forEach(angle => {
            const rawY = CROWN_RADIUS * Math.cos(theta)
            let y = rawY * CROWN_FLATTEN
            let z = r * Math.cos(angle)
            
            if (z > 0 && y > 0.4) {
               z += Math.sin(y) * 0.12
               y += 0.05
            }
            const x = r * Math.sin(angle)
            
            items.push({
                pos: [x, y, z] as [number, number, number],
                rot: [-(Math.PI / 2 - theta * CROWN_FLATTEN), angle, 0] as [number, number, number],
            })
        })
        return items
    }, [])

    return (
        <>
            {data.map((d, i) => (
                <mesh key={i} position={d.pos} rotation={d.rot}>
                    <torusGeometry args={[0.025, 0.01, 8, 16]} />
                    <meshStandardMaterial color={STITCH_COLOR} roughness={0.6} />
                </mesh>
            ))}
        </>
    )
}

// --- Front Logo ---
function CapLogo() {
    const theta = Math.PI * 0.4
    const r = CROWN_RADIUS + 0.02
    let baseY = r * Math.cos(theta) * CROWN_FLATTEN
    let baseZ = r * Math.sin(theta)
    
    if (baseZ > 0 && baseY > 0.4) {
        baseZ += Math.sin(baseY) * 0.12
        baseY += 0.05
    }

    return (
        <group position={[0, baseY + 0.12, baseZ + 0.04]} rotation={[-0.15, 0, 0]}>
            {/* LÉSION Block Logo */}
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[0.8, 0.25, 0.04]} />
                <meshStandardMaterial color={LOGO_COLOR} roughness={0.3} metalness={0.1} />
            </mesh>
            <mesh position={[0, -0.18, 0]} castShadow>
                <boxGeometry args={[0.5, 0.04, 0.02]} />
                <meshStandardMaterial color={LOGO_COLOR} roughness={0.3} />
            </mesh>
        </group>
    )
}

// --- Main Animated Assembly ---
function AnimatedCap() {
    const groupRef = useRef<THREE.Group>(null)
    
    useFrame((state, delta) => {
        if (!groupRef.current) return
        
        // Gentle rotation
        groupRef.current.rotation.y += delta * 0.25
        
        // Floating
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.06 - 0.1

        // Subtle tilt oscillation
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.06 + 0.1
        groupRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.8) * 0.04
    })

    return (
        <group ref={groupRef}>
            <Crown />
            <Brim />
            <PanelSeams />
            <TopButton />
            <Eyelets />
            <CapLogo />
        </group>
    )
}

export default function Cap3D() {
    return (
        <div className="w-full h-[500px] lg:h-[700px] cursor-grab active:cursor-grabbing relative">
            {/* Ambient background glow matching the cap color */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div
                    className="w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(30,58,138,0.15) 0%, rgba(30,58,138,0.03) 50%, transparent 70%)',
                        filter: 'blur(40px)',
                    }}
                />
            </div>

            <Canvas
                shadows
                camera={{ position: [0, 1.5, 6.5], fov: 35 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                className="relative z-10"
            >
                <ambientLight intensity={0.8} />
                
                {/* Key Light */}
                <spotLight
                    position={[5, 8, 6]}
                    angle={0.4}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                
                {/* Fill Light */}
                <pointLight position={[-4, 3, 2]} intensity={1} color="#60A5FA" />
                
                {/* Back / Rim Light */}
                <pointLight position={[3, -1, -4]} intensity={0.8} color="#FFFFFF" />

                {/* Mouse Interaction Controls */}
                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    minPolarAngle={Math.PI / 3.5}
                    maxPolarAngle={Math.PI / 1.5}
                />
                
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
                    <AnimatedCap />
                </Float>

                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.35}
                    scale={7}
                    blur={3}
                    far={4}
                    color="#1E3A8A"
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
