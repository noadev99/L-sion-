'use client'

import { useRef, useMemo, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
    Float,
    Environment,
    PresentationControls,
    ContactShadows,
    useTexture,
    Decal,
} from '@react-three/drei'
import * as THREE from 'three'

// ─── Build a realistic T-shirt mesh from BufferGeometry ──────────────────

function createTShirtGeometry(): THREE.BufferGeometry {
    // We'll define vertices for a t-shirt shape using a detailed mesh
    // Front face of the shirt shown to user, with proper UVs for the decal

    const shape = new THREE.Shape()

    // T-shirt silhouette - start bottom left, go clockwise
    // Bottom hem
    shape.moveTo(-1.1, -2.0)
    shape.quadraticCurveTo(0, -2.1, 1.1, -2.0)

    // Right side body
    shape.lineTo(1.1, 0.1)

    // Right sleeve outer
    shape.lineTo(2.2, 0.55)
    shape.lineTo(2.3, 0.35)

    // Right sleeve bottom
    shape.lineTo(2.15, -0.15)

    // Right armpit
    shape.lineTo(1.2, -0.05)
    shape.quadraticCurveTo(1.15, 0.05, 1.1, 0.1)

    // Right side to shoulder
    shape.lineTo(1.1, 0.85)

    // Right collar
    shape.quadraticCurveTo(0.6, 1.15, 0.35, 1.25)

    // Collar neck curve
    shape.quadraticCurveTo(0, 1.45, -0.35, 1.25)

    // Left collar to shoulder
    shape.quadraticCurveTo(-0.6, 1.15, -1.1, 0.85)

    // Left side down to sleeve
    shape.lineTo(-1.1, 0.1)

    // Left armpit
    shape.quadraticCurveTo(-1.15, 0.05, -1.2, -0.05)

    // Left sleeve bottom
    shape.lineTo(-2.15, -0.15)

    // Left sleeve outer
    shape.lineTo(-2.3, 0.35)
    shape.lineTo(-2.2, 0.55)

    // Left sleeve to body
    shape.lineTo(-1.1, 0.1)

    // Left side body back to start
    shape.lineTo(-1.1, -2.0)

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
        depth: 0.6,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.04,
        bevelSegments: 2,
        curveSegments: 32,
    }

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.center()
    geometry.computeVertexNormals()

    return geometry
}


// ─── Front Chest Panel (flat plane for clean decal application) ──────────

function ChestDecal() {
    const texture = useTexture('/images/tshirt-design.png')

    return (
        <mesh position={[0, 0.05, 0.38]} castShadow>
            <planeGeometry args={[1.6, 1.1]} />
            <meshStandardMaterial
                map={texture}
                transparent={true}
                roughness={0.9}
                metalness={0}
                depthWrite={false}
                polygonOffset
                polygonOffsetFactor={-1}
            />
        </mesh>
    )
}


// ─── T-Shirt Body ────────────────────────────────────────────────────────

function TShirtBody() {
    const geometry = useMemo(() => createTShirtGeometry(), [])

    return (
        <mesh geometry={geometry} castShadow receiveShadow>
            <meshPhysicalMaterial
                color="#111111"
                roughness={0.92}
                metalness={0.0}
                clearcoat={0.02}
                clearcoatRoughness={0.95}
                side={THREE.DoubleSide}
                envMapIntensity={0.3}
            />
        </mesh>
    )
}


// ─── Collar Rib ──────────────────────────────────────────────────────────

function CollarRib() {
    const curve = useMemo(() => {
        // Collar sits at top of the shirt (after centering ~y=1.0)
        return new THREE.EllipseCurve(0, 0, 0.38, 0.12, 0, Math.PI * 2, false, 0)
    }, [])

    const points = curve.getPoints(64)
    const tubeShape = new THREE.CatmullRomCurve3(
        points.map(p => new THREE.Vector3(p.x, p.y, 0))
    )

    return (
        <mesh position={[0, 1.0, 0.0]} rotation={[Math.PI / 2.1, 0, 0]} castShadow>
            <tubeGeometry args={[tubeShape, 64, 0.045, 8, true]} />
            <meshStandardMaterial
                color="#1a1a1a"
                roughness={0.95}
                metalness={0}
            />
        </mesh>
    )
}


// ─── Animated T-shirt group ──────────────────────────────────────────────

function AnimatedTShirt() {
    const groupRef = useRef<THREE.Group>(null)
    const [hovered, setHovered] = useState(false)
    const targetScale = useRef(1)

    useFrame((state, delta) => {
        if (!groupRef.current) return

        // Auto-rotate
        groupRef.current.rotation.y += 0.006

        // Gentle breathing float
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.06

        // Subtle tilt oscillation
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.02 + 0.05
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.015

        // Smooth scale on hover
        targetScale.current = hovered ? 1.06 : 1
        const currentScale = groupRef.current.scale.x
        const newScale = THREE.MathUtils.lerp(currentScale, targetScale.current, delta * 4)
        groupRef.current.scale.setScalar(newScale)
    })

    return (
        <group
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <TShirtBody />
            <ChestDecal />
            <CollarRib />
        </group>
    )
}


// ─── Loading Fallback ────────────────────────────────────────────────────

function LoadingFallback() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
        }
    })

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[1, 1.4, 0.3]} />
            <meshStandardMaterial color="#222" wireframe />
        </mesh>
    )
}


// ─── Main Exported Component ─────────────────────────────────────────────

export default function TShirt3D() {
    return (
        <div className="w-full h-[500px] lg:h-[700px] cursor-grab active:cursor-grabbing relative">
            {/* Ambient glow behind the shirt */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div
                    className="w-[280px] h-[280px] lg:w-[420px] lg:h-[420px] rounded-full"
                    style={{
                        background: 'radial-gradient(circle, rgba(155,181,201,0.25) 0%, rgba(212,165,165,0.1) 40%, transparent 70%)',
                        filter: 'blur(50px)',
                    }}
                />
            </div>

            <Canvas
                shadows
                camera={{ position: [0, 0, 8], fov: 30 }}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
                className="relative z-10"
            >
                <ambientLight intensity={0.5} />

                {/* Key light - front-right */}
                <spotLight
                    position={[4, 6, 6]}
                    angle={0.35}
                    penumbra={1}
                    intensity={1.8}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    color="#ffffff"
                />

                {/* Fill light - left, slight blue tint */}
                <pointLight position={[-4, 2, 4]} intensity={0.5} color="#9bb5c9" />

                {/* Rim light - back */}
                <pointLight position={[2, 3, -5]} intensity={0.6} color="#d4a5a5" />

                {/* Bottom bounce */}
                <pointLight position={[0, -4, 2]} intensity={0.15} color="#f5f3f0" />

                <PresentationControls
                    global
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 1200 }}
                    rotation={[0.05, 0, 0]}
                    polar={[-Math.PI / 5, Math.PI / 5]}
                    azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
                        <Suspense fallback={<LoadingFallback />}>
                            <AnimatedTShirt />
                        </Suspense>
                    </Float>
                </PresentationControls>

                <ContactShadows
                    position={[0, -2.6, 0]}
                    opacity={0.3}
                    scale={7}
                    blur={2.5}
                    far={4}
                    color="#000000"
                />

                <Environment preset="city" />
            </Canvas>
        </div>
    )
}
