import clsx from "clsx";

interface GlassPaneProps {
  className: string;
  children: React.ReactNode;
}

export const GlassPane = ({ className, children }: GlassPaneProps) => {
  return (
    <div
      className={clsx(
        "glass rounded-2x1 border-solid border-2 border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
