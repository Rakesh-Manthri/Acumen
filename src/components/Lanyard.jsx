/* eslint-disable react/no-unknown-property */
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, ContactShadows } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard() {
    return (
        <Canvas camera={{ position: [0, 0, 15], fov: 18 }} gl={{ alpha: true }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
                <Physics gravity={[0, -40, 0]}>
                    <Band initialX={-1} />
                    <Band initialX={1} />
                </Physics>
                <Environment preset="city" />
                <ContactShadows position={[0, -5, 0]} opacity={0.4} scale={10} blur={2} />
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
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

    useFrame((state) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
            dir.copy(vec).sub(state.camera.position).normalize();
            vec.add(dir.multiplyScalar(state.camera.position.length()));
            [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
            card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
        } else if (card.current) {
            // Apply a more pronounced horizontal swing
            card.current.applyImpulse({ x: Math.sin(state.clock.elapsedTime + initialX) * 0.02, y: 0, z: 0 }, true);
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
            <RigidBody ref={fixed} type="fixed" position={[initialX, 4, 0]} />
            <RigidBody ref={j1} position={[initialX, 3.5, 0]}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody ref={j2} position={[initialX, 3, 0]}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody ref={j3} position={[initialX, 2.5, 0]}><BallCollider args={[0.1]} /></RigidBody>
            <RigidBody ref={card} position={[initialX, 1, 0]} type={dragged ? 'kinematicPosition' : 'dynamic'} linearDamping={1.5} angularDamping={1.0}>
                <CuboidCollider args={[0.8, 1.1, 0.05]} />
                <group
                    onPointerDown={(e) => drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))}
                    onPointerUp={() => drag(false)}
                >
                    <mesh>
                        <boxGeometry args={[1.6, 2.2, 0.1]} />
                        <meshPhysicalMaterial color="white" roughness={0.1} />
                        
                        {/* FRONT SIDE */}
                        <group position={[0, 0, 0.06]}>
                            <Text position={[0, 0.6, 0]} fontSize={0.12} color="black">ACUMEN IT</Text>
                            <Text position={[0, 0.42, 0]} fontSize={0.05} color="#888" letterSpacing={0.1}>2026 OFFICIAL PASS</Text>
                            
                            {/* Visual Logo Block */}
                            <mesh position={[0, -0.2, 0]}>
                                <planeGeometry args={[1.0, 1.0]} />
                                <meshBasicMaterial color="#1a1a1a" />
                                <Text position={[0, 0, 0.01]} fontSize={0.08} color="white">A·IT</Text>
                            </mesh>

                            <Text position={[0, -0.9, 0]} fontSize={0.05} color="#333">ID: VCE-2026-IT</Text>
                        </group>

                        {/* BACK SIDE */}
                        <group position={[0, 0, -0.06]} rotation={[0, Math.PI, 0]}>
                            <Text position={[0, 0.65, 0]} fontSize={0.08} color="black" fontWeight="bold">GET IN TOUCH</Text>
                            <mesh position={[0, 0.55, 0]}>
                                <planeGeometry args={[1.2, 0.01]} />
                                <meshBasicMaterial color="#eee" />
                            </mesh>
                            
                            <Text position={[0, 0.3, 0]} fontSize={0.06} color="#666">FOR INQUIRIES</Text>
                            <Text position={[0, 0.15, 0]} fontSize={0.08} color="black">acumenit@vce.ac.in</Text>
                            
                            <Text position={[0, -0.2, 0]} fontSize={0.06} color="#666">STUDENT LEADS</Text>
                            <Text position={[0, -0.35, 0]} fontSize={0.08} color="black">+91 98765 43210</Text>

                            <Text position={[0, -0.7, 0]} fontSize={0.04} color="#999" maxWidth={1.2} textAlign="center">
                                DEPT OF INFORMATION TECHNOLOGY VASAVI COLLEGE OF ENGINEERING
                            </Text>
                        </group>
                    </mesh>
                </group>
            </RigidBody>
            <mesh ref={band}>
                <meshLineGeometry />
                <meshLineMaterial lineWidth={0.1} color="#000000" depthTest={false} transparent opacity={0.8} />
            </mesh>
        </>
    );
}