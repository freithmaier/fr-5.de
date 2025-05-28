import {
  Environment,
  Gltf,
  Scroll,
  ScrollControls,
  Sky,
  Text,
  useFBX,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { Group } from "three";

const invites = [
  "sarah",
  "thesi",
  "adrian",
  "realL",
  "lukas",
  "marie",
  "zillner",
  "julia",
  "simon",
  "lena",
  "phil",
  "tobi",
  "hannes",
  "jakob",
  "michi",
  "hasti",
  "tim",
  "basti",
  "max",
  "wengler",
  "fabi",
  "teresa",
  "ane",
  "leAndor",
];

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

function Touran() {
  let touran = useFBX("/touran.fbx");

  const scroll = useScroll();

  useFrame(() => {
    touran.position.x = 4000 - scroll.offset * 4000;
    touran.position.z = -8000 + scroll.offset * 8000;
    touran.rotation.y = -Math.PI + scroll.offset * Math.PI * 3;
  });

  return (
    <group scale={0.03} position={[0, -3, 0]}>
      <primitive object={touran} />
    </group>
  );
}

function DJ() {
  const ref = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.x = 17 - scroll.offset * 70;
    ref.current.rotation.y = scroll.offset * Math.PI * 10;
  });

  return <Gltf scale={2} rotation={[0, 0, 1]} ref={ref} src="/scene.gltf" />;
}

function Beer() {
  const ref = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.y = -53 + scroll.offset * 70;
    ref.current.rotation.z = scroll.offset * Math.PI * 20;
  });

  return (
    <group ref={ref}>
      <Gltf scale={0.06} position={[1, -2.4, 0]} src="/beer.gltf" />
    </group>
  );
}

export default function App() {
  console.log(
    invites.map((el) => `${el}: https://fr-5.de?n=${btoa(el)}`).join("\n")
  );

  const [name, setName] = useState<string>("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("n");
    if (!name) return;
    const encoded = atob(name);
    if (invites.includes(encoded)) {
      setName(capitalizeFirstLetter(encoded));
    }
  }, []);

  return name === "" ? (
    <>blocked</>
  ) : (
    <div className="w-screen h-screen">
      <Canvas shadows camera={{ position: [0, 0, 30], fov: 50 }}>
        <Environment preset="sunset" />
        <ambientLight intensity={20} />
        <Sky sunPosition={[0, 0, -10]} />

        <Suspense fallback={null}>
          <ScrollControls pages={3}>
            <Touran />

            <Beer />
            <DJ />

            <Scroll>
              <Text
                fontSize={1.5}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                Jo, {name}!
              </Text>
              <Text
                position={[0, -2, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                Am 15. scho wos vor?
              </Text>

              <Text
                position={[0, -26, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                Dad in mein
              </Text>
              <Text
                position={[0, -28, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                Geburtstag
              </Text>
              <Text
                position={[0, -30, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                reifeiern!
              </Text>

              <Text
                position={[0, -34, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                19:00 Uhr
              </Text>

              <Text
                position={[0, -36, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                in Wallersdorf
              </Text>
              <Text
                scale={0.37}
                position={[0, -37, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                (außer es kommen zu viele, dann Aufhausen)
              </Text>

              <Text
                position={[0, -48, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                Kommst du?
              </Text>
              <Text
                onClick={() =>
                  window.open(
                    "https://wa.me/4915224825385?text=Danke%20f%C3%BCr%20die%20Einladung,%0Ai%20kann%20oba%20ned%20kemma."
                  )
                }
                position={[-2, -63, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                ❌
              </Text>
              <Text
                onClick={() =>
                  window.open(
                    "https://wa.me/4915224825385?text=Danke%20f%C3%BCr%20die%20Einladung,%0Anat%C3%BCrlich%20kimm%20i%20vorbei!"
                  )
                }
                position={[2, -63, 0]}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                ✅
              </Text>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
