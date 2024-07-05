
import { useFormStatus } from 'react-dom';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

interface SubmitButtonProps {
    text: string;
    className?: string;
}

export default function SubmitButton(props: SubmitButtonProps) {
    const { pending, data, method, action } = useFormStatus();
    return <Button
        className={cn("gap-1", props.className)}
        aria-disabled={pending}
        disabled={pending}>{props.text}</Button>
}
