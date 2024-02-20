import View360 from "./View360";

export interface IPageProps {
  searchParams: {
    scene: string;
  };
}

export default function Page({ searchParams }: IPageProps) {
  return <View360 scene={searchParams.scene} />;  
}
