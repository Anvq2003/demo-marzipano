import dynamic from 'next/dynamic';

import { data } from './View360/data';
import Test from './View360/components/Test';
// import View360 from './View360';

export interface IPageProps {
  searchParams: {
    scene: string;
  };
}

const fakeFetch = async (scene: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const foundScene = data.scenes.find((s) => s.id === scene) || data.scenes[0];
      resolve(foundScene);
    }, 1000);
  });
};

export default async function Page({ searchParams }: IPageProps) {
  const sceneData = await fakeFetch(searchParams.scene);
  const View360 = dynamic(() => import('./View360'), { ssr: false });

  return (
    <>
      <Test />
      <View360 data={sceneData} />
    </>
  );
}
