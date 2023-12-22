type ButtonProps = {
  text: string;
  onClick: () => void;
};

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      className="btn"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default Button;
