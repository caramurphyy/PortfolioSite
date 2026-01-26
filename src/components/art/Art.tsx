import {
    CardFlip,
    CardFlipFront,
    CardFlipBack,
    CardFlipHeader,
    CardFlipFooter,
    CardFlipTitle,
    CardFlipDescription,
    CardFlipContent,
    CardFlipAction,
  } from "@/components/ui/card-flip";
  import { CardTilt, CardTiltContent } from "@/components/ui/card-tilt";
  
  interface ArtProps {
  src: string;
  alt: string;
  title: string;
  year: string;
  description: string;
  medium: string;
}

function Art({ src, alt, title, year, description, medium }: ArtProps) {
  return (
    <CardFlip>
        <CardFlipFront>
        <CardTilt tiltMaxAngle={15} scale={1.05}>
      <CardTiltContent className="relative rounded-2xl shadow-xl">
      <img src={src} alt={alt} className="w-full rounded-xl" />
      </CardTiltContent>
    </CardTilt>
        </CardFlipFront>
        
        <CardFlipBack className="flex flex-col items-center justify-start pt-6">
            <h3 className="text-2xl text-center [font-family:'Caveat_Brush',cursive]">{title}</h3>
            <div className="flex gap-2 mt-2 [font-family:system-ui,Avenir,Helvetica,Arial,sans-serif] text-sm">
              <span>{medium}</span>
              {medium && year && <span>•</span>}
              <span>{year}</span>
            </div>
            <p className="text-center mt-4 px-4 [font-family:system-ui,Avenir,Helvetica,Arial,sans-serif] text-sm">{description}</p>
        </CardFlipBack>
        </CardFlip>
  );
}

export default Art;
