import Heading from "../ui/heading";
import { Button } from "@/components/tremor-raw/ui/button";

type ErrorComponentProps = {
  errorMessage: string;
  reset: () => void;
};

export default function ErrorComponent({
  errorMessage,
  reset,
}: ErrorComponentProps) {
  return (
    <section className="space-y-4">
      <Heading level={1} text="Server 500" />
      <p className="text-red-700">{errorMessage}</p>
      <Button variant="base" className="w-fit" onClick={() => reset()}>
        Please try again
      </Button>
    </section>
  );
}
