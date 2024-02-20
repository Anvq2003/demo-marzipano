'use client';
import './style.css';

import { useEffect, useRef, useState } from 'react';

import CreateElementsSpots from './components/CreateElementsSpots';
import { createHotSpots, createPanoViewer, createScene } from './helpers';
import { IScene, ISceneData } from './interfaces';

interface View360Props {
  data: any;
}

export default function View360({ data }: View360Props) {
  const panoElement = useRef<HTMLDivElement>(null);
  
  const [_, setViewer] = useState<any>(null);

  const sceneData = useRef<ISceneData | any>({
    Scene: null,
    spots: [],
    originData: {},
  });

  const switchScene = (Scene: IScene) => {
    Scene?.switchTo();
  };

  useEffect(() => {
    if (!panoElement.current) return;
    const viewer = createPanoViewer(panoElement.current);
    sceneData.current = createScene(data, viewer);
    setViewer(viewer);
    switchScene(sceneData.current?.Scene);
    setTimeout(() => {
      createHotSpots(sceneData.current);
    }, 1);
  }, [data]);

  return (
    <div className="View360-container">
      <div ref={panoElement} className="pano" />
      <CreateElementsSpots sceneData={sceneData.current} />
    </div>
  );
}
