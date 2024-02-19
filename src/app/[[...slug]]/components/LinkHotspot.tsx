import Link from 'next/link';

export interface ILinkHotSpotProps {
  hotspot: {
    target: string;
  };
}

export default function LinkHotSpot({ hotspot }: ILinkHotSpotProps) {
  return (
    <Link
      className="link-hotspot"
      href={{
        pathname: window.location.pathname,
        search: `?target=${hotspot.target}`,
      }}
    >
      link
    </Link>
  );
}
