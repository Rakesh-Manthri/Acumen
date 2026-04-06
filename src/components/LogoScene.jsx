import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const LogoScene = () => {
  const mountRef = useRef(null);
  const isFormed = useRef(false);
  const scrollProgress = useRef(0);
  const introProgress = useRef(0);

  const state = useRef({
    count: 0,
    whirlpoolArray: null,
    centerArray: null,
    headerArray: null,
    basePoints: []
  });

  useEffect(() => {
    let renderer, scene, camera, points;

    const getVisibleSize = () => {
      const vFOV = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const width = height * camera.aspect;
      return { width, height };
    };

    const computeLayout = () => {
  if (!camera) return;
  const { width, height } = getVisibleSize();
  const isMobile = window.innerWidth < 768;

  // --- 1. SCALE CALCULATION ---
  const heroWidth = isMobile ? width * 0.92 : width * 0.8;
  const heroScale = heroWidth / 1600; 

  // Keeping the mobile scale we bumped last time
  const headerWidth = isMobile ? width * 0.55 : width * 0.14; 
  const headerScale = headerWidth / 1600;

  // --- 2. VERTICAL OFFSET CALCULATION ---
  const heroYOffset = height * 0.08; 

  /* THE PRECISION ALIGNMENT FIX:
    Desktop (isMobile = false): Increased from 0.82 to 0.86 to pull it UP.
    Mobile (isMobile = true): Decreased from 0.88 to 0.82 to push it DOWN.
  */
  const desktopHeaderPos = (height / 2) * 0.84; 
  const mobileHeaderPos = (height / 2) * 0.85;
  const headerYOffset = isMobile ? mobileHeaderPos : desktopHeaderPos;

  const { basePoints, count } = state.current;
  const newCenter = new Float32Array(count * 3);
  const newHeader = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Hero positions
    newCenter[i3] = basePoints[i].x * heroScale;
    newCenter[i3 + 1] = basePoints[i].y * heroScale + heroYOffset; 
    newCenter[i3 + 2] = 0;

    // Header positions (Destination)
    newHeader[i3] = basePoints[i].x * headerScale;
    newHeader[i3 + 1] = basePoints[i].y * headerScale + headerYOffset;
    newHeader[i3 + 2] = 0;
  }
  state.current.centerArray = newCenter;
  state.current.headerArray = newHeader;
};

    const init = async () => {
      await document.fonts.ready;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 30; 

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1600; canvas.height = 400;
      ctx.fillStyle = 'black';
      ctx.font = '900 180px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText("ACUMEN IT", 800, 200);

      const imageData = ctx.getImageData(0, 0, 1600, 400).data;
      const pts = [];
      const step = window.innerWidth < 768 ? 2 : 1; 
      for (let y = 0; y < 400; y += step) {
        for (let x = 0; x < 1600; x += step) {
          if (imageData[(y * 1600 + x) * 4 + 3] > 128) pts.push({ x: x - 800, y: 200 - y });
        }
      }

      state.current.basePoints = pts;
      const count = pts.length;
      state.current.count = count;

      const positions = new Float32Array(count * 3);
      const whirlpool = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const angle = i * 0.02;
        const radius = 0.1 * angle + Math.random() * 20;
        positions[i3] = whirlpool[i3] = Math.cos(angle) * radius;
        positions[i3 + 1] = whirlpool[i3 + 1] = (Math.random() - 0.5) * 80;
        positions[i3 + 2] = whirlpool[i3 + 2] = Math.sin(angle) * radius;
      }
      state.current.whirlpoolArray = whirlpool;

      computeLayout();

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0x000000, size: 0.12, transparent: true, opacity: 0.9 });
      points = new THREE.Points(geometry, material);
      scene.add(points);

      // Intro Morph: Whirlpool -> Hero
      gsap.to(introProgress, {
        current: 1,
        duration: 4,
        ease: "power4.inOut",
        onComplete: () => { isFormed.current = true; }
      });

      gsap.to(points.rotation, { y: Math.PI * 4, duration: 4, ease: "power4.inOut" });

      const animate = () => {
        requestAnimationFrame(animate);
        
        if (points) {
          const posAttr = points.geometry.attributes.position.array;
          const { whirlpoolArray, centerArray, headerArray } = state.current;
          
          const intro = introProgress.current;
          const scroll = scrollProgress.current;

          for (let i = 0; i < count * 3; i++) {
            // 1. Where should it be if it were only hero vs header?
            const targetPos = centerArray[i] + (headerArray[i] - centerArray[i]) * scroll;
            
            // 2. Interpolate from Whirlpool to that Target based on Intro progress
            posAttr[i] = whirlpoolArray[i] + (targetPos - whirlpoolArray[i]) * intro;
          }
          points.geometry.attributes.position.needsUpdate = true;
          
          // Shrink size slightly as it hits the header
          points.material.size = 0.12 - (scroll * 0.04);
        }

        renderer.render(scene, camera);
      };
      animate();
    };

    const handleScroll = () => {
      // Tie scroll directly to a 0-1 value
      scrollProgress.current = Math.min(window.scrollY / 450, 1);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      computeLayout(); 
    };

    init();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer?.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1000, pointerEvents: 'none' }} />
  );
};

export default LogoScene;