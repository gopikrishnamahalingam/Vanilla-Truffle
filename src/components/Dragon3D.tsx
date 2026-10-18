import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MoodType } from '../types';

interface Dragon3DProps {
  mood: MoodType;
  isOuch: boolean;
  onClick: () => void;
}

export const Dragon3D: React.FC<Dragon3DProps> = ({ mood, isOuch, onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isOuchRef = useRef(isOuch);
  isOuchRef.current = isOuch;

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 560;

    // 1. Scene & Camera Setup (Camera moved back and up so Chef Hat has full headroom)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffaed, 2.4);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf472b6, 2.0);
    rimLight.position.set(-4, -2, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xc084fc, 1.4);
    fillLight.position.set(-3, 4, 4);
    scene.add(fillLight);

    // 3. Materials
    const dragonSkinMat = new THREE.MeshStandardMaterial({
      color: 0xb588f7,
      roughness: 0.38,
      metalness: 0.04,
    });

    const dragonBellyMat = new THREE.MeshStandardMaterial({
      color: 0xfce7f3,
      roughness: 0.42,
      metalness: 0.02,
    });

    const eyeWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.08,
    });

    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.12,
    });

    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0x090d16,
    });

    const highlightMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    const eyelidMat = new THREE.MeshStandardMaterial({
      color: 0xa871f3,
      roughness: 0.4,
    });

    const hornMat = new THREE.MeshStandardMaterial({
      color: 0xfde047,
      roughness: 0.3,
      metalness: 0.15,
    });

    const clawMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.05,
    });

    const hairTuftMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.38,
    });

    const wingMat = new THREE.MeshStandardMaterial({
      color: 0xf9a8d4,
      roughness: 0.38,
      side: THREE.DoubleSide,
    });

    const wingBoneMat = new THREE.MeshStandardMaterial({
      color: 0xb588f7,
      roughness: 0.35,
    });

    const chefHatMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5,
      metalness: 0.0,
    });

    const woodSpoonMat = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.5,
    });

    const woodScoopMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.45,
    });

    const blushMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.45,
    });

    const mouthInsideMat = new THREE.MeshBasicMaterial({
      color: 0x881337,
    });

    const tongueMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.4,
    });

    // 4. Character Hierarchy (Shifted down to Y = -1.05 for plenty of hat headroom)
    const dragonRoot = new THREE.Group();
    dragonRoot.position.set(0, -1.05, 0);
    scene.add(dragonRoot);

    // Body (Round, chubby belly)
    const bodyGeo = new THREE.SphereGeometry(0.92, 32, 28);
    const bodyMesh = new THREE.Mesh(bodyGeo, dragonSkinMat);
    bodyMesh.scale.set(1.05, 1.15, 0.98);
    bodyMesh.position.set(0, -0.3, 0);
    dragonRoot.add(bodyMesh);

    // Belly patch
    const bellyGeo = new THREE.SphereGeometry(0.78, 24, 20);
    const bellyMesh = new THREE.Mesh(bellyGeo, dragonBellyMat);
    bellyMesh.scale.set(0.9, 1.05, 0.48);
    bellyMesh.position.set(0, -0.32, 0.68);
    dragonRoot.add(bellyMesh);

    // CLEAR, VISIBLE DRAGON NECK
    const neckMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.58, 0.65, 24), dragonSkinMat);
    neckMesh.position.set(0, 0.42, 0.06);
    neckMesh.rotation.set(-0.06, 0, 0);
    dragonRoot.add(neckMesh);

    // LEGS AND SEATED FEET (Visible chubby dragon feet with claws)
    const createLegAndFoot = (isLeft: boolean) => {
      const legGroup = new THREE.Group();
      const xPos = isLeft ? -0.58 : 0.58;
      legGroup.position.set(xPos, -0.9, 0.28);

      // Thigh
      const thighMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.32, 0.48, 16), dragonSkinMat);
      thighMesh.rotation.set(0.2, 0, isLeft ? 0.35 : -0.35);
      legGroup.add(thighMesh);

      // Foot (Paws with 3 distinct white claws)
      const footGroup = new THREE.Group();
      footGroup.position.set(isLeft ? -0.08 : 0.08, -0.22, 0.22);

      const footMesh = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16), dragonSkinMat);
      footMesh.scale.set(1.08, 0.62, 1.4);
      footGroup.add(footMesh);

      // 3 Claws on foot
      for (let c = -1; c <= 1; c++) {
        const toeClaw = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.15, 12), clawMat);
        toeClaw.position.set(c * 0.11, -0.06, 0.38);
        toeClaw.rotation.set(Math.PI * 0.45, 0, c * 0.2);
        footGroup.add(toeClaw);
      }

      legGroup.add(footGroup);
      return legGroup;
    };

    const leftLeg = createLegAndFoot(true);
    const rightLeg = createLegAndFoot(false);
    dragonRoot.add(leftLeg);
    dragonRoot.add(rightLeg);

    // HEAD GROUP (Sits clearly on the neck)
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.88, 0.12);
    dragonRoot.add(headGroup);

    // Head base sphere
    const headGeo = new THREE.SphereGeometry(0.96, 32, 28);
    const headMesh = new THREE.Mesh(headGeo, dragonSkinMat);
    headMesh.scale.set(1.18, 1.08, 1.1);
    headGroup.add(headMesh);

    // Snout / Cute Muzzle
    const snoutGeo = new THREE.SphereGeometry(0.54, 24, 20);
    const snoutMesh = new THREE.Mesh(snoutGeo, dragonSkinMat);
    snoutMesh.scale.set(1.14, 0.68, 0.9);
    snoutMesh.position.set(0, -0.22, 0.84);
    headGroup.add(snoutMesh);

    // OPENING MOUTH (Reacts when screaming "Ouchy!" or happy/surprised)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.38, 1.15);

    const mouthCavity = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 14), mouthInsideMat);
    mouthCavity.scale.set(1.1, 0.8, 0.6);
    mouthGroup.add(mouthCavity);

    const tongueMesh = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 12), tongueMat);
    tongueMesh.position.set(0, -0.06, 0.08);
    tongueMesh.scale.set(1.0, 0.4, 1.2);
    mouthGroup.add(tongueMesh);

    headGroup.add(mouthGroup);

    // Cheeks / Blush
    const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), blushMat);
    cheekL.position.set(-0.68, -0.16, 0.78);
    cheekL.scale.set(1, 0.6, 0.3);
    headGroup.add(cheekL);

    const cheekR = cheekL.clone();
    cheekR.position.set(0.68, -0.16, 0.78);
    headGroup.add(cheekR);

    // EYES with Mood & Sleep Eyelids
    const createEye = (isLeft: boolean) => {
      const eyeGroup = new THREE.Group();
      const xPos = isLeft ? -0.45 : 0.45;
      eyeGroup.position.set(xPos, 0.1, 0.8);

      const whiteMesh = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 20), eyeWhiteMat);
      whiteMesh.scale.set(0.98, 1.12, 0.85);
      eyeGroup.add(whiteMesh);

      const lookGroup = new THREE.Group();
      lookGroup.position.set(0, 0, 0.22);

      const iris = new THREE.Mesh(new THREE.CircleGeometry(0.23, 24), irisMat);
      iris.position.set(0, 0, 0.08);
      lookGroup.add(iris);

      const pupil = new THREE.Mesh(new THREE.CircleGeometry(0.14, 20), pupilMat);
      pupil.position.set(0, 0, 0.082);
      lookGroup.add(pupil);

      const sparkle1 = new THREE.Mesh(new THREE.CircleGeometry(0.065, 16), highlightMat);
      sparkle1.position.set(0.07, 0.08, 0.085);
      lookGroup.add(sparkle1);

      const sparkle2 = new THREE.Mesh(new THREE.CircleGeometry(0.03, 12), highlightMat);
      sparkle2.position.set(-0.06, -0.07, 0.085);
      lookGroup.add(sparkle2);

      eyeGroup.add(lookGroup);

      // Sleeping Eyelid
      const eyelid = new THREE.Mesh(
        new THREE.SphereGeometry(0.37, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
        eyelidMat
      );
      eyelid.rotation.set(-Math.PI * 0.5, 0, 0);
      eyelid.position.set(0, 0.02, 0);
      eyelid.visible = false;
      eyeGroup.add(eyelid);

      return { eyeGroup, lookGroup, eyelid };
    };

    const leftEye = createEye(true);
    const rightEye = createEye(false);
    headGroup.add(leftEye.eyeGroup);
    headGroup.add(rightEye.eyeGroup);

    // Horns (Golden Cones)
    const hornGeo = new THREE.ConeGeometry(0.16, 0.58, 16);
    hornGeo.translate(0, 0.28, 0);

    const hornL = new THREE.Mesh(hornGeo, hornMat);
    hornL.position.set(-0.75, 0.72, 0.0);
    hornL.rotation.set(-0.2, 0, 0.55);
    headGroup.add(hornL);

    const hornR = new THREE.Mesh(hornGeo, hornMat);
    hornR.position.set(0.75, 0.72, 0.0);
    hornR.rotation.set(-0.2, 0, -0.55);
    headGroup.add(hornR);

    // Hair Tuft
    const tuftGroup = new THREE.Group();
    tuftGroup.position.set(0, 1.05, 0.4);

    for (let i = 0; i < 3; i++) {
      const tuftGeo = new THREE.ConeGeometry(0.14 - i * 0.02, 0.46, 12);
      const tuft = new THREE.Mesh(tuftGeo, hairTuftMat);
      tuft.position.set((i - 1) * 0.14, 0, 0);
      tuft.rotation.set(-0.35, 0, (i - 1) * 0.25);
      tuftGroup.add(tuft);
    }
    headGroup.add(tuftGroup);

    // FULLY VISIBLE & PROMINENT CHEF HAT
    const hatGroup = new THREE.Group();
    hatGroup.position.set(0.06, 1.15, -0.02);
    hatGroup.rotation.set(-0.06, 0.04, -0.1);

    // Band Base
    const bandMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.58, 0.42, 24), chefHatMat);
    bandMesh.position.set(0, 0.15, 0);
    hatGroup.add(bandMesh);

    // Large Puffy Cloud Crown
    const crownMesh = new THREE.Mesh(new THREE.SphereGeometry(0.92, 24, 20), chefHatMat);
    crownMesh.position.set(0, 0.72, 0);
    crownMesh.scale.set(1.35, 1.05, 1.35);
    hatGroup.add(crownMesh);

    // 6 Pleat Puffs
    for (let h = 0; h < 6; h++) {
      const angle = (h / 6) * Math.PI * 2;
      const puff = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 14), chefHatMat);
      puff.position.set(Math.cos(angle) * 0.58, 0.78, Math.sin(angle) * 0.58);
      puff.scale.set(1.0, 0.85, 1.0);
      hatGroup.add(puff);
    }
    headGroup.add(hatGroup);

    // BIGGER WINGS
    const createBigWing = (isLeft: boolean) => {
      const wingPivot = new THREE.Group();
      wingPivot.position.set(isLeft ? -0.58 : 0.58, -0.05, -0.55);

      const boneMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.45, 12), wingBoneMat);
      boneMesh.position.set(isLeft ? -0.6 : 0.6, 0.6, 0);
      boneMesh.rotation.set(0, 0, isLeft ? -0.7 : 0.7);
      wingPivot.add(boneMesh);

      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.quadraticCurveTo(0.7, 0.9, 1.7, 1.45);
      shape.quadraticCurveTo(1.15, 0.65, 1.45, -0.15);
      shape.quadraticCurveTo(0.8, 0.15, 1.0, -0.75);
      shape.quadraticCurveTo(0.42, -0.15, 0, 0);

      const wingMesh = new THREE.Mesh(new THREE.ShapeGeometry(shape), wingMat);
      wingMesh.scale.set(isLeft ? -1.55 : 1.55, 1.55, 1.55);
      wingMesh.position.set(0, 0, 0.02);
      wingPivot.add(wingMesh);

      return wingPivot;
    };

    const wingL = createBigWing(true);
    const wingR = createBigWing(false);
    dragonRoot.add(wingL);
    dragonRoot.add(wingR);

    // BIG DETAILED HANDS & PROMINENT WOODEN KITCHEN SPOON
    // Left Arm & Big Detailed Paw
    const armL = new THREE.Group();
    armL.position.set(-0.76, -0.12, 0.42);
    armL.rotation.set(0.4, 0.35, -0.3);

    const armMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.68, 16), dragonSkinMat);
    armL.add(armMeshL);

    // Big Paw Hand
    const pawL = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 16), dragonSkinMat);
    pawL.position.set(0, 0.42, 0.14);
    pawL.scale.set(1.2, 0.95, 1.25);
    armL.add(pawL);

    // 4 Distinct White Claws on Left Hand
    for (let c = -1.5; c <= 1.5; c += 1) {
      const claw = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.18, 12), clawMat);
      claw.position.set(c * 0.12, 0.54, 0.28);
      claw.rotation.set(Math.PI * 0.38, 0, c * 0.18);
      armL.add(claw);
    }
    dragonRoot.add(armL);

    // Right Arm (Forward Facing & Reacts with Cursor!)
    const armR = new THREE.Group();
    armR.position.set(0.72, -0.05, 0.55);
    armR.rotation.set(0.35, -0.25, 0.22);

    const armMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.24, 0.68, 16), dragonSkinMat);
    armR.add(armMeshR);

    // Big Paw Hand
    const pawR = new THREE.Mesh(new THREE.SphereGeometry(0.36, 20, 16), dragonSkinMat);
    pawR.position.set(0, 0.42, 0.14);
    pawR.scale.set(1.2, 0.95, 1.25);
    armR.add(pawR);

    // 4 Distinct White Claws on Right Hand
    for (let c = -1.5; c <= 1.5; c += 1) {
      const claw = new THREE.Mesh(new THREE.ConeGeometry(0.065, 0.18, 12), clawMat);
      claw.position.set(c * 0.12, 0.54, 0.28);
      claw.rotation.set(Math.PI * 0.38, 0, c * 0.18);
      armR.add(claw);
    }

    // LARGE, CLEARLY VISIBLE WOODEN KITCHEN SPOON
    const spoonGroup = new THREE.Group();
    spoonGroup.position.set(0, 0.48, 0.22);
    spoonGroup.rotation.set(0.25, 0.15, 0.28);

    // Long Wooden Handle
    const handleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.075, 1.6, 12), woodSpoonMat);
    handleMesh.position.set(0, 0.55, 0);
    spoonGroup.add(handleMesh);

    // Big Wooden Scoop Head
    const scoopMesh = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), woodScoopMat);
    scoopMesh.position.set(0, 1.32, 0);
    scoopMesh.scale.set(1.2, 1.75, 0.48);
    spoonGroup.add(scoopMesh);

    armR.add(spoonGroup);
    dragonRoot.add(armR);

    // Tail with spikes
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, -0.65, -0.68);
    const tailCurve = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.14, 16, 32, Math.PI * 0.95),
      dragonSkinMat
    );
    tailCurve.rotation.set(Math.PI * 0.4, 0, 0.2);
    tailGroup.add(tailCurve);

    for (let s = 0; s < 4; s++) {
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 12), hairTuftMat);
      spike.position.set(Math.cos(s * 0.6) * 0.52, Math.sin(s * 0.6) * 0.52, 0);
      tailGroup.add(spike);
    }
    dragonRoot.add(tailGroup);

    // 5. Mouse Interaction Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = THREE.MathUtils.clamp(normX, -1, 1);
      mouseRef.current.targetY = THREE.MathUtils.clamp(normY, -1, 1);
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // 6. Animation Frame Loop: Synchronizing Eyes, Head, and Hand with Spoon!
    let animId: number;
    let clock = new THREE.Clock();
    let bounceFactor = 1.0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // SCREAMING MOUTH ON CLICK
      if (isOuchRef.current) {
        bounceFactor = 0.82 + Math.sin(elapsed * 18) * 0.18;
        // Mouth opens wide in screaming "Ouchy!"
        mouthGroup.scale.set(1.5, 2.4, 1.5);
        mouthGroup.position.y = -0.42;
      } else {
        bounceFactor += (1.0 - bounceFactor) * 0.1;
        if (mood === 'happy') {
          mouthGroup.scale.set(1.2, 1.3, 1.0);
          mouthGroup.position.y = -0.38;
        } else if (mood === 'surprised') {
          mouthGroup.scale.set(1.1, 1.8, 1.2);
          mouthGroup.position.y = -0.4;
        } else {
          mouthGroup.scale.set(0.7, 0.4, 0.6);
          mouthGroup.position.y = -0.36;
        }
      }

      // Idle Floating Motion
      const floatY = Math.sin(elapsed * 2.2) * 0.08;
      dragonRoot.position.y = -1.05 + floatY;
      dragonRoot.scale.set(bounceFactor, (2 - bounceFactor) * 0.98, bounceFactor);

      // Head Tilt towards cursor
      headGroup.rotation.y = mx * 0.42;
      headGroup.rotation.x = -my * 0.32;
      headGroup.rotation.z = -mx * 0.08;

      // Eye pupil tracking towards cursor
      leftEye.lookGroup.position.x = mx * 0.09;
      leftEye.lookGroup.position.y = my * 0.09;
      rightEye.lookGroup.position.x = mx * 0.09;
      rightEye.lookGroup.position.y = my * 0.09;

      // HAND & SPOON REACTING DIRECTLY WITH CURSOR!
      armR.rotation.x = 0.35 - my * 0.45;
      armR.rotation.y = -0.25 + mx * 0.55;
      armR.rotation.z = 0.22 + mx * 0.3;

      spoonGroup.rotation.x = -my * 0.4;
      spoonGroup.rotation.y = mx * 0.45;
      spoonGroup.rotation.z = 0.28 + mx * 0.35 + Math.sin(elapsed * 3.5) * 0.12;

      // Left arm subtle reactive gesture
      armL.rotation.y = 0.35 - mx * 0.35;
      armL.rotation.x = 0.4 - my * 0.25;

      // VISUAL MOOD CHANGES
      if (mood === 'sleepy') {
        leftEye.eyelid.visible = true;
        rightEye.eyelid.visible = true;
        leftEye.lookGroup.visible = false;
        rightEye.lookGroup.visible = false;

        headGroup.rotation.x += 0.24; // heavy sleepy droop
        hatGroup.position.set(0.04, 1.08, 0.06); // droopy cap
        hatGroup.rotation.set(0.12, 0, -0.15);
      } else if (mood === 'mischievous') {
        leftEye.eyelid.visible = false;
        rightEye.eyelid.visible = true; // winking right eye!
        leftEye.lookGroup.visible = true;
        rightEye.lookGroup.visible = false;

        headGroup.rotation.z += 0.18; // mischievous tilt
        hatGroup.position.set(0.12, 1.18, -0.02);
      } else if (mood === 'surprised') {
        leftEye.eyelid.visible = false;
        rightEye.eyelid.visible = false;
        leftEye.lookGroup.visible = true;
        rightEye.lookGroup.visible = true;
        leftEye.lookGroup.scale.set(1.3, 1.3, 1.3);
        rightEye.lookGroup.scale.set(1.3, 1.3, 1.3);

        headGroup.rotation.x -= 0.15; // pulling back
        hatGroup.position.y = 1.35 + Math.sin(elapsed * 8) * 0.06; // floating lifted hat!
      } else {
        leftEye.eyelid.visible = false;
        rightEye.eyelid.visible = false;
        leftEye.lookGroup.visible = true;
        rightEye.lookGroup.visible = true;
        leftEye.lookGroup.scale.set(1.0, 1.0, 1.0);
        rightEye.lookGroup.scale.set(1.0, 1.0, 1.0);

        hatGroup.position.set(0.06, 1.15, -0.02);
        hatGroup.rotation.set(-0.06, 0.04, -0.1);
      }

      // Wing flapping animation
      const wingSpeed = mood === 'mischievous' ? 5.5 : mood === 'sleepy' ? 1.4 : mood === 'happy' ? 4.2 : 3.2;
      const wingAngle = Math.sin(elapsed * wingSpeed) * 0.35;
      wingL.rotation.y = -wingAngle - 0.25;
      wingR.rotation.y = wingAngle + 0.25;

      // Tail waggle
      tailGroup.rotation.y = Math.sin(elapsed * 2.0) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 480;
      const newH = container.clientHeight || 560;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mood]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className="relative w-84 h-[440px] sm:w-[440px] sm:h-[500px] md:w-[500px] md:h-[560px] cursor-pointer select-none group flex items-center justify-center"
      title="Click 3D Vanilla Truffle to interact!"
    >
      {/* Soft magical halo beneath 3D dragon (transparent, no box) */}
      <div
        className="absolute inset-10 rounded-full blur-2xl pointer-events-none transition-all duration-500 opacity-60 dark:opacity-40"
        style={{
          background:
            mood === 'mischievous'
              ? 'radial-gradient(circle, rgba(236, 72, 153, 0.45) 0%, transparent 70%)'
              : mood === 'sleepy'
              ? 'radial-gradient(circle, rgba(99, 102, 241, 0.45) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};
