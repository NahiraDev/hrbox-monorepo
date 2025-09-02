import { Maximize as MaxIcon } from "iconsax-react";

export default function Maximize({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) {

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && targetRef.current) {
      targetRef.current.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="p-2 rounded-lg border border-sky-500 border-2 hover:bg-sky-100 transition"
    >
      <MaxIcon size={20} />
    </button>
  );
}
