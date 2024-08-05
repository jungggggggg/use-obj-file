import "./styles.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { Suspense } from "react";

const Scene = () => {
  const materials = useLoader(MTLLoader, "Block.mtl");
  const obj = useLoader(OBJLoader, "Block.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <>
      {/* 3D 모델 */}
      <primitive object={obj} scale={0.4} />
      
      {/* Ambient Light */}
      <ambientLight intensity={3} />
      
      {/* Directional Light */}
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      {/* Point Light */}
      <pointLight position={[0, 10, 0]} intensity={3} />
      
      {/* Spot Light */}
      <spotLight position={[5, 5, 5]} angle={0.3} intensity={1} castShadow />
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas shadowMap style={{ background: 'black' }} >
        <Suspense fallback={null}>
          <Scene />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}