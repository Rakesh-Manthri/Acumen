import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const LogoScene = () => {
  const mountRef = useRef(null);
  const isRotating = useRef(true); 

  useEffect(() => {
    // Basic Scene Setup - ENSURE TRANSPARENT BG
    const scene = new THREE.Scene();
    scene.background = null; // Important: Make Three.js background transparent

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 550, 0.1, 1000);
    camera.position.z = 25; // Adjusted depth for better visual fit

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable Alpha for transparency
    renderer.setSize(window.innerWidth, 550); // Set height to match CSS container
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 1. Text Sampling Function (High Density)
    const getTextPoints = (text) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      // Larger canvas for better resolution sampling
      canvas.width = 1200; 
      canvas.height = 300;
      
      ctx.fillStyle = 'black';
      // Adjust font size/weight here if needed
      ctx.font = 'bold 120px Montserrat, Arial, sans-serif'; 
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 600, 150);

      const imageData = ctx.getImageData(0, 0, 1200, 300).data;
      const points = [];
      // Step 2 is high density (~30k particles), Step 1 is ultra-high (~100k)
      for (let y = 0; y < 300; y += 2) { 
        for (let x = 0; x < 1200; x += 2) {
          const alpha = imageData[(y * 1200 + x) * 4 + 3];
          if (alpha > 128) {
            points.push({
              x: (x - 600) * 0.06,
              y: (150 - y) * 0.06,
              z: 0
            });
          }
        }
      }
      return points;
    };

    const textCoords = getTextPoints("ACUMEN IT");
    const count = textCoords.length;

    // 2. Setting up Geometry with Centering Offset
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const targetPositions = new Float32Array(count * 3);

    // A separate geometry to calculate the true center of the particle cloud
    const targetGeometryForCentering = new THREE.BufferGeometry();
    const targetPositionsForCalc = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Define whirlpool starting positions
      const angle = i * 0.02;
      const radius = 0.1 * angle + Math.random() * 8;
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * 40;
      positions[i3 + 2] = Math.sin(angle) * radius;

      // Define target (text) positions
      targetPositions[i3] = textCoords[i].x;
      targetPositions[i3 + 1] = textCoords[i].y;
      targetPositions[i3 + 2] = textCoords[i].z;

      // Also set the calculation geometry
      targetPositionsForCalc[i3] = textCoords[i].x;
      targetPositionsForCalc[i3 + 1] = textCoords[i].y;
      targetPositionsForCalc[i3 + 2] = textCoords[i].z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    targetGeometryForCentering.setAttribute('position', new THREE.BufferAttribute(targetPositionsForCalc, 3));
    
    // THE FIX: Calculate true center of the particle system
    targetGeometryForCentering.computeBoundingBox();
    const centerOffset = new THREE.Vector3();
    targetGeometryForCentering.boundingBox.getCenter(centerOffset);
    // Move camera to look at the offset, or shift the points. Moving points is easier here.
    // We will apply this offset inside the GSAP tween.

    const material = new THREE.PointsMaterial({ 
      color: 0x000000, 
      size: 0.06, // Smaller size for more particles looks premium
      transparent: true,
      opacity: 0.8
    });
    
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // 3. Animation and Morph Tween
    const tl = gsap.timeline();

    // The core tween with centering adjustment applied to targetPositions
    const currentPositions = points.geometry.attributes.position.array;
    const finalTarget = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        finalTarget[i3] = targetPositions[i3] - centerOffset.x;
        finalTarget[i3 + 1] = targetPositions[i3+1] - centerOffset.y;
        finalTarget[i3 + 2] = targetPositions[i3+2];
    }

    tl.to(currentPositions, {
      endArray: finalTarget, // Use the adjusted target array
      duration: 5,
      delay: 1,
      ease: "power4.inOut",
      onUpdate: () => {
        points.geometry.attributes.position.needsUpdate = true;
      },
      onComplete: () => {
        // SMOOTH STOP: Fade out the rotation flag
        gsap.to(isRotating, { current: false, duration: 1 });
        // Ensure final rotation snaps perfectly to face front
        gsap.to(points.rotation, { y: 0, duration: 1.5, ease: "power2.out" });
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      if (isRotating.current) {
        points.rotation.y += 0.008; // Whirlpool rotation speed
      }
      renderer.render(scene, camera);
    };
    animate();

    // 4. Handle Resize and Cleanup
    const handleResize = () => {
      camera.aspect = window.innerWidth / 550;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 550);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      targetGeometryForCentering.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '550px', // Match the height in Home.jsx exactly
        overflow: 'hidden',
        // Minimal CSS required; Three.js fills this container
      }} 
    />
  );
};

export default LogoScene;