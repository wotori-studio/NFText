import { useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function ThreeFileLoader(props) {
  const gltf = useLoader(GLTFLoader, [props.fileLink]);
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
}
export default ThreeFileLoader;
