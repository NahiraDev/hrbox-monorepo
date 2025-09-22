import { AppButton, AppModal } from '@core/components';
import { Location } from 'iconsax-react';
import { MapContainer, TileLayer } from 'react-leaflet';

import {
  DraggableMarker,
  useAddLocationMutation,
  useEditLocationMutation,
} from '@module/hrlink/features/common';
import { useEffect, useState } from 'react';
import { useModalContext } from '@core/context';

export const MapModal = ({
  position,
  setPosition,
  isEdit,
}: {
  position: { lat: number; lng: number };
  setPosition: (value: { lat: number; lng: number }) => void;
  isEdit: boolean;
}) => {
  const [editLocation] = useEditLocationMutation();
  const [addLocation] = useAddLocationMutation();
  const { closeModal } = useModalContext();
  const [currentPosition, setCurrentPosition] = useState(
    position || { lat: 35.6892, lng: 51.3890 }
  );

  useEffect(() => {
    if (position) {
      setCurrentPosition(position);
    }
  }, [position]);

  const handleSave = async () => {
    try {
      if (isEdit) {
        await editLocation(currentPosition).unwrap();
      } else {
        await addLocation(currentPosition).unwrap();
      }
      setPosition(currentPosition);
      closeModal('confirm' , '');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };
  return (
    <AppModal
      icon={<Location className="text-white" size="22" />}
      size="2xl"
      title={isEdit ? "Edit Location" : "Add Location"}
    >
      <AppModal.Body>
        <div className="h-[400px] w-full rounded-md overflow-hidden">
          <MapContainer
            center={currentPosition}
            className="h-full w-full"
            scrollWheelZoom={true}
            zoom={13}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker
              position={currentPosition}
              setPosition={setCurrentPosition}
            />
          </MapContainer>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'md',
            color: 'secondary',
            content: 'Cancel',
            onPress:()=> closeModal('confirm' , ''),
          }}
        />
        <AppButton
          props={{
            size: 'md',
            color: 'primary',
            content: 'Save',
            onPress:()=> handleSave(),
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};
