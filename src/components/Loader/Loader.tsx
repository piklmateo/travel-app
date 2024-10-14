import { ScaleLoader } from "react-spinners";

interface LoaderProps {
  styles: CSSModuleClasses;
  className: string;
}

const Loader = ({ styles, className }: LoaderProps) => {
  return (
    <div className={styles[className]}>
      <ScaleLoader color="#ffb545" />
    </div>
  );
};

export default Loader;
