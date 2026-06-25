import { useState } from 'react';
import { Button } from "./ui/button"

interface ReusableFormProps {
    heading: string;
    inputPlaceholder: string;
    submitBtnText: string;
    functionParams?: object;
    functionToExecute: (inputValue: string, functionParams?: object) => void | Promise<void>;
    onCancel?: () => void;
}

const ReusableForm = ({
    heading,
    inputPlaceholder,
    submitBtnText,
    functionParams,
    functionToExecute,
    onCancel,
}: ReusableFormProps) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await functionToExecute(inputValue, functionParams);
    };

    return (
        <div className="w-full max-w-md rounded-3xl border-2 border-outline-variant bg-surface-container-low p-6 shadow-ambient">
            <div className="space-y-1.5 mb-5">
                <h2 className="text-2xl font-bold text-on-surface">{heading}</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    placeholder={inputPlaceholder}
                    className="w-full rounded-xl border-2 border-transparent bg-surface-container px-4 py-3 text-on-surface outline-none transition-colors placeholder:text-secondary focus:border-primary"
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="submit" className="w-full">
                        {submitBtnText}
                    </Button>
                    {onCancel && (
                        <Button type="button" variant="ghost" className="w-full" onClick={onCancel}>
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ReusableForm
