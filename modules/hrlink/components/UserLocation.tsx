import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {useEffect, useRef, useState} from 'react';
import {Map as LeafletMap} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Add, Edit} from 'iconsax-reactjs';
import {AppButton} from '@hrbox/uikit/components';
import {useModalContext} from '@hrbox/core/providers/ModalProvider';
import {Card, CardBody, CardHeader} from '@heroui/react';
import {MarkerIcon} from "@hrbox/modules/hrlink/components/MarkerMap";
import {MapModal} from "@hrbox/modules/hrlink/components/MapModal";

export const UserLocation = () => {
    const profileString = localStorage.getItem('profile');
    const {openModal, isModalOpen} = useModalContext();
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [hasLocation, setHasLocation] = useState(false);

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
                        onPress={() => openModal('confirm', 'location', <MapModal isEdit={hasLocation}
                                                                                  position={position}
                                                                                  setPosition={setPosition}/>)}
                        content={hasLocation ? (
                            <Edit className="text-secondary-1000" size="14"/>
                        ) : (
                            <>
                                <Add className="text-secondary-1000" size="14"/>
                                <span
                                    className="text-secondary-1000 dark:text-white font-normal text-xs">Add New One</span>
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
