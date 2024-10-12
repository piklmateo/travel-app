import { FormEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: FormEvent) => void;
}

const Button = ({ children, onClick, className, disabled = false }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
