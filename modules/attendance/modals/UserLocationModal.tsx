import { Avatar } from "@heroui/react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { Map as LeafletMap,LatLngExpression,icon   } from "leaflet";
import { useRef, useState } from "react";
import 'leaflet/dist/leaflet.css';
const LocationMarker = ({ 
  position,
  setPosition 
}: { 
  position: LatLngExpression | null; 
  setPosition: (pos: LatLngExpression) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  const MarkerIcon = icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

  return position === null ? null : (
    <Marker icon={MarkerIcon} position={position} />
  );
};

const UserLocationModal = () => {
  const [position, setPosition] = useState<LatLngExpression>([51.505, -0.09]);
  const mapRef = useRef<LeafletMap | null>(null);

  return (
    <>
        <div className="flex flex-col w-full gap-6">
          <div className="flex flex-row gap-3 items-center">
            <Avatar
              className="w-16 h-16"
              radius="sm"
              src="/images/profile.png"
            />
            <div className="flex flex-col gap-3">
              <p className="text-sm! font-medium!">Sahar Najafi</p>
              <p className="text-sm! font-medium!">192.168.1.1</p>
            </div>
          </div>
          <div className="p-3 bg-[#DCF0F940] dark:bg-[#04425C60] rounded-lg flex flex-col w-full">
            <p className="font-semibold! text-sm!">
              Please note the following points:
            </p>
            <p className="font-normal! text-xs! flex items-center gap-2">
              <span>
                <svg
                  fill="none"
                  height="8"
                  viewBox="0 0 8 8"
                  width="8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" fill="#FD8F02" r="4" />
                </svg>
              </span>
              The entered location is incorrect.
            </p>
          </div>
          <div className="w-full">
            <style>
              {`
                .leaflet-control-attribution {
                  display: none !important;
                }
              `}
            </style>
            <MapContainer
              ref={mapRef}
              center={position}
              className="rounded-md! h-full w-full"
              doubleClickZoom={true}
              dragging={true}
              scrollWheelZoom={true}
              style={{ height: "100%", minHeight: "200px" }}
              zoom={13}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        </div>
    </>
  );
};

export default UserLocationModal;
