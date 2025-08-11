import { useNavigate } from "react-router-dom";

interface DocItemProps {
  props: {
    to?: string;
    icon: any;
    title?: string;
    outlined?: boolean;
    isActive?: boolean;
  };
}

export const DocItem = ({ props }: DocItemProps) => {
  const {
    to = "/",
    icon: Icon,
    title = "",
    outlined = false,
    isActive = false,
  } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div>
      <button
        className={`w-12 h-12 flex items-center justify-center rounded-[10px]
          ${
            outlined
              ? "border border-dashed border-secondary-400 bg-transparent text-secondary-400"
              : isActive
                ? "bg-[linear-gradient(0deg,_#1E3363_0%,_#3D68C9_126.58%)] text-white dark:from-info-700 dark:to-[#BAD9EC] w-[60px] h-[60px]"
                : "bg-gradient-to-t from-[#DCE0E3] to-[#FFFFFF] text-secondary-1000 dark:text-neutral-50 dark:from-surface-150 dark:to-[rgba(4,66,92,0.4)] drop-shadow-[0px_0.945px_2.835px_rgba(0,0,0,0.30)]"
          }`}
        onClick={handleClick}
      >
        <Icon size={isActive ? "32" : "24"} />
      </button>
      {isActive && (
        <span className="text-xs font-semibold text-center absolute text-secondary-1000 dark:text-white">
          {title}
        </span>
      )}
    </div>
  );
};

export default DocItem;
