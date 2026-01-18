import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export default function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  disabled = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onChange(value);
    }
  };

  const sizeStyles = {
    sm: {
      button: 'w-7 h-7',
      input: 'w-10 h-7 text-sm',
      icon: 14,
    },
    md: {
      button: 'w-9 h-9',
      input: 'w-14 h-9',
      icon: 18,
    },
  };

  const styles = sizeStyles[size];

  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        className={`
          ${styles.button} flex items-center justify-center
          bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
        `}
        aria-label="Decrease quantity"
      >
        <Minus size={styles.icon} />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleInputChange}
        min={min}
        max={max}
        disabled={disabled}
        className={`
          ${styles.input} text-center border-0 bg-white
          focus:outline-none focus:ring-0
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        className={`
          ${styles.button} flex items-center justify-center
          bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
        `}
        aria-label="Increase quantity"
      >
        <Plus size={styles.icon} />
      </button>
    </div>
  );
}
