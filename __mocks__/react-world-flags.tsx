const Flag = ({ code, className }: { code: string; className?: string }) => {
  return (
    <img
      alt={`Flag of ${code}`}
      data-testid={`flag-${code}`}
      className={className}
    />
  );
};
export default Flag;
