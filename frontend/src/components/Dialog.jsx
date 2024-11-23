import { forwardRef } from "react";
import "../styles/Dialog.css";
const Dialog = forwardRef(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      className="dialog"
      ref={ref}
      onClick={(e) => (e.currentTarget === e.target ? toggleDialog() : null)}
    >
      <div className="children">{children}</div>
    </dialog>
  );
});

export default Dialog;
