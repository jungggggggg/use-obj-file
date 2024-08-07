import "./styles.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
      <primitive object={obj} scale={1.0} position={[60, 60, -10]} />

      {/* Ambient Light */}
      <ambientLight intensity={1.0} />

      {/* Directional Light */}
      <directionalLight position={[100, 100, 100]} intensity={1.5} castShadow />

      {/* Point Light */}
      <pointLight position={[0, 200, 0]} intensity={2.0} />

      {/* Spot Light */}
      <spotLight position={[50, 50, 50]} angle={0.5} intensity={2.0} castShadow />
    </>
  );
};

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <OrbitControls target={[0, 10, -10]} />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
