import { useCallback, useMemo, useRef, useState } from 'react';
import { Icon, LatLng, Marker as LeafletMarker } from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

export const MarkerIcon = new Icon({
  iconUrl: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const DraggableMarker = ({
  position,
  setPosition,
}: {
  position: { lat: number; lng: number };
  setPosition: (value: { lat: number; lng: number }) => void;
}) => {
  const [draggable, setDraggable] = useState<boolean>(false);
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
      icon={MarkerIcon}
      position={position}
    >
      <Popup minWidth={90}>
        <button onClick={toggleDraggable}>
          {draggable ? 'Marker is draggable' : 'Click to make marker draggable'}
        </button>
      </Popup>
    </Marker>
  );
};
