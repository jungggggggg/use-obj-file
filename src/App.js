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
      <primitive object={obj} scale={1.0} position={[ 60, 60, -10 ]} />

      {/* Ambient Light */}
      <ambientLight intensity={0.5} />
      
      {/* Directional Light */}
      <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
      
      {/* Point Light */}
      <pointLight position={[0, 10, 0]} intensity={2} />
      
      {/* Spot Light */}
      <spotLight position={[5, 5, 5]} angle={0.3} intensity={1} castShadow />
    </>
  );
};

export default function App() {

  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <OrbitControls target={[0, 10, -10]}/>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
