import { useFormStatus } from "react-dom";
import { LucideLoaderCircle } from "lucide-react";

import { Button } from "../ui/button";

type SubmitButtonProps = {
  label: string;
};

// We needed to create this component so we would have a way to scope the useFormStatus hook to the form. Since the button is rended within the form, the button shares the same scope as the form and can access the useFormStatus hook.

// With the SubmitButton we have a reusalbe button to add to forms that comes with a loading spinner.
const SubmitButton = ({ label }: SubmitButtonProps) => {
  // This hook is much more declarative than the useTransition hook. It returns an object with a single property, pending, which is a boolean that indicates whether the form is currently pending.
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  );
};

export { SubmitButton };
