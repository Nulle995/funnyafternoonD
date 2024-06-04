import { forwardRef } from "react";

const Dialog = forwardRef(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      ref={ref}
      onClick={(e) => (e.currentTarget === e.target ? toggleDialog() : null)}
    >
      <div>
        {children} <button onClick={toggleDialog}>Cerrar</button>
      </div>
    </dialog>
  );
});

export default Dialog;
