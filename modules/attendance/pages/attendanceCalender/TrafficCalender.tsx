import { Add, Edit, Hierarchy3, Trash } from "iconsax-reactjs";
import { AppButton } from "@hrbox/uikit/components";
import Comprehensivereport from "@hrbox/modules/attendance/pages/attendanceCalender/Comprehensivereport";
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { ModalSize, ModalType } from "@hrbox/core/providers";
import { useModal } from "../../../../core/hooks";
import AddPermisionTime from "../../modals/AddPermisionTime";
import { EventModal } from "../../modals/EventModal";
import { useTranslation } from "react-i18next";

const TrafficCalender = () => {
  const [openpopup,setOpenpopup]=useState<string | null>()
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const {t}=useTranslation()
  const modal=useModal()
  const [menuStyle, setMenuStyle] = useState<{ top: string; left: string }>({
    top: "0px",
    left: "0px",
  });
  const [IsReportHidden, setIsReportHidden] = useState<boolean>(false);
const menuRef=useRef<HTMLDivElement | null>(null);
  useEffect(()=>{
    const handleClickOutSide=(event:MouseEvent)=>{
      if(menuRef.current && !menuRef.current.contains(event.target as Node)){
        setOpenMenu(null)
      }
    }
    if(openMenu){
      document.addEventListener("mousedown",handleClickOutSide);
    }
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutSide)
    }
  },[openMenu])
  const toggleMenu = (rowindex: number, cellType: string,e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const key = `${rowindex}-${cellType}`;
    if (openMenu === key) {
      setOpenMenu(null);
    } else {
      setOpenMenu(key);
      const element = cellRefs.current[key];
      if (element) {
        const rect = element.getBoundingClientRect();
        const isShift = key.includes("shift");
        const offset = 5;
        const menuHeight = isShift ? 170 : 140;
        const viewportHeight = window.innerHeight;
        if (rect.bottom + offset + menuHeight > viewportHeight) {
          setMenuStyle({
            top: `${rect.top - menuHeight - offset}px`,
            left: `${rect.left}px`,
          });
        } else {
          setMenuStyle({
            top: `${rect.bottom + offset}px`,
            left: `${rect.left}px`,
          });
        }
      }
    }
  };

    const handleOpenModal = (
      formid: string,
      modalComponent: any,
      titleModal: string
    ) => {
      modal.open(
        ModalType.CREATE,
        formid,
        modalComponent,
        {
          isForm: true,
          title: titleModal,
          icon: <Hierarchy3 size={18} />,
          submitLabel: "Submit",
          cancelLabel: "Cancel",
          formConfig: {
            formId: formid,
          },
        },
        ModalSize["4XL"]
      );
    };

  return (
    <>
      <div
        className={`${IsReportHidden ? "h-full w-full" : "flex flex-row gap-3 h-full w-full"}`}
      >
        {!IsReportHidden && (
          <div className="w-[80%] border border-primary rounded-xl py-4 px-3">
            {/* start table */}
            <div className="w-full flex flex-col h-full ">
              {/* start Header */}
              <div className="grid grid-cols-12 gap-2 text-white text-sm ">
                <div className="bg-[#999999] px-2 py-3 rounded-lg w-full col-span-2">
                  <p>{t("date")}</p>
                </div>
                <div className="bg-[#999999] px-2 py-3 rounded-lg col-span-1">
                  <p>{t("shift")}</p>
                </div>
                <div className="grid col-span-7 grid-cols-7 bg-primary rounded-lg w-full gap-2.5">
                  <div className="px-2 py-3 w-full">
                    <p>{t("check-in")}</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>{t("check-out")}</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>{t("presence")}</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>{t("overdue")}</p>
                  </div>
                  <div className="px-2 py-3 w-full">
                    <p>{t("delay")}</p>
                  </div>
                  <div className="px-2 py-3 w-full col-span-2">
                    <p>{t("haste-to-leave")}</p>
                  </div>
                </div>
                <div className="px-2 py-3 w-full bg-success rounded-lg col-span-2">
                  <p>{t("request")}</p>
                </div>
              </div>
              {/* end Header */}

              {/* start Rows */}
              <div className="grid w-full gap-1 overflow-y-scroll h-full custom-scroll-table">
                {/* start row */}
                <div className="rounded-md">
                  <div className="grid grid-cols-12 gap-2 w-full text-xs text-[#1E3363] dark:text-[#DEE1E8] items-center text-center hover:bg-[#DCF0F9] dark:hover:bg-[#04425C60] rounded-md ">
                    <div
                      className="col-span-2 p-1 border-b-1 border-white dark:border-[#01101A] items-center text-start! relative">
                      <p>11/02/2025</p>
                      <p>Wednesday (Present)</p>
                    </div>
                    <div
                      ref={(el) => {
                        if (el) cellRefs.current[`0-shift`] = el;
                      }}
                      className="col-span-1 px-2 py-3 border-b-1 border-white dark:border-[#01101A] items-center cursor-pointer"
                      onContextMenu={(e) => toggleMenu(0, "shift",e)}
                      onMouseEnter={() => setOpenpopup(`${1}-shift`)}
                      onMouseLeave={() => setOpenpopup(null)}
                    >
                      <Popover placement="top" showArrow={true} isOpen={openpopup===`${1}-shift`}>
                        <PopoverTrigger>
                      <p>12354</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className=" h-auto ">
                          <p className="text-[10px] text-[#1E3363]">zahra pakniyat</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid grid-cols-7 col-span-7 border-b-1 border-white dark:border-[#01101A] items-center">
                      <div className="px-2 py-3"
                      onMouseEnter={() => setOpenpopup(`${1}-checkin`)}
                      onMouseLeave={() => setOpenpopup(null)}>
                        <Popover placement="top" showArrow={true} isOpen={openpopup===`${1}-checkin`}>
                        <PopoverTrigger>
                        <p>09:00</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className=" h-auto ">
                          <p className="text-[10px] text-[#1E3363]">zahra pakniyat</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                      </div>
                      <div className="px-2 py-3"
                      onMouseEnter={() => setOpenpopup(`${1}-checkout`)}
                      onMouseLeave={() => setOpenpopup(null)}>
                        <Popover placement="top" showArrow={true} isOpen={openpopup===`${1}-checkout`}>
                        <PopoverTrigger>
                        <p>17:00</p>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className=" h-auto ">
                          <p className="text-[10px] text-[#1E3363]">zahra pakniyat</p>
                          </div>
                        </PopoverContent>
                      </Popover>
                      </div>
                      <div className="px-2 py-3">
                        <p>08:00</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>01:00</p>
                      </div>
                      <div className="px-2 py-3">
                        <p>00:00</p>
                      </div>
                      <div className="px-2 py-3 col-span-2 text-center">
                        <p>00:00</p>
                      </div>
                    </div>
                    <div className="col-span-2 px-2 py-3 h-full border-b-1 border-white dark:border-[#01101A]">
                      <p>-</p>
                    </div>
                  </div>
                </div>
                {/* end row */}
              </div>
              {/* end Rows */}
            </div>
            {/* end table */}
          </div>
        )}
        {/* start menu button */}
        {openMenu && (
          <div
          ref={menuRef}
            className="fixed px-4 py-2 bg-white rounded-md z-50 shadow-lg"
            style={{
              top: menuStyle.top,
              left: menuStyle.left,
            }}
            onClick={() => setOpenMenu(null)}
          >
            <div className="flex flex-col items-start gap-1.5">
              {openMenu.includes("shift") && (
                    <React.Fragment key="shift-menu">
                <AppButton
                  content={t("hourly-leave")}
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Daily_Leave"
                  onPress={()=>handleOpenModal("event-form",<EventModal/>,"Add Time")}
                />
                <AppButton
                  content={t("hourly-mission")}
                  startContent={<Add size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Daily_Mission"
                  onPress={()=>handleOpenModal("event-form",<EventModal/>,"Add Time")}
                />
                <AppButton
                  content={t("edit-traffic-entry")}
                  startContent={<Edit size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  key="Edit_Traffic_Entry"
                  size=""
                  onPress={()=>handleOpenModal("permision-form",<AddPermisionTime/>,"Add Permision Time")}
                />
                <AppButton
                  content={t("delete-traffic-entry")}
                  startContent={<Trash size={18} />}
                  className="gap-1.5 text-sm dark:bg-[#01101A]!"
                  size=""
                  key="Delete_Request"
                />
              </React.Fragment>
              ) }
            </div>
          </div>
        )}
        {/* end menu button */}
        <Comprehensivereport
          isExpanded={IsReportHidden}
          onToggle={() => setIsReportHidden(!IsReportHidden)}
        />
      </div>
    </>
  );
};

export default TrafficCalender;