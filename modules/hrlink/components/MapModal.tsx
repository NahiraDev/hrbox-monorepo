import { AppButton, AppModal } from "@hrbox/uikit/components";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import {
  useAddLocationMutation,
  useEditLocationMutation,
} from "@hrbox/modules/hrlink/apis/Common";
import { DraggableMarker } from "./MarkerMap";

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
    position || { lat: 35.6892, lng: 51.389 },
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
      closeModal("confirm", "");
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };
  return (
        <div className="h-[400px] w-full rounded-md overflow-hidden">
          <MapContainer
            center={currentPosition}
            className="h-full w-full"
            scrollWheelZoom={true}
            zoom={13}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <DraggableMarker
              position={currentPosition}
              setPosition={setCurrentPosition}
            />
          </MapContainer>
        </div>
  );
};
