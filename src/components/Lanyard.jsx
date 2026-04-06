/* eslint-disable react/no-unknown-property */
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Environment, Text, ContactShadows } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard() {
    return (
        <Canvas 
            // Pushed camera to 30 and FOV to 30 to fit the massive 2x cards
            camera={{ position: [0, 0, 30], fov: 30 }} 
            gl={{ alpha: true }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
                <Physics gravity={[0, -40, 0]}>
                    {/* Anchors are now very close (0.4 units apart) */}
                    <Band initialX={-0.2} />
                    <Band initialX={0.2} />
                </Physics>
                <Environment preset="city" />
                <ContactShadows position={[0, -10, 0]} opacity={0.4} scale={20} blur={2.5} />
            </Suspense>
        </Canvas>
    );
}

function Band({ initialX = 0 }) {
    const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
    const vec = new THREE.Vector3(), dir = new THREE.Vector3();
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
    const [dragged, drag] = useState(false);

    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
    
    // Attached to the top of the 11-unit tall card
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 5.4, 0]]);

    useFrame((state) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        }
        if (fixed.current) {
            curve.points[0].copy(j3.current.translation());
            curve.points[1].copy(j2.current.translation());
            curve.points[2].copy(j1.current.translation());
            curve.points[3].copy(fixed.current.translation());
            band.current.geometry.setPoints(curve.getPoints(32));
        }
    });

    return (
        <>
            {/* Lowered anchor to y=5 so 11-unit cards center better in the 60vh box */}
            <RigidBody ref={fixed} type="fixed" position={[initialX, 5, 0]} />
            <RigidBody ref={j1} position={[initialX, 4.5, 0]}><BallCollider args={[0.2]} /></RigidBody>
            <RigidBody ref={j2} position={[initialX, 4, 0]}><BallCollider args={[0.2]} /></RigidBody>
            <RigidBody ref={j3} position={[initialX, 3.5, 0]}><BallCollider args={[0.2]} /></RigidBody>
            
            <RigidBody ref={card} position={[initialX, 0, 0]} type={dragged ? 'kinematicPosition' : 'dynamic'}>
                <CuboidCollider args={[4.0, 5.5, 0.2]} />
                <group
                    onPointerDown={(e) => drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))}
                    onPointerUp={() => drag(false)}
                >
                    <mesh>
                        {/* 2X LARGE SIZE */}
                        <boxGeometry args={[8.0, 11.0, 0.4]} />
                        <meshPhysicalMaterial color="white" roughness={0.1} />
                        
                        <group position={[0, 0, 0.21]}>
                            <Text position={[0, 4.0, 0]} fontSize={0.6} color="black">ACUMEN IT</Text>
                            <Text position={[0, 3.2, 0]} fontSize={0.24} color="#888">2026 OFFICIAL PASS</Text>
                            <mesh position={[0, -0.4, 0]}>
                                <planeGeometry args={[5.0, 5.0]} />
                                <meshBasicMaterial color="#1a1a1a" />
                                <Text position={[0, 0, 0.01]} fontSize={0.4} color="white">A·IT</Text>
                            </mesh>
                            <Text position={[0, -4.4, 0]} fontSize={0.24} color="#333">ID: VCE-2026-IT</Text>
                        </group>

                        <group position={[0, 0, -0.21]} rotation={[0, Math.PI, 0]}>
                            <Text position={[0, 4.0, 0]} fontSize={0.4} color="black" fontWeight="bold">GET IN TOUCH</Text>
                            <Text position={[0, 1.6, 0]} fontSize={0.4} color="black">acumenit@vce.ac.in</Text>
                            <Text position={[0, -1.2, 0]} fontSize={0.4} color="black">+91 98765 43210</Text>
                        </group>
                    </mesh>
                </group>
            </RigidBody>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial lineWidth={0.6} color="#000000" depthTest={false} transparent opacity={0.9} />
            </mesh>
        </>
    );
}