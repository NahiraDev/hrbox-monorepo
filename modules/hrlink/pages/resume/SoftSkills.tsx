import {Edit, Trash} from "iconsax-reactjs";
import {AppButton, AppPagination} from "@hrbox/uikit/components";
import {Card, CardBody, CardHeader} from "@heroui/react";

import {
    GeneralInformation,
} from "@hrbox/modules/hrlink/components/GeneralInformation";
import {AppDoubleLineProgress} from "@hrbox/uikit/sections/AppDoubleLineProgress";

import {SoftSkillsIcon} from "@hrbox/uikit/icons";
import {UserLocation} from "@hrbox-monorepo/modules/hrlink/components/UserLocation";
import {useFetchSoftSkillsQuery} from "@hrbox-monorepo/modules/hrlink/apis";

const SoftSkills = () => {
    const {data: softSkills} = useFetchSoftSkillsQuery()
    return (
        <div className="grid grid-cols-4 gap-3 h-full">
            <div className="col-span-3">
                <div className="flex flex-col h-full justify-between">
                    <div className="grid grid-cols-3 gap-3">
                        {softSkills &&
                            softSkills.data.map((skill: any, index: number) => (
                                <Card key={index} className="rounded-lg shadow-theme-sm p-4">
                                    <CardHeader className="flex flex-col gap-1.5">
                                        <div className="flex justify-between">
                                            <div className="flex gap-1.5">
                                                <SoftSkillsIcon/>
                                                <span className="font-semibold text-secondary-1000">
                          {skill.name}
                        </span>
                                            </div>
                                            <div className="flex gap-1">
                                                <AppButton
                                                    props={{
                                                        color: "white",
                                                        size: "md",
                                                        radius: "sm",
                                                        content: (
                                                            <Edit className="text-secondary-1000" size="14"/>
                                                        ),
                                                    }}
                                                />
                                                <AppButton
                                                    props={{
                                                        color: "white",
                                                        size: "md",
                                                        radius: "sm",
                                                        content: (
                                                            <Trash
                                                                className="text-secondary-1000"
                                                                size="14"
                                                            />
                                                        ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="flex flex-col gap-2">
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex gap-4">
                          <span className="text-secondary-1000 text-sm font-light">
                            Level:
                          </span>
                                                    <span className="text-secondary-1000 text-sm font-normal">
                            {skill.level}
                          </span>
                                                </div>
                                                <div className="flex gap-4">
                          <span className="text-secondary-1000 text-sm font-light">
                            Grad:
                          </span>
                                                    <span className="text-secondary-1000 text-sm font-normal">
                            {skill.grade}%
                          </span>
                                                </div>
                                            </div>
                                            <div>
                                                <AppDoubleLineProgress value={skill.grade}/>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                    </div>
                    <div className="flex justify-center">
                        {/*<AppPagination />*/}
                    </div>
                </div>
            </div>
            <div className="col-span-1 flex flex-col gap-3">
                <GeneralInformation/>
                <UserLocation/>
            </div>
        </div>
    );
};

export default SoftSkills;
