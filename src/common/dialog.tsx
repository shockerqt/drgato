export const Dialog = ({ children, className }: {
  children: [JSX.Element, JSX.Element],
  className?: string,
}) => {

  return (
    <div className={className}>
      {children[0]}
      <dialog open={false}>
        {children[1]}
      </dialog>
    </div>
  );
};
