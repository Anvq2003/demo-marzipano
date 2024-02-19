export interface ISettingsPano {
  mouseViewMode: string;
  autorotateEnabled?: boolean;
  fullscreenButton?: boolean;
  viewControlButtons?: boolean;
}

export interface SceneRef {
  sceneData: Scene;
  scene: any;
}

export interface Scene {
  id: string;
  name: string;
  levels: { tileSize: number; size: number; fallbackOnly?: boolean }[];
  faceSize: number;
  initialViewParameters: { pitch: number; yaw: number; fov: number };
  linkHotspots: { yaw: number; pitch: number; target: string }[];
}
