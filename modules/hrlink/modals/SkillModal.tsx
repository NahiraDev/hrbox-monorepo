import { ArrowDown } from "iconsax-reactjs";
import { useState } from "react";
import { Chip } from "@heroui/react";
import {useFetchAllSkillsQuery, useFetchProfessionalSkillsQuery} from "@hrbox/modules/hrlink/apis";

export const SkillModal = () => {
    const [isOpenSkills, setIsOpenSkills] = useState<boolean>(false);
    const [isOpenIndustrial, setIsOpenIndustrial] = useState<boolean>(false);
    const [isOpenField, setIsOpenField] = useState<boolean>(false);

    const [selectedSkills, setSelectedSkills] = useState<any[]>([]);
    const [selectedIndustrial, setSelectedIndustrial] = useState<any[]>([]);
    const [selectedFields, setSelectedFields] = useState<any[]>([]);

    const { data: allSkillsData, isLoading: loadingSkills } = useFetchAllSkillsQuery(
        { page: 1, pageSize: 100 },
        { skip: false }
    );

    const { data: professionalSkillsData, isLoading: loadingProfessional } =
        useFetchProfessionalSkillsQuery(
            {
                skillIds: selectedSkills.map((s) => s.Id),
            },
            {
                skip: selectedSkills.length === 0,
            }
        );

    const skillsList = allSkillsData?.data || [];
    const industrialList = professionalSkillsData?.data || [];
    const availableFields = selectedIndustrial.flatMap((ind) => ind.Fields || []); // فرض: هر صنعتی فیلد داره

    const toggleSkills = () => setIsOpenSkills((prev) => !prev);
    const toggleIndustrial = () => setIsOpenIndustrial((prev) => !prev);
    const toggleField = () => setIsOpenField((prev) => !prev);

    const handleSkillSelect = (skill: any) => {
        const isAlreadySelected = selectedSkills.some((s) => s.Id === skill.Id);
        if (isAlreadySelected) {
            setSelectedSkills(selectedSkills.filter((s) => s.Id !== skill.Id));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleIndustrialSelect = (industrial: any) => {
        const isAlreadySelected = selectedIndustrial.some((i) => i.Id === industrial.Id);
        if (isAlreadySelected) {
            setSelectedIndustrial(selectedIndustrial.filter((i) => i.Id !== industrial.Id));
            // حذف فیلدهای مرتبط
            const fieldsToRemove = industrial.Fields?.map((f: any) => f.Name) || [];
            setSelectedFields(selectedFields.filter((f) => !fieldsToRemove.includes(f.Name)));
        } else {
            setSelectedIndustrial([...selectedIndustrial, industrial]);
        }
    };

    const handleFieldSelect = (field: any) => {
        const isAlreadySelected = selectedFields.some((f) => f.Name === field.Name);
        if (isAlreadySelected) {
            setSelectedFields(selectedFields.filter((f) => f.Name !== field.Name));
        } else {
            setSelectedFields([...selectedFields, field]);
        }
    };

    if (loadingSkills) return <div>در حال بارگذاری مهارت‌ها...</div>;

    return (
        <div className="space-y-6">
            {/* بخش مهارت‌ها */}
            <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">مهارت‌های اصلی*</span>
                <button
                    className="rounded-lg border border-secondary-300 bg-white p-3 flex justify-between items-center transition-all duration-300 overflow-hidden w-full text-right"
                    style={{ height: isOpenSkills ? "auto" : "50px", minHeight: "50px" }}
                    onClick={toggleSkills}
                >
                    <div className="flex gap-2 flex-wrap">
                        {skillsList.slice(0, isOpenSkills ? undefined : 5).map((skill: any) => {
                            const isSelected = selectedSkills.some((s) => s.Id === skill.Id);

                            return (
                                <Chip
                                    key={skill.Id}
                                    className={`cursor-pointer border transition hover:border-secondary-400 ${
                                        isSelected
                                            ? "bg-secondary-100 text-secondary-600 border-secondary-400"
                                            : "bg-gray-100 text-secondary-700 border-transparent"
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSkillSelect(skill);
                                    }}
                                >
                                    {skill.Name}
                                </Chip>
                            );
                        })}
                        {!isOpenSkills && skillsList.length > 5 && (
                            <span className="text-sm text-secondary-500">+{skillsList.length - 5} مورد دیگر</span>
                        )}
                    </div>
                    <div className={`transition-transform duration-300 ${isOpenSkills ? "rotate-180" : ""}`}>
                        <ArrowDown size={20} />
                    </div>
                </button>
            </div>

            {/* بخش صنعتی */}
            <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">حوزه صنعتی*</span>
                <button
                    disabled={selectedSkills.length === 0}
                    className={`rounded-lg border p-3 flex justify-between items-center transition-all duration-300 overflow-hidden w-full text-right ${
                        selectedSkills.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{ height: isOpenIndustrial ? "auto" : "50px", minHeight: "50px" }}
                    onClick={toggleIndustrial}
                >
                    <div className="flex gap-2 flex-wrap">
                        {loadingProfessional ? (
                            <span className="text-sm text-secondary-500">در حال بارگذاری...</span>
                        ) : industrialList.length === 0 ? (
                            <span className="text-sm text-secondary-500">ابتدا مهارت انتخاب کنید</span>
                        ) : (
                            industrialList.slice(0, isOpenIndustrial ? undefined : 5).map((industrial: any) => {
                                const isSelected = selectedIndustrial.some((i) => i.Id === industrial.Id);

                                return (
                                    <Chip
                                        key={industrial.Id}
                                        className={`cursor-pointer border transition hover:border-secondary-400 ${
                                            isSelected
                                                ? "bg-secondary-100 text-secondary-600 border-secondary-400"
                                                : "bg-gray-100 text-secondary-700 border-transparent"
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleIndustrialSelect(industrial);
                                        }}
                                    >
                                        {industrial.Name}
                                    </Chip>
                                );
                            })
                        )}
                    </div>
                    <div className={`transition-transform duration-300 ${isOpenIndustrial ? "rotate-180" : ""}`}>
                        <ArrowDown size={20} />
                    </div>
                </button>
            </div>

            {/* بخش فیلد */}
            <div className="flex flex-col gap-1">
                <span className="text-secondary-1000 font-inter">زمینه فعالیت*</span>
                <button
                    disabled={selectedIndustrial.length === 0}
                    className={`rounded-lg border p-3 flex justify-between items-center transition-all duration-300 overflow-hidden w-full text-right ${
                        selectedIndustrial.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{ height: isOpenField ? "auto" : "50px", minHeight: "50px" }}
                    onClick={toggleField}
                >
                    <div className="flex gap-2 flex-wrap">
                        {availableFields.length === 0 ? (
                            <span className="text-sm text-secondary-500">ابتدا حوزه صنعتی انتخاب کنید</span>
                        ) : (
                            availableFields.slice(0, isOpenField ? undefined : 5).map((field: any, index: number) => {
                                const isSelected = selectedFields.some((f) => f.Name === field.Name);

                                return (
                                    <Chip
                                        key={`${field.Name}-${index}`}
                                        className={`cursor-pointer border transition hover:border-secondary-400 ${
                                            isSelected
                                                ? "bg-secondary-100 text-secondary-600 border-secondary-400"
                                                : "bg-gray-100 text-secondary-700 border-transparent"
                                        }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFieldSelect(field);
                                        }}
                                    >
                                        {field.Name}
                                    </Chip>
                                );
                            })
                        )}
                    </div>
                    <div className={`transition-transform duration-300 ${isOpenField ? "rotate-180" : ""}`}>
                        <ArrowDown size={20} />
                    </div>
                </button>
            </div>

            {/* نمایش خلاصه انتخاب‌ها (اختیاری) */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm">
                <p>مهارت‌ها: {selectedSkills.map((s) => s.Name).join("، ")}</p>
                <p>صنعتی: {selectedIndustrial.map((i) => i.Name).join("، ")}</p>
                <p>فیلد: {selectedFields.map((f) => f.Name).join("، ")}</p>
            </div>
        </div>
    );
};