import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobalParticles = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Snowfall Generation
    const count = 35000; // Count adjusted for larger particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count); // Individual fall speeds

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles across a wide 3D box
      positions[i3] = (Math.random() - 0.5) * 150;     // X
      positions[i3 + 1] = (Math.random() - 0.5) * 150; // Y
      positions[i3 + 2] = (Math.random() - 0.5) * 100; // Z (depth)
      
      // Randomize speed for each particle
      velocities[i] = 0.2 + Math.random() * 0.6; 
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // THE FIX: Increased the material size
    const material = new THREE.PointsMaterial({ 
      color: 0x000000, 
      size: 0.2,          // INCREASED SIZE FROM 0.04
      transparent: true, 
      opacity: 0.35,      // Adjusted for better softer snow feel
      blending: THREE.MultiplyBlending 
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 3. Snowfall Physics Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      const posArr = points.geometry.attributes.position.array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Vertical Fall
        posArr[i3 + 1] -= velocities[i];

        // Horizontal Wind Sway
        posArr[i3] += Math.sin(Date.now() * 0.001 + i) * 0.03;

        // Respawn Logic
        if (posArr[i3 + 1] < -80) { // Slower reset threshold for larger points
          posArr[i3 + 1] = 80;
          posArr[i3] = (Math.random() - 0.5) * 150;
        }
      }
      
      points.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 4. Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 5. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        pointerEvents: 'none',
        background: '#F1EFE9' 
      }} 
    />
  );
};

export default GlobalParticles;