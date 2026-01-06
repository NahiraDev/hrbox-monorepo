import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";
import { AppButton, AppSearchInput, AppCheckBox } from "@hrbox/uikit/components";
import { Add } from "iconsax-reactjs";
import { useAppDispatch, useAppSelector } from "@hrbox/core/redux";
import {
    toggleShowGraded,
    toggleShowNoGrade,
} from "@hrbox/core/redux/slices/JDFilterSlice";

const JDHeader = ({ title, icon }: any) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { showGraded, showNoGrade } = useAppSelector(
        (state) => state.jdFilter
    );

    return (
        <div className="w-full flex justify-between items-center">
            <AppPageTitle title={t(title)} icon={icon} />

            <div className="flex items-center gap-4">
                {/* Graded */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <AppCheckBox
                        checked={showGraded}
                        onChange={() => dispatch(toggleShowNoGrade())}
                    />

                    {t("Graded")}
                </label>

                {/* No Grade */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <AppCheckBox
                        checked={showNoGrade}
                        onChange={() => dispatch(toggleShowGraded())}
                    />

                    {t("No Grade")}
                </label>

                <AppSearchInput />

                <AppButton
                    color="white"
                    size="md"
                    radius="lg"
                    startContent={<Add size={22} />}
                    className="border-1 border-primary"
                    content={t("add_new_one")}
                />
            </div>
        </div>
    );
};

export default JDHeader;
