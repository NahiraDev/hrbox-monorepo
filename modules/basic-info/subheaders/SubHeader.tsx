import {AppButton} from "@hrbox/uikit/components";
import {Add, MessageEdit} from "iconsax-reactjs";

const SubHeader = () => {
    return (
        <div>
            <AppButton
                size="xs"
                radius="sm"
                color="white"
                variant="solid"
                isIconOnly
                // onPress={() => openModal("edit", undefined)}
                className="bg-white border-1 border-primary"
                content={<MessageEdit className="text-secondary-900" size="20"/>}
            />
            <AppButton
                size="xs"
                radius="sm"
                color="white"
                variant="solid"
                isIconOnly
                className="bg-white border-1 border-primary"
                content={<Add className="text-secondary-900" size="20"/>}
            />
        </div>
    );
};

export default SubHeader;
