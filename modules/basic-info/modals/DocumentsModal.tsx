import { AppButton, AppModal } from '@hrbox-monorepo/UIKit/components';
import { Avatar } from '@heroui/react';
import { useRef, useState } from 'react';

const DocumentsModal = ({ onClose, onSubmit, onCloseAll, initialImage }) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('فایل انتخاب شده:', file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      onSubmit(selectedImage);
    }
    onCloseAll(); // بستن همه مودال‌ها
  };

  const handleCancel = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage); // آزادسازی حافظه
    }
    setSelectedImage(null);
    onCloseAll(); // بستن همه مودال‌ها
  };

  return (
    <AppModal.Body>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1">
          <Avatar radius="sm" size="lg" src={selectedImage || initialImage || undefined} />
          <div className="flex flex-col gap-1">
            <span>Ali Asadi</span>
            <span>Identity Card</span>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-lg">
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Uploaded"
              className="max-w-full max-h-64 object-contain rounded-lg border-2 border-blue-500"
            />
          ) : initialImage ? (
            <img
              src={initialImage}
              alt="Previously Uploaded"
              className="max-w-full max-h-64 object-contain rounded-lg border-2 border-blue-500"
            />
          ) : (
            <span className="p-28 bg-surface-50 rounded-xl">No Data</span>
          )}
        </div>
        <AppModal.Footer>
          {selectedImage ? (
            <div className="flex gap-2">
              <AppButton
                props={{
                  size: 'xs',
                  radius: 'sm',
                  onPress: handleCancel,
                  content: <span>Cancel</span>,
                  className: 'text-black py-1.5 px-3 text-xl rounded-lg hover:bg-red',
                }}
              />
              <AppButton
                props={{
                  size: 'xs',
                  radius: 'sm',
                  color: 'primary',
                  onPress: handleSubmit,
                  content: <span>Submit</span>,
                  className: 'text-white py-1.5 px-3 text-xl rounded-lg',
                }}
              />
            </div>
          ) : (
            <AppButton
              props={{
                size: 'xs',
                radius: 'sm',
                color:'primary',
                onPress: handleButtonClick,
                content: <span>Upload File</span>,
                className: 'text-white py-1.5 px-3 text-xl rounded-lg ',
              }}
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </AppModal.Footer>
      </div>
    </AppModal.Body>
  );
};

export default DocumentsModal;
