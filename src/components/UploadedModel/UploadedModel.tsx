import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

interface Properties {
  file: string;
  scale: [number, number, number];
  position: [number, number, number];
}

export default function UploadedModel(props: Properties) {
  const { file, scale, position } = props;

  const group = useRef();

  const { scene, animations } = useGLTF(file);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    startAnimation();
  });

  function startAnimation(number: number = 0): void {
    const names = Object.keys(actions);

    if (number < names.length) {
      actions[names[number]].play();
    }
  }

  return <primitive object={scene} scale={scale} position={position} />;
} 
