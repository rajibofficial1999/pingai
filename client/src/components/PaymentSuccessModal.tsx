import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Modal } from "./ui/modal";

export const PaymentSuccessModal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClose = () => {
    setIsOpen(false);
    navigate("/dashboard/billing");
  };

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={true}
    >
      <>
        <div className="relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
          <img
            src="/images/payment_success.png"
            className="h-full w-full object-cover"
            alt="Payment success"
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-1 text-center">
          <p className="text-lg/7 tracking-tight font-medium text-pretty">
            Upgrade successful! 🎉
          </p>
          <p className="text-gray-600 text-sm/6 text-pretty">
            Thank you for upgrading to Pro and supporting PingAI. Your account
            has been upgraded.
          </p>
        </div>

        <div className="mt-8 w-full">
          <Button onClick={handleClose} className="h-10 w-full">
            <CheckIcon className="mr-2 size-5" />
            Go to Billing page
          </Button>
        </div>
      </>
    </Modal>
  );
};
