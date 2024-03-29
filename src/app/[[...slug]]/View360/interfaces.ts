export interface ISettingsPano {
  mouseViewMode: string;
  autorotateEnabled?: boolean;
  fullscreenButton?: boolean;
  viewControlButtons?: boolean;
}

export interface ISceneData {
  Scene: IScene
  spots: any[];
  originData: IOriginData;
}

export interface IScene {
  hotspotContainer: () => any;
  switchTo: () => void;
}

export interface IOriginData {
  id: string;
  name: string;
  levels: { tileSize: number; size: number; fallbackOnly?: boolean }[];
  faceSize: number;
  initialViewParameters: { pitch: number; yaw: number; fov: number };
  linkHotspots: { yaw: number; pitch: number; target: string }[];
}
