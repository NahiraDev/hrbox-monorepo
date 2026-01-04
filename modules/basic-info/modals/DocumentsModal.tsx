import {AppButton, AppModal} from "@hrbox/uikit/components";
import {Avatar} from "@heroui/react";
import {useRef, useState} from "react";

const DocumentsModal = ({onClose, onSubmit, onCloseAll, initialImage}: any) => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <AppModal.Body>
          <div className="flex flex-col  gap-9">
            <div className="flex gap-3">
              <Avatar
                radius="sm"
                size="lg"
                color="primary"
                src={selectedImage || initialImage || undefined}
              />
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-secondary-1000">Ali Asadi</span>
                <span  className="text-sm font-medium text-secondary-1000">Identity Card</span>
              </div>
            </div>
            <div className="flex items-center justify-center rounded-lg">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-64 object-contain rounded-lg border-2 border-primary"
                />
              ) : initialImage ? (
                <img
                  src={initialImage}
                  alt="Previously Uploaded"
                  className="max-w-full max-h-64 object-contain rounded-lg border-2 border-primary"
                />
              ) : (
                <span className="p-28 bg-primary-50 rounded-xl">No Data</span>
              )}
            </div>

          </div>

        </AppModal.Body>
    );
};

export default DocumentsModal;
