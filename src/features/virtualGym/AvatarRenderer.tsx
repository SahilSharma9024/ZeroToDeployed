import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AvatarCustomization } from '../../types/virtualGym';
import { RotateCcw } from 'lucide-react';

interface AvatarRendererProps {
  customization: AvatarCustomization;
  heightCm: number;
  weightKg: number;
  level: number;
  isAnimated?: boolean;
}

// shortcut: procedural Three.js mesh primitives, upgrade to rigged GLTF skeletal animation when custom model files are added
export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  customization,
  heightCm,
  weightKg,
  level,
  isAnimated = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const resetRotationRef = useRef<(() => void) | null>(null);
  const [hasWebGlError] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const testCanvas = document.createElement('canvas');
      return !(
        window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl'))
      );
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (hasWebGlError) return;
    const container = mountRef.current;
    if (!container) return;

    // Palette theme definitions
    const outfitThemes: Record<
      string,
      { primary: number; secondary: number; accent: number; belt: number }
    > = {
      cyber: { primary: 0x06b6d4, secondary: 0x0f172a, accent: 0xf43f5e, belt: 0x0284c7 },
      stealth: { primary: 0x334155, secondary: 0x0f172a, accent: 0xef4444, belt: 0x475569 },
      crimson: { primary: 0xe11d48, secondary: 0x881337, accent: 0xfbbf24, belt: 0x9f1239 },
      gold: { primary: 0xf59e0b, secondary: 0x1e1b4b, accent: 0xfcd34d, belt: 0xb45309 },
      neon: { primary: 0x10b981, secondary: 0x064e3b, accent: 0xa7f3d0, belt: 0x047857 },
    };

    const theme = outfitThemes[customization.gearOutfit] || outfitThemes.cyber;

    // Calculate dynamic scaling from biometrics
    const heightM = Math.max(1.2, heightCm / 100);
    const bmi = weightKg / (heightM * heightM);
    const bmiFactor = Math.min(Math.max((bmi - 18.5) / 12, -0.35), 0.75);

    const isHeroic = customization.bodyFrame === 'heroic';
    const isFeminine = customization.bodyFrame === 'feminine';
    const frameWidthMult = isHeroic ? 1.15 : isFeminine ? 0.92 : 1.0;

    const shoulderWidth = (0.7 + bmiFactor * 0.28) * frameWidthMult;
    const chestScale = (1.0 + bmiFactor * 0.3) * (isHeroic ? 1.12 : 1.0);
    const waistScale = (0.8 + bmiFactor * 0.2) * (isFeminine ? 0.8 : 1.0);
    const limbThickness = (0.095 + bmiFactor * 0.035) * (isHeroic ? 1.14 : 1.0);

    // Three.js Scene Setup
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 360;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.15, 3.8);
    camera.lookAt(0, 1.05, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainLight.position.set(3, 5, 4);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(theme.accent, 1.6);
    rimLight.position.set(-3, 2.5, -2.5);
    scene.add(rimLight);

    const stageLight = new THREE.PointLight(theme.primary, 1.8, 6);
    stageLight.position.set(0, 0.3, 0.8);
    scene.add(stageLight);

    // Collect disposable resources for cleanup
    const disposables: { dispose: () => void }[] = [];
    const register = <T extends { dispose: () => void }>(res: T): T => {
      disposables.push(res);
      return res;
    };

    // Materials
    const matSkin = register(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(customization.skinTone || '#E2A781'),
        roughness: 0.65,
        metalness: 0.08,
      })
    );
    const matSuitPrimary = register(
      new THREE.MeshStandardMaterial({
        color: theme.primary,
        roughness: 0.35,
        metalness: 0.25,
      })
    );
    const matSuitSecondary = register(
      new THREE.MeshStandardMaterial({
        color: theme.secondary,
        roughness: 0.55,
        metalness: 0.15,
      })
    );
    const matAccent = register(
      new THREE.MeshStandardMaterial({
        color: theme.accent,
        roughness: 0.25,
        metalness: 0.35,
        emissive: theme.accent,
        emissiveIntensity: 0.3,
      })
    );
    const matHair = register(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(customization.hairColor || '#0F172A'),
        roughness: 0.75,
        metalness: 0.1,
      })
    );
    const matBelt = register(
      new THREE.MeshStandardMaterial({
        color: theme.belt,
        roughness: 0.45,
        metalness: 0.3,
      })
    );
    const matBuckle = register(
      new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        roughness: 0.2,
        metalness: 0.9,
      })
    );
    const matSteel = register(
      new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.2,
        metalness: 0.88,
      })
    );
    const matPlate = register(
      new THREE.MeshStandardMaterial({
        color: 0xdc2626,
        roughness: 0.45,
        metalness: 0.2,
      })
    );
    const matPlatform = register(
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.8,
        metalness: 0.3,
      })
    );
    const matPedestalRing = register(
      new THREE.MeshBasicMaterial({
        color: theme.primary,
        transparent: true,
        opacity: 0.7,
      })
    );

    // Groups
    const avatarGroup = new THREE.Group();
    const pedestalGroup = new THREE.Group();
    const auraGroup = new THREE.Group();

    // Stage Pedestal
    const pedestalGeo = register(new THREE.CylinderGeometry(1.0, 1.12, 0.08, 36));
    const pedestalMesh = new THREE.Mesh(pedestalGeo, matPlatform);
    pedestalMesh.position.y = -0.04;
    pedestalGroup.add(pedestalMesh);

    const ringGeo = register(new THREE.RingGeometry(1.0, 1.08, 36));
    const ringMesh = new THREE.Mesh(ringGeo, matPedestalRing);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.01;
    pedestalGroup.add(ringMesh);

    // Shadow Floor Disc
    const shadowGeo = register(new THREE.CircleGeometry(0.65 + bmiFactor * 0.15, 32));
    const matShadow = register(
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.35,
      })
    );
    const shadowMesh = new THREE.Mesh(shadowGeo, matShadow);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.005;
    pedestalGroup.add(shadowMesh);

    scene.add(pedestalGroup);

    // Glowing Aura Particle Vortex
    let particlePositions: Float32Array | null = null;
    let particleGeo: THREE.BufferGeometry | null = null;
    const particleCount = 60;

    if (customization.hasGlowingAura || level >= 3) {
      particlePositions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 0.5 + Math.random() * 0.45;
        particlePositions[i * 3] = Math.cos(angle) * radius;
        particlePositions[i * 3 + 1] = Math.random() * 2.2;
        particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
      }
      particleGeo = register(new THREE.BufferGeometry());
      particleGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(particlePositions, 3)
      );
      const particleMat = register(
        new THREE.PointsMaterial({
          color: theme.accent,
          size: 0.045,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        })
      );
      const auraPoints = new THREE.Points(particleGeo, particleMat);
      auraGroup.add(auraPoints);
    }
    scene.add(auraGroup);

    // 1. Pelvis / Hips
    const pelvisGeo = register(
      new THREE.CylinderGeometry(0.18 * waistScale, 0.16 * waistScale, 0.2, 16)
    );
    const pelvis = new THREE.Mesh(pelvisGeo, matSuitSecondary);
    pelvis.position.y = 0.92;
    avatarGroup.add(pelvis);

    // 2. Abdomen / Mid-Torso
    const abdomenGeo = register(
      new THREE.CylinderGeometry(0.22 * chestScale, 0.17 * waistScale, 0.24, 16)
    );
    const abdomen = new THREE.Mesh(abdomenGeo, matSuitPrimary);
    abdomen.position.y = 1.12;
    avatarGroup.add(abdomen);

    // 3. Chest / Pectorals
    const chestGeo = register(
      new THREE.BoxGeometry(0.42 * chestScale, 0.26, 0.23 * chestScale)
    );
    const chest = new THREE.Mesh(chestGeo, matSuitPrimary);
    chest.position.y = 1.34;
    avatarGroup.add(chest);

    // Archetype Core Emblem
    const coreGeo = register(new THREE.BoxGeometry(0.09, 0.09, 0.02));
    const core = new THREE.Mesh(coreGeo, matAccent);
    core.position.set(0, 1.35, 0.12 * chestScale);
    avatarGroup.add(core);

    // 4. Neck
    const neckGeo = register(
      new THREE.CylinderGeometry(
        0.085 * (1 + bmiFactor * 0.2),
        0.1 * (1 + bmiFactor * 0.2),
        0.14,
        16
      )
    );
    const neck = new THREE.Mesh(neckGeo, matSkin);
    neck.position.y = 1.52;
    avatarGroup.add(neck);

    // 5. Head & Face
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.72, 0);

    const headGeo = register(new THREE.SphereGeometry(0.16, 24, 20));
    headGeo.scale(0.92, 1.08, 1.0);
    const headMesh = new THREE.Mesh(headGeo, matSkin);
    headGroup.add(headMesh);

    // Visor / Eyes
    const visorGeo = register(
      new THREE.CylinderGeometry(0.165, 0.165, 0.045, 16, 1, false, Math.PI * 0.72, Math.PI * 0.56)
    );
    const visor = new THREE.Mesh(visorGeo, matAccent);
    visor.rotation.y = Math.PI * 0.44;
    visor.position.set(0, 0.015, 0.01);
    headGroup.add(visor);

    // Hair Style
    if (customization.hairStyle === 'spiky') {
      const spikes = [
        { pos: [0, 0.15, 0], rot: [0, 0, 0], s: 1 },
        { pos: [0.06, 0.14, 0.03], rot: [0.1, 0, -0.2], s: 0.9 },
        { pos: [-0.06, 0.14, 0.03], rot: [0.1, 0, 0.2], s: 0.9 },
        { pos: [0.04, 0.12, -0.05], rot: [-0.2, 0, -0.15], s: 0.8 },
        { pos: [-0.04, 0.12, -0.05], rot: [-0.2, 0, 0.15], s: 0.8 },
        { pos: [0, 0.14, 0.06], rot: [0.25, 0, 0], s: 0.85 },
      ];
      spikes.forEach((sp) => {
        const spikeGeo = register(new THREE.ConeGeometry(0.04 * sp.s, 0.12 * sp.s, 5));
        const spike = new THREE.Mesh(spikeGeo, matHair);
        spike.position.set(sp.pos[0], sp.pos[1], sp.pos[2]);
        spike.rotation.set(sp.rot[0], sp.rot[1], sp.rot[2]);
        headGroup.add(spike);
      });
    } else if (customization.hairStyle === 'bun') {
      const capGeo = register(
        new THREE.SphereGeometry(0.165, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5)
      );
      const cap = new THREE.Mesh(capGeo, matHair);
      headGroup.add(cap);

      const bunGeo = register(new THREE.SphereGeometry(0.08, 16, 16));
      const bun = new THREE.Mesh(bunGeo, matHair);
      bun.position.set(0, 0.18, -0.05);
      headGroup.add(bun);
    } else if (customization.hairStyle === 'long') {
      const capGeo = register(
        new THREE.SphereGeometry(0.165, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5)
      );
      const cap = new THREE.Mesh(capGeo, matHair);
      headGroup.add(cap);

      const flowGeo = register(new THREE.BoxGeometry(0.24, 0.35, 0.06));
      const flow = new THREE.Mesh(flowGeo, matHair);
      flow.position.set(0, -0.12, -0.12);
      headGroup.add(flow);
    } else if (customization.hairStyle === 'headband') {
      const capGeo = register(
        new THREE.SphereGeometry(0.165, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.5)
      );
      const cap = new THREE.Mesh(capGeo, matHair);
      headGroup.add(cap);

      const bandGeo = register(new THREE.TorusGeometry(0.165, 0.02, 8, 24));
      const band = new THREE.Mesh(bandGeo, matAccent);
      band.rotation.x = Math.PI / 2.3;
      band.position.set(0, 0.03, 0.01);
      headGroup.add(band);
    } else {
      // Buzz cut
      const buzzGeo = register(
        new THREE.SphereGeometry(0.166, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.52)
      );
      const buzz = new THREE.Mesh(buzzGeo, matHair);
      headGroup.add(buzz);
    }
    avatarGroup.add(headGroup);

    // 6. Legs & Athletic Shoes
    const legSpacing = 0.16 * frameWidthMult;
    const thighLength = 0.36;
    const shinLength = 0.36;

    [-legSpacing, legSpacing].forEach((xPos) => {
      const thighGeo = register(
        new THREE.CapsuleGeometry(limbThickness * 1.15, thighLength, 8, 16)
      );
      const thigh = new THREE.Mesh(thighGeo, matSuitSecondary);
      thigh.position.set(xPos, 0.66, 0);
      avatarGroup.add(thigh);

      const shinGeo = register(
        new THREE.CapsuleGeometry(limbThickness * 1.0, shinLength, 8, 16)
      );
      const shin = new THREE.Mesh(shinGeo, matSuitSecondary);
      shin.position.set(xPos, 0.28, 0);
      avatarGroup.add(shin);

      const shoeGeo = register(
        new THREE.BoxGeometry(limbThickness * 2.1, 0.1, 0.24)
      );
      const shoe = new THREE.Mesh(shoeGeo, matSuitPrimary);
      shoe.position.set(xPos, 0.05, 0.03);
      avatarGroup.add(shoe);

      const soleGeo = register(
        new THREE.BoxGeometry(limbThickness * 2.15, 0.03, 0.25)
      );
      const sole = new THREE.Mesh(soleGeo, matAccent);
      sole.position.set(xPos, 0.015, 0.03);
      avatarGroup.add(sole);
    });

    // 7. Power Lifting Belt (if enabled)
    if (customization.hasLiftingBelt) {
      const beltGeo = register(
        new THREE.CylinderGeometry(0.205 * waistScale, 0.205 * waistScale, 0.12, 20)
      );
      const belt = new THREE.Mesh(beltGeo, matBelt);
      belt.position.y = 1.02;
      avatarGroup.add(belt);

      const buckleGeo = register(new THREE.BoxGeometry(0.08, 0.09, 0.02));
      const buckle = new THREE.Mesh(buckleGeo, matBuckle);
      buckle.position.set(0, 1.02, 0.205 * waistScale + 0.01);
      avatarGroup.add(buckle);
    }

    // 8. Arms & Dynamic Posing
    const armSpan = shoulderWidth * 0.52;
    const upperArmLength = 0.28;
    const forearmLength = 0.26;

    const deltoidGeo = register(
      new THREE.SphereGeometry(limbThickness * 1.3, 14, 14)
    );
    const upperArmGeo = register(
      new THREE.CapsuleGeometry(limbThickness * 1.05, upperArmLength, 8, 14)
    );
    const forearmGeo = register(
      new THREE.CapsuleGeometry(limbThickness * 0.95, forearmLength, 8, 14)
    );
    const fistGeo = register(
      new THREE.SphereGeometry(limbThickness * 1.1, 12, 12)
    );

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-armSpan, 1.42, 0);

    const leftDeltoid = new THREE.Mesh(deltoidGeo, matSkin);
    leftArmGroup.add(leftDeltoid);

    const leftUpperArm = new THREE.Mesh(upperArmGeo, matSkin);
    leftUpperArm.position.y = -upperArmLength * 0.55;
    leftArmGroup.add(leftUpperArm);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.y = -upperArmLength * 1.1;

    const leftForearm = new THREE.Mesh(forearmGeo, matSkin);
    leftForearm.position.y = -forearmLength * 0.55;
    leftForearmGroup.add(leftForearm);

    const leftFist = new THREE.Mesh(fistGeo, matSkin);
    leftFist.position.y = -forearmLength * 1.1;
    leftForearmGroup.add(leftFist);

    if (customization.hasWristWraps) {
      const wrapGeo = register(
        new THREE.CylinderGeometry(limbThickness * 1.06, limbThickness * 1.06, 0.06, 14)
      );
      const leftWrap = new THREE.Mesh(wrapGeo, matAccent);
      leftWrap.position.y = -forearmLength * 0.9;
      leftForearmGroup.add(leftWrap);
    }
    leftArmGroup.add(leftForearmGroup);
    avatarGroup.add(leftArmGroup);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(armSpan, 1.42, 0);

    const rightDeltoid = new THREE.Mesh(deltoidGeo, matSkin);
    rightArmGroup.add(rightDeltoid);

    const rightUpperArm = new THREE.Mesh(upperArmGeo, matSkin);
    rightUpperArm.position.y = -upperArmLength * 0.55;
    rightArmGroup.add(rightUpperArm);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.y = -upperArmLength * 1.1;

    const rightForearm = new THREE.Mesh(forearmGeo, matSkin);
    rightForearm.position.y = -forearmLength * 0.55;
    rightForearmGroup.add(rightForearm);

    const rightFist = new THREE.Mesh(fistGeo, matSkin);
    rightFist.position.y = -forearmLength * 1.1;
    rightForearmGroup.add(rightFist);

    if (customization.hasWristWraps) {
      const wrapGeo = register(
        new THREE.CylinderGeometry(limbThickness * 1.06, limbThickness * 1.06, 0.06, 14)
      );
      const rightWrap = new THREE.Mesh(wrapGeo, matAccent);
      rightWrap.position.y = -forearmLength * 0.9;
      rightForearmGroup.add(rightWrap);
    }
    rightArmGroup.add(rightForearmGroup);
    avatarGroup.add(rightArmGroup);

    // Apply Poses & Barbell
    if (customization.pose === 'flex') {
      leftArmGroup.rotation.set(0.1, 0.1, 1.45);
      leftForearmGroup.rotation.set(0, 0, 1.85);

      rightArmGroup.rotation.set(0.1, -0.1, -1.45);
      rightForearmGroup.rotation.set(0, 0, -1.85);
    } else if (customization.pose === 'lift') {
      leftArmGroup.rotation.set(0, 0, 2.75);
      leftForearmGroup.rotation.set(0, 0, 0.25);

      rightArmGroup.rotation.set(0, 0, -2.75);
      rightForearmGroup.rotation.set(0, 0, -0.25);

      const barbellGroup = new THREE.Group();
      barbellGroup.position.set(0, 2.18, 0);

      const barGeo = register(new THREE.CylinderGeometry(0.018, 0.018, 1.6, 16));
      const bar = new THREE.Mesh(barGeo, matSteel);
      bar.rotation.z = Math.PI / 2;
      barbellGroup.add(bar);

      [-0.68, 0.68].forEach((xPos) => {
        const plate1Geo = register(new THREE.CylinderGeometry(0.18, 0.18, 0.038, 24));
        const plate1 = new THREE.Mesh(plate1Geo, matPlate);
        plate1.rotation.z = Math.PI / 2;
        plate1.position.x = xPos;
        barbellGroup.add(plate1);

        const plate2Geo = register(new THREE.CylinderGeometry(0.15, 0.15, 0.032, 24));
        const plate2 = new THREE.Mesh(plate2Geo, matPlate);
        plate2.rotation.z = Math.PI / 2;
        plate2.position.x = xPos + (xPos > 0 ? 0.045 : -0.045);
        barbellGroup.add(plate2);
      });
      avatarGroup.add(barbellGroup);
    } else {
      leftArmGroup.rotation.set(0.08, 0, -0.15);
      leftForearmGroup.rotation.set(0.05, 0, 0.05);

      rightArmGroup.rotation.set(0.08, 0, 0.15);
      rightForearmGroup.rotation.set(0.05, 0, -0.05);
    }

    scene.add(avatarGroup);

    // Interactive Drag Controls
    let isDragging = false;
    let previousPointerX = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;

    resetRotationRef.current = () => {
      targetRotationY = 0;
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerX;
      previousPointerX = e.clientX;
      targetRotationY += deltaX * 0.015;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Animation Render Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging && isAnimated) {
        targetRotationY += 0.0035;
      }
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      avatarGroup.rotation.y = currentRotationY;
      pedestalGroup.rotation.y = currentRotationY * 0.35;

      if (isAnimated) {
        const breath = Math.sin(elapsedTime * 2.4) * 0.012;
        avatarGroup.position.y = breath;
        chest.scale.set(1 + breath * 0.4, 1 + breath * 0.4, 1 + breath * 0.4);

        if (particlePositions && particleGeo) {
          auraGroup.rotation.y = elapsedTime * 0.5;
          const pos = particleGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            pos[i * 3 + 1] += 0.008;
            if (pos[i * 3 + 1] > 2.2) {
              pos[i * 3 + 1] = 0.1;
            }
          }
          particleGeo.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, [customization, heightCm, weightKg, level, isAnimated, hasWebGlError]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-[280px] sm:max-w-[340px] mx-auto">
      {/* 3D WebGL Canvas Stage */}
      <div
        ref={mountRef}
        className="w-full h-[320px] sm:h-[370px] relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing bg-gradient-to-b from-slate-900/30 via-indigo-950/20 to-slate-950/60 border border-slate-800/80 shadow-inner flex items-center justify-center"
      >
        {/* Fallback if WebGL unavailable */}
        {hasWebGlError && (
          <div className="p-4 text-center text-xs text-slate-400">
            WebGL is not supported in this environment.
          </div>
        )}

        {/* 3D Interactive Controls & Overlay Badge */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/70 border border-slate-700/60 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-slate-300 pointer-events-none flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D WebGL</span>
        </div>

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <button
            onClick={() => resetRotationRef.current?.()}
            title="Reset Front View"
            className="p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-colors backdrop-blur-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute bottom-2.5 px-3 py-1 rounded-full bg-slate-950/60 border border-slate-800/60 backdrop-blur-sm text-[10px] text-slate-400 pointer-events-none">
          Drag horizontally to rotate 360°
        </div>
      </div>

      {/* Floating Level & Archetype Banner */}
      <div className="mt-3 flex items-center gap-2">
        <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs rounded-full shadow-md tracking-wider uppercase flex items-center gap-1">
          <span>⚡ LVL {level}</span>
        </span>
        <span className="px-2.5 py-1 bg-slate-900/80 dark:bg-white/10 text-slate-200 dark:text-slate-100 font-extrabold text-xs rounded-full border border-slate-700/60 backdrop-blur-sm tracking-wide capitalize">
          {customization.archetype} {customization.bodyFrame}
        </span>
      </div>
    </div>
  );
};
