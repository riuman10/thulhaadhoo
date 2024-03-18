import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, cloneElement } from "react";
import Button from "../buttons/Button";
import Close from "../icons/Close";

interface ModalProps {
  onClose?: () => void;
  drawerOpen: boolean;
  title?: string;
  sub?: string;
  children: JSX.Element;
  edit?: boolean;
  size?: string;
  showBorder?: boolean;
  btnText?: string;
  processing?: boolean;
  showButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  onClose = () => {},
  drawerOpen = false,
  title,
  sub,
  children = <></>,
  edit = false,
  size = "max-w-[400px]",
  showBorder = false,
  btnText,
  showButton = true,
}) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);

  const handleToggle = () => {
    if (!open) {
      return;
    }
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (!drawerOpen) {
      onClose();
    }
    setOpen(drawerOpen);
  }, [drawerOpen]);

  useEffect(() => {
    return () => {
      setConfirm(false);
    };
  }, []);

  let props = {
    changed: changed,
    confirm: confirm,
    reset: reset,
    cancel: cancel,
    open: open,
    setLoading: (value: boolean) => setLoading(value),
    setConfirm: (value: boolean) => setConfirm(value),
    setReset: (value: boolean) => setReset(value),
    setCancel: (value: boolean) => setCancel(value),
    setChanged: (value: boolean) => setChanged(value),
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="font-inter fixed inset-0 z-[100] overflow-hidden"
        onClose={() => handleToggle()}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-black absolute inset-0 bg-opacity-75 transition-opacity dark:bg-opacity-70" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 top-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transition-all duration-700 ease-in-out sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition-all duration-500 ease-in-out sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className={`p-2 w-screen ${size}`}>
                <div
                  className={`${
                    !showButton ? "h-full" : "h-[calc(100%-12px)]"
                  } flex flex-col rounded-2xl bg-white pb-10`}
                >
                  <div
                    className={`bg-25 border-150 sticky top-0 z-30 flex items-center justify-between rounded-t-2xl  border-b bg-white p-4 ${
                      showBorder ? "" : ""
                    }`}
                  >
                    <div className="flex flex-col bg-white">
                      {title ? (
                        <p className="text-gray-900 text-lg font-medium">
                          {" "}
                          {title}{" "}
                        </p>
                      ) : null}
                      {sub ? <p className="text-700 text-sm"> {sub} </p> : null}
                    </div>
                    <button
                      type="button"
                      className="rounded-md transition-all duration-75 ease-out hover:bg-gray-150 focus:outline-none"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      <Close />
                    </button>
                  </div>
                  <div className="prettifyScroll h-full overflow-y-scroll">
                    {cloneElement(children, { ...props })}
                  </div>
                </div>
                {showButton ? (
                  <div
                    className={`sticky bottom-0 flex w-full justify-between ${size} border-150 bottom-3 flex justify-end gap-4 rounded-b-2xl border-t bg-white px-6 py-[20px]`}
                  >
                    <Button
                      name="Cancel"
                      disabled={loading}
                      theme="ghost"
                      onSelect={() => {
                        handleToggle();
                        setCancel(true);
                      }}
                    />
                    <Button
                      theme="default"
                      loading={loading}
                      disabled={loading}
                      name={btnText ? btnText : edit ? "Update" : "Add"}
                      onSelect={() => {
                        !loading && drawerOpen && setConfirm(true);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
