import { AppButton, AppModal } from 'core/components';
import { Location } from 'iconsax-react';
import { MapContainer, TileLayer } from 'react-leaflet';

import {
  DraggableMarker,
  useAddLocationMutation,
  useEditLocationMutation,
} from '../../common';

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

  return (
    <AppModal
      icon={<Location className="text-white" size="22" />}
      size="2xl"
      title="Edit Location"
    >
      <AppModal.Body>
        {position && (
          <MapContainer
            center={position}
            className="h-[304px] w-full !rounded-4 overflow-hidden"
            scrollWheelZoom={false}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker position={position} setPosition={setPosition} />
          </MapContainer>
        )}
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'md',
            color: 'secondary',
            content: 'Cancel',
            onPress: close,
          }}
        />
        <AppButton
          props={{
            size: 'md',
            color: 'primary',
            content: 'Save',
            onPress: isEdit ? editLocation(position) : addLocation(position),
          }}
        />
      </AppModal.Footer>
    </AppModal>
  );
};
