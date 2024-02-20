'use client';
import './style.css';
import { useEffect, useRef, useState } from 'react';
import { createHotSpots, createPanoViewer, createScenes } from './helpers';
import { SceneRef } from './interfaces';
import CreateElementsSpots from './components/CreateElementsSpots';
import { data } from './data';

interface View360Props {
  scene: string;
}

export default function View360({ scene }: View360Props) {
  const panoElement = useRef<HTMLDivElement>(null);
  const scenes = useRef<SceneRef[]>([]);

  const [_, setViewer] = useState<any>(null);

  const switchScene = (scene: SceneRef) => {
    scene.scene.switchTo();
  };

  useEffect(() => {
    if (!panoElement.current) return;
    const viewer = createPanoViewer(panoElement.current, data.settings);
    scenes.current = createScenes(data.scenes, viewer);
    switchScene(scenes.current[0]);
    setViewer(viewer);
    setTimeout(() => {
      createHotSpots(scenes.current);
    }, 1);
  }, []);

  // Run when scene changes
  useEffect(() => {
    const targetScene = scenes.current.find((s) => s.sceneData.id === scene);
    if (targetScene) switchScene(targetScene);
  }, [scene]);

  return (
    <div className="View360-container">
      <div ref={panoElement} className="pano" />
      {scenes.current.map((scene) => (
        <CreateElementsSpots key={scene.sceneData.id} scene={scene} />
      ))}
    </div>
  );
}
