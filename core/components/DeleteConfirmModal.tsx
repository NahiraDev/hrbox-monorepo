import { FormProvider, Form, useFormContext } from '@hrbox/core/providers/FormProvider';
import { FormMode } from '@hrbox/uikit/components/types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  title = "حذف آیتم",
  message = "آیا از حذف این مورد اطمینان دارید؟",
  itemName,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const fullMessage = itemName ? `${message}\n\n"${itemName}"` : message;

  const handleSubmit = async () => {
    await onConfirm();
    onClose(); // Close modal after success
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
        <FormProvider
          formId={`delete-confirm-${Date.now()}`} // unique per open
          initialValues={{}}
          onSubmitAsync={handleSubmit}
        >
          <DeleteModalContent
            title={title}
            message={fullMessage}
            onClose={onClose}
          />
        </FormProvider>
      </div>
    </div>
  );
}

function DeleteModalContent({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  const { isSubmitting, resetFormState } = useFormContext();

  const handleCancel = () => {
    resetFormState();
    onClose();
  };

  return (
    <Form className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>

      <div className="text-gray-600 whitespace-pre-wrap">{message}</div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          انصراف
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              در حال حذف...
            </>
          ) : (
            'بله، حذف کن'
          )}
        </button>
      </div>
    </Form>
  );
}