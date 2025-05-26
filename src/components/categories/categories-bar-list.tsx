import clsx from "clsx";
import { BarList } from "../tremor-raw/visualizations/bar-list";

type CategoryBarProps = {
  name: string;
  value: number;
};

type CategoriesBarListProps = {
  isMock?: boolean;
  data: CategoryBarProps[];
};

export default function CategoriesBarList({
  isMock = false,
  data,
}: CategoriesBarListProps) {
  return <BarList className={clsx(isMock && "opacity-50")} data={data} />;
}
