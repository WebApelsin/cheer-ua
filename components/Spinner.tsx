
import { IconButton } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import styles from "@/styles/spinner.module.css";

type SpinnerProps = {
    value: number | undefined;
    min: number | undefined;
    max: number | undefined;
    onChange: (value: number) => void;
};

export default function Spinner(props: SpinnerProps): React.ReactNode {
    const { value = 0, min = 0, max = 100, onChange: handleChange } = props;

    const onIncrement = () => {
        handleChange(Math.min(value + 1, max));
    };

    const onDecrement = () => {
        handleChange(Math.max(value - 1, min));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: validate value
        handleChange(e.target.valueAsNumber);
    };

    return (
        <div className={styles.container}>
            <IconButton color="gray" radius="full" onClick={onDecrement}>
                <MinusIcon />
            </IconButton>

            <input type="number"
                className={styles.input}
                min={min}
                max={max}
                value={value}
                onChange={onChange} />

            <IconButton color="gray" radius="full" onClick={onIncrement}>
                <PlusIcon />
            </IconButton>
        </div>
    );
}