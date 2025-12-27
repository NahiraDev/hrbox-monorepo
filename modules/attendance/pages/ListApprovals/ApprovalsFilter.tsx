import { AppAutoComplete, AppButton } from "@hrbox/uikit/components";
import "../../app/index.css";
import { FormProvider } from "@hrbox/core/providers";
import { FormField } from "@hrbox/uikit/components/FormField";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-reactjs";
const ApprovalsFilter = () => {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const filterList = [
    "request_type",
    "issuer",
    "from_date",
    "to_date",
    "request_number",
    "request_type",
    "issuer",
    "from_date",
    "to_date",
    "request_number",
  ];
  const headerInitialValues = {
    month: "",
    year: "",
    person: "",
    department: "",
  };
  const scrollUp = () => {
    scrollRef.current?.scrollBy({ top: -60, behavior: "smooth" });
  };

  const scrollDown = () => {
    scrollRef.current?.scrollBy({ top: 60, behavior: "smooth" });
  };
  return (
    <>
      <FormProvider
        formId="calenderHeader"
        initialValues={headerInitialValues}
        validationSchema={{}}
        enableCache={false}
      >
        <div className="flex flex-col w-[22%] h-full rounded-xl pr-2 pl-3 py-3 gap-10  border border-primary ">
          <div className="relative h-[600px] pr-3">
            <AppButton 
              onPress={scrollUp}
              className="absolute top-0 right-0 left-64 w-6 h-6 flex items-center justify-center cursor-pointer p-0 m-0 bg-transparent"
              content={ <ArrowUp2 size={8} variant="Bold" color="black" />}
            />
             
            <div
              className="flex flex-col gap-4 pr-3 overflow-y-scroll max-h-[600px] custom-scroll-approvals"
              ref={scrollRef}
            >
              {filterList.map((item, index) => {
                return (
                  <FormField
                    key={index}
                    name={item}
                    label={t(item)}
                    component={AppAutoComplete}
                    labelClassName="!text-sm !font-semibold"
                  />
                );
              })}
            </div>
            <AppButton
              onPress={scrollDown}
              className="absolute bottom-0 right-0 w-6 h-6 flex items-center justify-center left-64 cursor-pointer p-0 m-0 bg-transparent"
              content={<ArrowDown2 size={8} variant="Bold" color="black" />}
            />
          </div>

          <div className="flex justify-end">
            <AppButton
              color="primary"
              size="md"
              radius="lg"
              className="text-white text-[16px] font-normal mr-[30px]"
              content={t("search")}
            />
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default ApprovalsFilter;
