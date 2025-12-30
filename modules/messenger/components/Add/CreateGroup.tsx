import { Button, Image, Modal, ModalBody, ModalContent, ModalFooter } from "@heroui/react";
import { Edit2, Refresh2, RowHorizontal, Trash } from "iconsax-reactjs";
import { CreateGroupProps } from "./types";
import { useEffect, useRef } from "react";
import Cropper from "cropperjs";

export const CreateGroup: React.FC<CreateGroupProps> = ({ data }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<Cropper | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (imageRef.current) {
        cropperRef.current = new Cropper(imageRef.current, {
          aspectRatio: 0,
          viewMode: 0,
          autoCropArea: 0,
          responsive: true
        } as any);
      }
    }, 100);

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
      }
    };
  }, [data?.selectedImage]);
  const handleRotateImage = () => {
    if (cropperRef.current) {
      cropperRef.current.rotate(90);
    }
  };

  const handleFlipImage = () => {
    if (cropperRef.current) {
      const currentScaleX = cropperRef.current.getData().scaleX;
      cropperRef.current.scaleX(currentScaleX === 1 ? -1 : 1);
    }
  };

  const handleSetPhoto = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas();
      const croppedImageUrl = canvas.toDataURL("image/jpeg");
      data?.setSelectedImage(croppedImageUrl);
    }
  };

  return (
    <Modal
      size="md"
      className="bg-transparent dark:bg-info-1000"
      isOpen={data.isOpen}
      onOpenChange={data.onClose}
      closeButton={false}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="!p-0 bg-white !rounded-t-5">
              {data.selectedImage && (
                <Image
                  ref={imageRef}
                  src={data.selectedImage || undefined}
                  alt="Selected"
                  className="w-full h-[348px] rounded-t-5 object-cover"
                />
              )}
            </ModalBody>
            <ModalFooter className="bg-white dark:bg-info-1000 shadow-sm !p-0">
              <div className="flex py-3 items-center justify-between w-full px-4">
                <Button
                  variant="light"
                  className="!rounded-4 !py-1 !px-2 text-sm font-normal !h-fit"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="light"
                  isIconOnly
                  className="!rounded-4 !py-1 !px-2 text-sm font-normal !h-fit"
                  onClick={() => data?.handleImageUpload}
                >
                  <Edit2
                    size="24"
                    className="cursor-pointer text-secondary-1000 dark:text-white"
                  />
                </Button>
                <Button
                  variant="light"
                  isIconOnly
                  onClick={() => data.setOrginalImage("")}
                >
                  <Trash size="24" className="cursor-pointer text-danger-400" />
                </Button>
                <Button variant="light" isIconOnly onClick={handleFlipImage}>
                  <RowHorizontal
                    size="24"
                    className="cursor-pointer text-secondary-1000 dark:text-white"
                  />
                </Button>
                <Button isIconOnly variant="light" onClick={handleRotateImage}>
                  <Refresh2
                    size="24"
                    className="cursor-pointer text-secondary-1000 dark:text-white"
                  />
                </Button>

                <Button
                  onClick={() => {
                    handleSetPhoto();
                    onClose();
                  }}
                  className="bg-primary dark:bg-surface-200 text-white !rounded-4 !py-1 !px-2 text-sm font-normal !h-fit"
                >
                  Set Photo
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
