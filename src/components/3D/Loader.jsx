import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ThreeFileLoader() {
  const gltf = useLoader(GLTFLoader, "/models/monkey.glb");
  return <primitive object={gltf.scene} />;
}
