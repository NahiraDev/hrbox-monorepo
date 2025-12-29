import { Add, Hierarchy3, SearchNormal, Setting4 } from "iconsax-reactjs";

import { AppButton, AppPageTitle } from "@hrbox/uikit/components";

const ProcessListSubHeader = () => {

  return (
    <div className="flex flex-row-reverse w-full justify-between">
      <div className="flex flex-row-reverse gap-2">
        <AppButton
          color="primary"
          size="md"
          variant="bordered"
          radius="lg"
          startContent={<Add />}
          className={"p-2.5!"}
          // onPress={() => openModal('confirm', 'NewOneModal', <NewOneModal/>)}
          content="Add new One"
        />
        <AppButton
          color="primary"
          size="md"
          variant="bordered"
          radius="lg"
          className={"p-2.5!"}
          startContent={<Setting4 />}
        />
        <AppButton
          size="md"
          radius="lg"
          color="primary"
          variant="bordered"
          className="w-fit! p-2.5!"
          startContent=<SearchNormal/>
        />
      </div>
      <div className="flex">
        <AppPageTitle title="Processes" icon={<Hierarchy3 color="#fff" size={18} />} />
      </div>
    </div>
  );
};

export default ProcessListSubHeader;
