import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import useSound from "use-sound";
import sound from "./assets/sound.mp3";
import { useState } from "react";

export default function App() {
  let touran = useFBX("/touran.fbx");
  let road = useFBX("/road.fbx");
  const [play] = useSound(sound);

  const [running, setRunning] = useState(false);

  const handleStart = () => {
    play();

    setTimeout(() => {
      setRunning(true);
    }, 600);
  };

  return (
    <div className="h-dvh w-dvw bg-black grid place-items-center">
      {!running && (
        <button
          onClick={() => handleStart()}
          className="rounded-full active:scale-75 transition-all bg-slate-400 size-32 border-slate-300 border-4 ring-2 ring-slate-100"
        >
          <p>START</p>
          <p className="text-lg">ENGINE</p>
        </button>
      )}
      {running && (
        <Canvas camera={{ fov: 45, position: [4, 2, 5] }}>
          <OrbitControls makeDefault enablePan={false} enableZoom={false} />
          <Environment preset="city" />

          <pointLight
            position={[5, 1, 8]}
            intensity={10}
            distance={30}
            decay={0.7}
            castShadow
          />

          <ambientLight intensity={1} />
          <group scale={0.005} receiveShadow castShadow>
            <primitive object={touran} />
          </group>
          <group scale={0.01} receiveShadow castShadow>
            <primitive object={road} />
          </group>
        </Canvas>
      )}
    </div>
  );
}
