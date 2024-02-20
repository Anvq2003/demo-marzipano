import Marzipano from 'marzipano';
import { ISettingsPano, Scene, SceneRef } from './interfaces';

export const createPanoViewer = (panoElm: HTMLElement, settings: ISettingsPano) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: settings.mouseViewMode,
    },
  };
  const panoViewer = new Marzipano.Viewer(panoElm, viewerOpts);
  return panoViewer;
};

export const createHotSpots = (currentScenes: SceneRef[]) => {
  currentScenes.map(({ sceneData, spots, scene }) => {
    if (!spots) return;
    return sceneData?.linkHotspots.map((hotspot, index) => {
      if (spots[index] != null) {
        scene
          .hotspotContainer()
          .createHotspot(spots[index], { yaw: hotspot.yaw, pitch: hotspot.pitch });
      }
    });
  });
};

export const createScenes = (scenes: Scene[] | undefined, viewer: any) => {
  if (!scenes) return [];
  return scenes.map((sceneData) => {
    const urlPrefix = 'https://www.marzipano.net/media';
    const source = Marzipano.ImageUrlSource.fromString(
      `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
      { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` },
    );

    const geometry = new Marzipano.CubeGeometry(sceneData.levels);

    const limiter = Marzipano.RectilinearView.limit.traditional(65536, (100 * Math.PI) / 180);
    const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);

    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    const autorotate = Marzipano.autorotate({
      yawSpeed: 0.03,
      targetPitch: 0,
      targetFov: Math.PI / 2,
    });

    viewer.startMovement(autorotate);

    return { sceneData, scene, spots: [] };
  });
};
