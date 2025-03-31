const ConfirmationModal = ({ 
  header,
  body,
  open,
  onClose,
  onSubmit,
  submitBtnText,
  warningMsg,
}) => {
  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] rounded-2xl shadow-2xl p-6 max-w-md w-full">
            {/* Header */}
            <div className="text-center border-b border-gray-300 pb-3">
              <h3 className="text-2xl font-bold text-white">{header}</h3>
            </div>
            {/* Body */}
            <div className="mt-4 text-center text-white">
              <p className="text-lg font-medium">{body}</p>
              {warningMsg && (
                <div className="mt-4 p-3 bg-yellow-100 text-yellow-900 border-l-4 border-yellow-700 rounded-md">
                  <h4 className="font-semibold">Warning</h4>
                  <p className="text-sm">{warningMsg}</p>
                </div>
              )}
            </div>
            {/* Buttons */}
            <div className="mt-6 flex justify-between gap-4">
              <button
                className="w-full py-2 rounded-lg text-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-300"
                onClick={onClose}
              >
                No, Cancel
              </button>
              <button
                className="w-full py-2 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition duration-300"
                onClick={onSubmit}
              >
                {submitBtnText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
