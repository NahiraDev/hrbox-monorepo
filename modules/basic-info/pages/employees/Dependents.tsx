import { Card } from "@heroui/react";
import { dataWorker2, dataWorker, Spouse } from "@module/basic-info/app/mock";
import { AppButton, AppDeleteModal } from "@hrbox/uikit/components";
import {
  Settings,
  Trash,
  Calendar,
  User,
  GpsSlash,
  Call,
  Heart,
  ProfileTick,
  Profile2User,
  MessageEdit,
  Add,
  UserSquare,
  People,
} from "iconsax-reactjs";
import { useModalContext } from "@hrbox/core/providers/ModalProvider";
import { BasicInfoLayout } from "@hrbox/modules/basic-info/components";
import { RelativesModal } from "@hrbox/modules/basic-info/modals/RelativesModal";
import { SpouseModal } from "@hrbox/modules/basic-info/modals/SpouseModal";
import { DependentsModal } from "@hrbox/modules/basic-info/modals/DependentsModal";

const Dependents = () => {
  const { openModal } = useModalContext();

  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-2 gap-10">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col ">
              <div className="flex items-center justify-between w-full py-4">
                <div className="flex items-center gap-2 ">
                  <Profile2User />
                  <span className="text-lg font-bold">Spouse</span>
                </div>
                <div className="flex items-center gap-2">
                  <AppButton
                    props={{
                      size: "xs",
                      radius: "sm",
                      color: "white",
                      variant: "solid",
                      isIconOnly: true,
                      className: "bg-white border-1 border-primary p-2",
                      content: (
                        <MessageEdit className="text-secondary-900" size="20" />
                      ),
                    }}
                  />
                  <AppButton
                    props={{
                      size: "xs",
                      radius: "sm",
                      color: "white",
                      variant: "solid",
                      isIconOnly: true,
                      onPress: () =>
                        openModal(
                          "edit",
                          "",
                          <SpouseModal />,
                          undefined,
                          "xl",
                          "Spouse",
                          <Profile2User className="text-white" />,
                        ),
                      className: "bg-white border-1 border-primary p-2",
                      content: <Add className="text-secondary-900" size="20" />,
                    }}
                  />
                </div>
              </div>
              <div className="w-full overflow-y-scroll">
                {Spouse.map((user: any, index) => (
                  <Card
                    key={index}
                    className="p-3 w-full h-full shadow-light-tight-1 bg-white "
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm gap-2 items-center">
                          <GpsSlash size="20" />
                          <span className="font-light">First Name</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.firstName}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-2 items-center">
                          <Call size="20" />
                          <span className="font-light">Last Name</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.lastName}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-2 items-center">
                          <User size="20" />
                          <span className="font-light">Job Title</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.job}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-2 items-center">
                          <Calendar size="20" />
                          <span className="font-light">National ID</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.id}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-2 items-center">
                          <Heart size="20" />
                          <span className="font-light">Education</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.education}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm  gap-2 items-center">
                          <Calendar size="20" />
                          <span className="font-light">Relation</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.mobile}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-3 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex text-sm gap-2 items-center">
                          <ProfileTick size="20" />
                          <span className="font-light">Date of Birth</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.birth}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-between w-full py-4">
                <div className="flex items-center gap-2">
                  <Profile2User />
                  <span className="!text-lg !font-bold">Dependents</span>
                </div>
                <div className="flex items-center gap-2">
                  <AppButton
                    props={{
                      size: "xs",
                      radius: "sm",
                      color: "white",
                      variant: "solid",
                      isIconOnly: true,
                      onPress: () =>
                        openModal(
                          "edit",
                          "",
                          <DependentsModal />,
                          undefined,
                          "xl",
                          "Dependents",
                          <UserSquare className="text-white" />,
                        ),
                      className: "bg-white border-1 border-primary p-2",
                      content: <Add className="text-secondary-900" size="20" />,
                    }}
                  />
                </div>
              </div>
              <div className="w-full overflow-y-scroll h-screen">
                {dataWorker.map((user: any, index) => (
                  <Card
                    key={index}
                    className="p-3 w-full  shadow-light-tight-1 bg-white "
                  >
                    <div className="flex flex-col gap-2 ">
                      <div className="flex justify-between border-b border-gray-200 p-1.5">
                        <div className="flex items-center text-lg font-semibold">
                          <User />
                          <span>{user.worker}</span>
                        </div>
                        <div className="flex gap-1">
                          <div>
                            <AppButton
                              props={{
                                size: "xs",
                                radius: "sm",
                                variant: "light",
                                isIconOnly: true,
                                onPress: () =>
                                  openModal(
                                    "delete",
                                    "",
                                    <AppDeleteModal />,
                                    undefined,
                                    "lg",
                                    "Do you want to remove it?",
                                    <Trash className="text-white" />,
                                  ),
                                content: (
                                  <Trash className="text-secondary-1000 group-hover:text-white" />
                                ),
                                className:
                                  "p-2 hover:!bg-red-500 transition-all duration-200",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center ">
                          <Settings size="20" />
                          <span>job</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.job}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center ">
                          <Calendar size="20" />
                          <span>National ID</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Education</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Mobile</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Date of Birth</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Relation</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between w-full py-4">
              <div className="flex items-center gap-2">
                <Profile2User />
                <span className="!text-lg !font-bold">Relatives</span>
              </div>
              <div className="flex items-center gap-2">
                <AppButton
                  props={{
                    size: "xs",
                    radius: "sm",
                    color: "white",
                    variant: "solid",
                    isIconOnly: true,
                    onPress: () =>
                      openModal(
                        "edit",
                        "",
                        <RelativesModal />,
                        undefined,
                        "xl",
                        "Relatives",
                        <People className="text-white" />,
                      ),
                    className: "bg-white border-1 border-primary p-2",
                    content: <Add className="text-secondary-900" size="20" />,
                  }}
                />
              </div>
            </div>
            <div className="overflow-y-scroll h-screen">
              <div className="grid grid-cols-2 gap-4 w-full ">
                {dataWorker2.map((user: any, index) => (
                  <Card
                    key={index}
                    className="p-3 w-full h-full shadow-light-tight-1 bg-white "
                  >
                    <div className="flex flex-col gap-2 ">
                      <div className="flex justify-between border-b border-gray-200 p-1">
                        <div className="flex items-center gap-3 text-lg font-semibold ">
                          <User />
                          <span>{user.worker}</span>
                        </div>
                        <div className="flex gap-1">
                          <div>
                            <AppButton
                              props={{
                                size: "xs",
                                radius: "sm",
                                variant: "light",
                                isIconOnly: true,
                                onPress: () =>
                                  openModal(
                                    "delete",
                                    "",
                                    <AppDeleteModal />,
                                    undefined,
                                    "lg",
                                    "Do you want to remove it?",
                                    <Trash className="text-white" />,
                                  ),
                                content: (
                                  <Trash className="text-secondary-1000 group-hover:text-white" />
                                ),
                                className:
                                  "p-2 hover:!bg-red-500 transition-all duration-200",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Settings size="20" />
                          <span>job</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.job}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>National ID</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Education</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Mobile</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Date of Birth</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                      <div className="flex text-xs gap-0.5 items-center justify-between  w-full border border-[#DCF0F9]/40 rounded-5 p-1.5 bg-gradient-to-r from-white via-sky-100 to-white">
                        <div className="flex gap-2 items-center">
                          <Calendar size="20" />
                          <span>Relation</span>
                        </div>
                        <div className="font-semibold">
                          <span>{user.num}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Dependents;
