interface FormInputProps {
    id?: string; // Add id as an optional prop
    type: string;
    placeholder?: string; // Optional to accommodate file inputs
    value?: string; // Optional to accommodate file inputs
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
    accept?: string; // For file input to specify accepted file types
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    type,
    placeholder,
    value,
    onChange,
    isTextArea = false,
    accept,
}) => {

    if (isTextArea) {
        return (
            <textarea
                id={id} // Pass the id to the textarea
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="border p-2 rounded-md w-full"
            />
        );
    }

    if (type === "file") {
        return (
            <input
                id={id} // Pass the id to the textarea
                type="file"
                accept={accept}
                onChange={onChange}
                className="border p-2 rounded-md w-full"
            />
        );
    }

    return (
        <input
            id={id} // Pass the id to the textarea
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border p-2 rounded-md w-full"
        />
    );

};

export default FormInput;
