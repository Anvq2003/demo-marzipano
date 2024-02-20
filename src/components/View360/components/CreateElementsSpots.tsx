import Link from 'next/link';
import { ISceneData } from '../interfaces';

export interface ILinkHotSpotProps {
  sceneData: ISceneData;
}

export default function CreateElementsSpots({ sceneData }: ILinkHotSpotProps) {
  return (
    <>
      {sceneData?.originData?.linkHotspots?.map((hotspot: any, index: number) => {
        return (
          <Link
            key={index}
            className="link-hotspot"
            href={`/scene/${hotspot.target}`}
            ref={(e) => (sceneData.spots[index] = e)}
          >
          </Link>
        );
      })}
    </>
  );
}
