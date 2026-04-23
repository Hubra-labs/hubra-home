"use client";

import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("./Aurora"), { ssr: false });

export const AuroraBackground = (): JSX.Element => {
  return (
    <div aria-hidden className="aurora-background">
      <Aurora amplitude={0.9} blend={0.55} colorStops={["#C0822A", "#FEAA01", "#DAA520"]} speed={0.35} />
    </div>
  );
};

export default AuroraBackground;
