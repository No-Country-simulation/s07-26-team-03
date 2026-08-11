import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { createPortal } from 'react-dom';

type ModalProps = {
  showModal: boolean;
  onCloseModal: () => void;
  className?: string;
  children: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
};

export const Modal = ({
  children,
  onCloseModal,
  showModal,
  className
}: ModalProps) => {
  const ref = useOutsideClick<HTMLDivElement>(onCloseModal);

  if (!showModal) return null;

  return createPortal(
    <div
      id="modal"
      className={`${className} w-full z-10 fixed inset-0 bg-black/70 transition duration-300 ease-out`}
    >
      <div ref={ref}>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById('portal')!
  );
};