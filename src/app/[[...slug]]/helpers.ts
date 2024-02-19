import Marzipano from 'marzipano';
import { ISettingsPano, Scene } from './interfaces';

export const createPanoViewer = (panoElm: HTMLElement, settings: ISettingsPano) => {
  const viewerOpts = {
    controls: {
      mouseViewMode: settings.mouseViewMode,
    },
  };
  const panoViewer = new Marzipano.Viewer(panoElm, viewerOpts);
  return panoViewer;
};

const createLinkHotspotElement = (hotspot: { target: string }, router: any) => {
  const handleClick = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('target', hotspot.target);
    router.push(url.toString());
  };

  const element = document.createElement('div');
  element.classList.add('link-hotspot');
  element.addEventListener('click', handleClick);
  return element;
};

const createSpots = (scene: any, linkHotspots: any) => {
  let hotspots: any[] = [];
  linkHotspots?.map((hotspot: any, index: number) => {
    hotspots[index] = scene
      .hotspotContainer()
      .createHotspot(hotspot[index], { yaw: hotspot.yaw, pitch: hotspot.pitch });
  });
  return hotspots;
};

export const createScenes = (scenes: Scene[] | undefined, viewer: any, router: any) => {
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

    // Create link hotspots
    // sceneData.linkHotspots.forEach((hotspot) => {
    //   // const element = createLinkHotspotElement(hotspot, router);
    //   // scene.hotspotContainer().createHotspot(element, { yaw: hotspot.yaw, pitch: hotspot.pitch });
    // });

    const spots = createSpots(scene, sceneData.linkHotspots);

    const autorotate = Marzipano.autorotate({
      yawSpeed: 0.03,
      targetPitch: 0,
      targetFov: Math.PI / 2,
    });

    viewer.startMovement(autorotate);

    return { sceneData, scene, spots };
  });
};
