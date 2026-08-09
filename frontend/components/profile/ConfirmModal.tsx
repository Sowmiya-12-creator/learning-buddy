interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  confirmColor?: "blue" | "red";
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  confirmColor = "blue",
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-md rounded-3xl bg-[#1d2742] p-8 shadow-2xl">

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <p className="mt-4 text-gray-300">
          {message}
        </p>

        <div className="mt-8 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl bg-gray-600 px-5 py-2 transition hover:bg-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`rounded-xl px-5 py-2 transition text-white ${
              confirmColor === "red"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}