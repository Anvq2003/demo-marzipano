import Marzipano from 'marzipano';

import { IOriginData, ISceneData } from './interfaces';

export const createPanoViewer = (panoElm: HTMLElement) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: 'drag',
    },
  };

  const panoViewer = new Marzipano.Viewer(panoElm, viewerOpts);
  return panoViewer;
};

export const createHotSpots = ({ Scene, originData, spots }: ISceneData) => {
  if (!spots) return;
  return originData?.linkHotspots.map((hotspot, index) => {
    if (spots[index] != null) {
      Scene.hotspotContainer().createHotspot(spots[index], {
        yaw: hotspot.yaw,
        pitch: hotspot.pitch,
      });
    }
  });
};

export const createScene = (originData: IOriginData | undefined, viewer: any) => {
  if (!originData) return null;

  const urlPrefix = 'https://www.marzipano.net/media';
  const source = Marzipano.ImageUrlSource.fromString(
    `${urlPrefix}/${originData.id}/{z}/{f}/{y}/{x}.jpg`,
    { cubeMapPreviewUrl: `${urlPrefix}/${originData.id}/preview.jpg` },
  );

  const geometry = new Marzipano.CubeGeometry(originData.levels);

  const limiter = Marzipano.RectilinearView.limit.traditional(65536, (100 * Math.PI) / 180);
  const view = new Marzipano.RectilinearView(originData.initialViewParameters, limiter);

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

  return {
    Scene: scene,
    spots: [],
    originData,
  };
};
