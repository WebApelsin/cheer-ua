
import { IconButton } from "@radix-ui/themes";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import styles from "@/styles/spinner.module.css";

type SpinnerProps = {
    name?: string;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
};

export default function Spinner(props: SpinnerProps): React.ReactNode {
    const {
        name,
        value = 0,
        min = 0,
        max = 100,
        step = 1.0,
        onChange: handleChange = () => {}
    } = props;

    // TODO: add support for precision property to control the number of decimals

    const onIncrement = () => {
        handleChange(Math.min(value + step, max));
    };

    const onDecrement = () => {
        handleChange(Math.max(value - step, min));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // TODO: validate value
        handleChange(e.target.valueAsNumber);
    };

    return (
        <div className={styles.container}>
            <IconButton type="button" color="gray" highContrast radius="full" onClick={onDecrement}>
                <MinusIcon />
            </IconButton>

            <input type="number"
                className={styles.input}
                name={name}
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange} />

            <IconButton type="button" color="gray" highContrast radius="full" onClick={onIncrement}>
                <PlusIcon />
            </IconButton>
        </div>
    );
}