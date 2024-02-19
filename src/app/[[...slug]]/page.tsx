'use client';
import './style.css';

import { useEffect, useRef } from 'react';

import { data } from './data';
import { createPanoViewer, createScenes } from './helpers';
import { SceneRef } from './interfaces';
import { useRouter } from 'next/navigation';

interface TourProps {
  params: {
    slug: string[];
  };
  searchParams: {
    target: string;
  };
}

export default function Tour({ searchParams }: TourProps) {
  const router = useRouter();
  
  const panoElement = useRef<HTMLDivElement>(null);
  const scenes = useRef<SceneRef[]>([]);

  const target = searchParams.target;
  
  const switchScene = (scene: SceneRef) => {
    scene.scene.switchTo();
  };

  useEffect(() => {
    if (!panoElement.current) return;
    const viewer = createPanoViewer(panoElement.current, data.settings);
    const scenesData = createScenes(data.scenes, viewer, router);

    scenes.current = scenesData;
    switchScene(scenesData[0]);
  }, []);

  // handle target change
  useEffect(() => {
    const targetScene = scenes.current.find((s) => s.sceneData.id === target);
    if (targetScene) switchScene(targetScene);
  }, [target]);

  const CreateElementSpots = () => {
    
  }


  return (
    <div className="tour-container">
      <div ref={panoElement} className="pano">
        
      </div>
    </div>
  );
}
