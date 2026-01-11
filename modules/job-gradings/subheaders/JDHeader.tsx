import { useTranslation } from "react-i18next";
import { AppPageTitle } from "@hrbox/uikit/components/AppPageTitle";
import {
    AppButton,
    AppSearchInput,
    AppCheckBox,
} from "@hrbox/uikit/components";
import { Add } from "iconsax-reactjs";
import { useAppDispatch, useAppSelector } from "@hrbox/core/redux";
import {
    toggleShowGraded,
    toggleShowNoGrade,
} from "@hrbox/core/redux/slices/JDFilterSlice";
import { setSearchQuery } from "@hrbox/core/redux/slices/searchSlice";

const JDHeader = ({ title, icon }: any) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { showGraded, showNoGrade } = useAppSelector(
        (state) => state.jdFilter
    );
    const searchQuery = useAppSelector((state) => state.search.query);

    return (
        <div className="w-full flex justify-between items-center">
            <AppPageTitle title={t("JDList")} icon={icon} />

            <div className="flex items-center gap-4">
                {/* Graded */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <AppCheckBox
                        checked={showGraded}
                        onChange={() => dispatch(toggleShowGraded())}
                    />
                    <span className="h-3 w-3 rounded-full bg-green-500" />
                    {t("graded")}
                </label>

                {/* No Grade */}
                <label className="flex items-center gap-2 cursor-pointer">
                    <AppCheckBox
                        checked={showNoGrade}
                        onChange={() => dispatch(toggleShowNoGrade())}
                    />
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    {t("no_grade")}
                </label>

                {/* Search */}
                <AppSearchInput
                    defaultValue={searchQuery}
                    placeholder={t("search")}
                    onSearch={(query) => {
                        dispatch(setSearchQuery(query.trim())); // onSearch برای مواردی که Enter زده شد
                    }}
                    onChangeQuery={(query) => {
                        dispatch(setSearchQuery(query.trim())); // onChange برای هر تایپ
                    }}
                />

                {/* Add */}
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
