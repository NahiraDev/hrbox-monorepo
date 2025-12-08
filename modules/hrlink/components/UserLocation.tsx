import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';
import {Map as LeafletMap} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Add, Edit} from 'iconsax-reactjs';
import {AppButton} from '@hrbox/uikit/components';
import {ModalSize, ModalType, useModalContext} from '@hrbox/core/providers/ModalProvider';
import {Card, CardBody, CardHeader } from '@heroui/react';
import {MarkerIcon} from "@hrbox/modules/hrlink/components/MarkerMap";
import { MapModal } from "@hrbox/modules/hrlink/components/MapModal";
import { useModal } from '@hrbox/core/hooks/useModal';
import { useEditLocationMutation, useGetLocationQuery } from '../apis/Common';

export const UserLocation = () => {
    const [ editLocation, { error: errorEditigLocation }] = useEditLocationMutation(); // use in modal to edit user location
    const {data: userLocation, error: errorFetchingLocation } = useGetLocationQuery(); // use to get user location
    const profileString = localStorage.getItem('profile');
    const {openModal, isModalOpen} = useModalContext();
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [hasLocation, setHasLocation] = useState(false);
    const modal = useModal()

    
    const handleOpenMap = () => {
      modal.open(
        ModalType.CREATE,
        "face-allocation",
         <MapModal
              position={{ lat: userLocation?.data?.Longitude , lng: userLocation?.data?.Latitude }}        // e.g. { lat: 35.6, lng: 51.4 } or null
              setPosition={(e:any)=> setPosition({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    })}
              isEdit={true}   // or true when editing
            />,
        {
          isForm: true,
          submitLabel: "Submit Again",
          cancelLabel: "Cancel",
          formConfig: {
            formId: "face-form",
          },
        },
        ModalSize.LG
      );
    };
    
    useEffect(() => {
        try {
            if (profileString) {
                const profile = JSON.parse(profileString);
                const lat = Number(profile?.lat);
                const lng = Number(profile?.Long);

                if (!isNaN(lat) && !isNaN(lng)) {
                    setPosition({lat, lng});
                    setHasLocation(true);
                } else {
                    setPosition({lat: 35.6892, lng: 51.389});
                    setHasLocation(false);
                }
            } else {
                setPosition({lat: 35.6892, lng: 51.389});
                setHasLocation(false);
            }
        } catch (error) {
            console.error('Error parsing profile:', error);
            setPosition({lat: 35.6892, lng: 51.389});
            setHasLocation(false);
        }
    }, [profileString]);

    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current?.invalidateSize();
            }, 100);
        }
    }, [position, isModalOpen]);

    return (
        <Card className="bg-white p-3 rounded-xl flex flex-col gap-1 h-2/5 shadow-shadow-light-tight/1">
            <CardHeader className="flex justify-between pb-1.5 border-b border-neutral-100">
                <span className="text-secondary-1000 text-base font-semibold">Location</span>
                <div>
                    <AppButton
                        onPress={handleOpenMap}
                        content={hasLocation ? (
                            <Edit className="text-secondary-1000" size="14"/>
                        ) : (
                            <>
                                <Add className="text-secondary-1000" size="14"/>
                                <span
                                    className="text-secondary-1000 dark:text-white font-normal text-xs">Add New One\
                                </span>
                            </>
                        )}
                    />
                </div>
            </CardHeader>
            <CardBody className="flex-1 min-h-[200px]">
                {position ? (
                    <MapContainer
                        ref={mapRef}
                        center={position}
                        className="!rounded-md h-full w-full"
                        doubleClickZoom={false}
                        dragging={false}
                        scrollWheelZoom={false}
                        style={{height: '100%', minHeight: '200px'}}
                        zoom={13}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker icon={MarkerIcon} position={position}/>
                    </MapContainer>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">Loading map...</div>
                )}
            </CardBody>
        </Card>
    );
};
