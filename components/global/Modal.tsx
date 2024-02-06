import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
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
  hideAction?: boolean;
  btnText?: string;
  processing?: boolean;
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
  hideAction = false,
  processing = false,
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
        className="fixed inset-0 overflow-hidden font-inter z-30"
        onClose={() => handleToggle()}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black dark:bg-opacity-70 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div
                className={`w-screen transition-all duration-1000 delay-200 ${size}`}
              >
                <div
                  className={`${
                    hideAction ? "h-full" : "h-[calc(100%-86px)]"
                  }  flex flex-col bg-[#141414] shadow-xl overflow-y-scroll scrollBarHide pb-[100px]`}
                >
                  <div
                    className={`flex justify-between py-6 pl-8 pr-5 border-b border-[#292929] bg-[#141414]  items-center sticky top-0 bg-25 z-30 ${
                      showBorder ? "" : ""
                    }`}
                  >
                    <div className="flex flex-col bg-[#141414]">
                      {title ? (
                        <p className="text-xl font-semibold text-900">
                          {" "}
                          {title}{" "}
                        </p>
                      ) : null}
                      {sub ? <p className="text-sm text-700"> {sub} </p> : null}
                    </div>
                    <button
                      type="button"
                      className="focus:outline-none "
                      onClick={() => {
                        onClose();
                      }}
                    >
                      {/* <Icon
                        name="actions/Close"
                        stroke={dark ? "#FFF" : "#737373"}
                      /> */}
                      <Close />
                    </button>
                  </div>
                  <div className="py-8 px-6">
                    {React.cloneElement(children, { ...props })}
                  </div>
                </div>

                <div
                  className={`fixed w-screen ${size} py-6 px-8 gap-4 border-t border-[#292929] bg-[#141414] bg-25 z-30 bottom-0 flex justify-end`}
                >
                  <Button
                    name="Cancel"
                    disabled={loading || processing}
                    theme="ghost"
                    onSelect={() => {
                      handleToggle();
                      setCancel(true);
                    }}
                  />
                  <Button
                    theme="default"
                    loading={loading || processing}
                    disabled={loading || processing}
                    name={btnText ? btnText : edit ? "Update" : "Add"}
                    onSelect={() => {
                      !loading && drawerOpen && setConfirm(true);
                    }}
                  />
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal;
