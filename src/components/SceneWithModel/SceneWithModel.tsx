import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import UploadedModel from "./../UploadedModel/UploadedModel";
import ScreenshotButton from "../fiber/screenshot"

interface Properties {
  file: string;
}

export default function SceneWithModel(props: Properties) {
  const { file } = props;

  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <OrbitControls />

      {/* Model */}
      <Suspense fallback={null}>
        <UploadedModel file={file} scale={[1, 1, 1]} position={[0, 0, 0]} />
        <ScreenshotButton />
      </Suspense>

      {/* Light */}
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
    </Canvas>
  );
}
