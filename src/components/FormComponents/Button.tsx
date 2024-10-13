import { FormEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: ((e: FormEvent) => void) | (() => Promise<void>) | ((id: string) => Promise<void>);
}

const Button = ({ children, onClick, className, disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={(e) => {
        if (onClick) {
          if (onClick.length === 1) {
            (onClick as (e: FormEvent) => void)(e);
          } else {
            (onClick as () => Promise<void>)();
          }
        }
      }}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
