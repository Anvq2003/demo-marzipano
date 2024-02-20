import Link from 'next/link';
import { SceneRef } from '../interfaces';

export interface ILinkHotSpotProps {
  scene: SceneRef;
}

export default function CreateElementsSpots({ scene }: ILinkHotSpotProps) {
  return (
    <>
      {scene?.sceneData?.linkHotspots?.map((hotspot, index) => {
        return (
          <Link
            key={index}
            className="link-hotspot"
            href={`?scene=${hotspot.target}`}
            ref={(e) => (scene.spots[index] = e)}
          >
            {scene.sceneData.name}
          </Link>
        );
      })}
    </>
  );
}
