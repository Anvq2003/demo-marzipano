import View360 from '@/components/View360';
import { data } from '@/components/View360/data';
import { IOriginData } from '@/components/View360/interfaces';

export const getServerSideProps = async (context: any) => {
  // Fetch data from external API
  const slug = context.query?.slug;
  // const originData = data.scenes.find((scene) => scene.id === slug);
  


  // Pass data to the page via props
  return { props: { originData: originData } };
};

export interface IAppProps {
  originData: IOriginData;
}

export default function App({ originData }: any) {
  // return <View360 data={originData} />;
  return <div className=""></div>;
}
