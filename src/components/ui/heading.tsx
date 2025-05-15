import { cx } from "@/lib/utils/tremor-raw/utils";
import { JSX } from "react";

type HeadingProps = {
  level: number;
  text: string;
  classes?: string;
};

export default function Heading({ level, text, classes }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <header>
      <Tag className={cx("text-2xl font-bold", classes)}>{text}</Tag>
    </header>
  );
}
