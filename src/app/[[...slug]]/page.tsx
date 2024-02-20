import { useEffect } from 'react';
import View360 from './View360';
import { data } from './View360/data';

export interface IPageProps {
  searchParams: {
    scene: string;
  };
}

const fakeFetch = async (scene: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data?.scenes.find((s) => s.id === scene));
    }, 1000);
  });
};

export default async function Page({ searchParams }: IPageProps) {
  const sceneData = await fakeFetch(searchParams.scene);

  return <View360 data={sceneData} />;
}
