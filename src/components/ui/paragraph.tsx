import { cx } from "@/lib/utils/tremor-raw/utils";

type ParagraphProps = {
  text: string;
  classes?: string;
};

export default function Paragraph({ text, classes }: ParagraphProps) {
  return (
    <p
      className={cx(
        "text-sm leading-6 text-gray-600 dark:text-gray-400",
        classes
      )}
    >
      {text}
    </p>
  );
}
