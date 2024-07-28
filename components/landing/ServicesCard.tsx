import IconButton from "@/components/landing/IconButton";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colspan?: number;
  rowspan?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  colspan,
  rowspan,
}) => {
  return (
    <div
      className={`col-span-${colspan} row-span-${rowspan} h-[310px] rounded-[20px] border-2 border-slate-400/10 bg-card p-4 dark:bg-neutral-900`}
    >
      <div className="flex flex-col gap-2 space h-full justify-between">
        <IconButton icon={icon} target="_blank" />
        <div className="w-[350px]">
          <p className="text-[25px]  font-semibold">{title}</p>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
