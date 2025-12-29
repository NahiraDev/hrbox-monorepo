import { AppButton, AppPageTitle } from "@hrbox/uikit/components";
import { Add, Chart, SearchNormal, Setting4 } from "iconsax-reactjs";

const DashboardSubHeader = () => {
  return (
    <div className="flex flex-row-reverse justify-between">
      <div className="flex flex-row-reverse gap-2">
        <AppButton
          color="primary"
          size="md"
          radius="lg"
          variant="bordered"
          content="Add new One"
          className={"p-2.5!"}
          startContent={<Add />}
        />

        <AppButton
          color="primary"
          size="md"
          variant="bordered"
          radius="lg"
          className={"p-2.5!"}
          content={<Setting4 />}
        />

        <AppButton
          color="primary"
          size="md"
          radius="lg"
          variant="bordered"
          className={"p-2.5!"}
          content={<SearchNormal />}
        />
      </div>

      <div className="flex">
        <AppPageTitle title="Dashboard" icon={<Chart color="#fff" size={18} />} />
      </div>
    </div>
  );
};

export default DashboardSubHeader;
