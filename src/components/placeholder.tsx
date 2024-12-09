import { cloneElement } from "react";
import { LucideMessageSquareWarning } from "lucide-react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
};

const Placeholder = ({
  label,
  icon = <LucideMessageSquareWarning />,
  button = <a />,
}: PlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center self-center flex-1 gap-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
};

export { Placeholder };
