import { Avatar } from '@heroui/react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { MarkerIcon } from '@module/hrlink/features/common';
import { Map as LeafletMap } from 'leaflet';
import { useRef } from 'react';
import { useModalContext } from '@core/context';

import { AppButton, AppModal } from '@core/components';
import ActionsModal from '@module/attendance/features/modals/ActionsModal';
const UserLocationModal = () => {
  const position = [51.505, -0.09];
  const mapRef = useRef<LeafletMap | null>(null);
  const { closeModal, openModal } = useModalContext();

  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="w-[64px] h-[64px]" radius="md" src="/images/favicon.png" />
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium">Sahar Najafi</p>
              <p className="text-sm font-medium">192.168.1.1</p>
            </div>
          </div>
          <div className="p-3 bg-[#DCF0F940] rounded-lg flex flex-col w-full">
            <p className="font-semibold text-sm">Please note the following points:</p>
            <p className="font-normal text-xs flex items-center gap-2">
              <span>
                <svg fill="none" height="8" viewBox="0 0 8 8" width="8" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4" fill="#FD8F02" r="4" />
                </svg>
              </span>
              The entered location is incorrect.
            </p>
          </div>
          <div className="w-full">
            <MapContainer
              ref={mapRef}
              center={position}
              className="!rounded-md h-full w-full"
              doubleClickZoom={false}
              dragging={true}
              scrollWheelZoom={true}
              style={{ height: '100%', minHeight: '200px' }}
              zoom={13}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker icon={MarkerIcon} position={position} />
            </MapContainer>
          </div>
        </div>
      </AppModal.Body>
      <AppModal.Footer>
        <div className="flex flex-row justify-end gap-[30px]">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'lg',
              onClick: () => closeModal('confirm', 'UserLocationModal'),
              content: 'Cancel',
            }}
          />
          <AppButton
            props={{
              color: 'primary',
              type: 'submit',
              size: 'md',
              radius: 'lg',
              onClick: () => openModal('confirm', 'ActionsModal', <ActionsModal />),
              content: 'Submit Again',
            }}
          />
        </div>
      </AppModal.Footer>
    </>
  );
};

export default UserLocationModal;
