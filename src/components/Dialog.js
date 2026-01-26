import { forwardRef, useImperativeHandle, useRef } from "react";

const Dialog = forwardRef(({ children, classString = "" }, ref) => {
    const dRef = useRef();
    useImperativeHandle(ref, () => ({
        toggle: () => {
            if (dRef.current.open) dRef.current.close();
            else dRef.current.showModal();
        },
        open: () => dRef.current?.showModal(),
        close: () => dRef.current?.close()
    }));

    const handleDialogClick = (e) => {
        if (e.target === e.currentTarget) {
            dRef.current.close();
        }
    }

    return (
        <dialog className={classString} ref={dRef} onClick={handleDialogClick}>
            {children}
        </dialog>
  )
});

export default Dialog;