import { BarList } from "../tremor-raw/visualizations/bar-list";

type CategoryBarProps = {
  name: string;
  value: number;
};

type CategoriesBarListProps = {
  data: CategoryBarProps[];
};

export default function CategoriesBarList({ data }: CategoriesBarListProps) {
  return <BarList data={data} />;
}
