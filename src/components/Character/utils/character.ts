import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const formalOutfitParts = new Map([
    ["BODY.SHIRT", "#132a57"],
    ["Pant", "#090a0f"],
    ["Shoe", "#07070a"],
    ["Sole", "#15161b"],
  ]);

  const applyFormalLook = (character: THREE.Object3D) => {
    character.traverse((child: any) => {
      if (!child.isMesh || !child.material) return;

      const targetColor = formalOutfitParts.get(child.name);
      if (!targetColor) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];

      materials.forEach((material: any) => {
        if (material.color) material.color.set(targetColor);
        if ("roughness" in material) material.roughness = 0.46;
        if ("metalness" in material) material.metalness = 0.16;
        if ("clearcoat" in material) material.clearcoat = 0.38;
        if ("clearcoatRoughness" in material)
          material.clearcoatRoughness = 0.16;
        if ("emissive" in material) material.emissive = new THREE.Color("#08142d");
        if ("emissiveIntensity" in material) material.emissiveIntensity = 0.12;
        material.needsUpdate = true;
      });
    });
  };

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            applyFormalLook(character);
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
