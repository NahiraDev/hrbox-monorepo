import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import { Map as LeafletMap } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Add, Edit } from 'iconsax-react';
import { AppButton } from 'core/components';
import { useModalContext } from 'core/context';

import { MarkerIcon } from './MarkerMap';

export const UserLocation = () => {
  const isEdit = false;
  const profile: any = localStorage.getItem('profile') || {};
  const { openModal, isModalOpen } = useModalContext();
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    const lat = Number(profile.lat);
    const lng = Number(profile.Long);

    if (!isNaN(lat) && !isNaN(lng)) {
      setPosition({ lat, lng });
    }
  }, [profile]);

  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (isModalOpen('edit', 'location') && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 300);
    }
  }, [isModalOpen]);

  return (
    <div className="bg-white p-3 rounded-5 flex flex-col gap-1 h-2/5 shadow-shadow-light-tight/1">
      <div className="flex justify-between pb-1.5 border-b border-neutral-100">
        <span className="text-secondary-1000 text-base font-semibold">Location</span>
        <div>
          <AppButton
            props={{
              size: 'xs',
              color: 'white',
              onPress:()=> openModal('confirm', 'location'),
              content: isEdit ? (
                <Edit className="text-secondary-1000" size="14" />
              ) : (
                <>
                  <Add className="text-secondary-1000" size="14" />
                  <span className="text-secondary-1000 dark:text-white font-normal text-xs">Add New One</span>
                </>
              ),
            }}
          />
        </div>
      </div>
      {position && (
        <MapContainer
          center={position}
          className="!rounded-4 h-full"
          doubleClickZoom={false}
          dragging={false}
          scrollWheelZoom={false}
          style={{ width: '100%' }}
          zoom={13}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker icon={MarkerIcon} position={position} />
        </MapContainer>
      )}
    </div>
  );
};
