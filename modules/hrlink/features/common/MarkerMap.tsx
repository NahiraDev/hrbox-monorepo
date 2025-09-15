import { useCallback, useMemo, useRef, useState } from 'react';
import { Icon, LatLng, Marker as LeafletMarker } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

export const MarkerIcon = new Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const DraggableMarker = ({
  position,
  setPosition,
}: {
  position: { lat: number; lng: number };
  setPosition: (value: { lat: number; lng: number }) => void;
}) => {
  const [draggable, setDraggable] = useState<boolean>(true);
  const markerRef = useRef<LeafletMarker | null>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker) {
          const latLng: LatLng = marker.getLatLng();

          setPosition({ lat: latLng.lat, lng: latLng.lng });
        }
      },
    }),
    [setPosition],
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      ref={markerRef}
      draggable={draggable}
      eventHandlers={eventHandlers}
      icon={
        new Icon({
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        })
      }
      position={position}
    >
      <Popup minWidth={90}>
        <button className="px-2 py-1 bg-blue-500 text-white rounded text-sm" onClick={toggleDraggable}>
          {draggable ? 'Marker is draggable' : 'Click to make marker draggable'}
        </button>
      </Popup>
    </Marker>
  );
};
