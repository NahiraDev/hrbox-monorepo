import { AppButton, AppInput } from "@hrbox/uikit/components";
import "../../app/index.css";
import { ArrowLeft2, ArrowRight2, InfoCircle } from "iconsax-reactjs";
import { Tooltip } from "@heroui/react";
import { isExpanded } from "bpmn-js/lib/util/DiUtil";
import { useTranslation } from "react-i18next";
const Comprehensivereport = ({ isExpanded, onToggle }) => {
  const {t}=useTranslation();
  const inputs = [
    "total_daily_working_hours",
    "Shift_overtime",
    "work_on_a_holiday",
    "remaining_leave_until_today",
    "total_hourly_attendance_hours",
    "approved_overtime",
    "working_on_a_confirmed_holiday",
    "remaining_leave_this_month",
    "fingerprint_attendance",
    "unapproved_overtime",
    "working_on_a_holiday_is_not_approved",
    "daily_leave_used",
    "attendance_and_absence_system_(IP/GPS)",
    "work_on_friday",
    "absence",
    "hourly_leave_used",
    "manual_human_resources_attendance",
    "work_confirmed_on_friday",
    "lack_of_working_hours",
    "daily_mission/task",
    "number_of_attendance_deficiencies",
    "work_not_confirmed_on_friday",
    "delay_in_arrival",
    "hourly_mission/task",
    "night_shift_work",
    "hourly_mission",
    "night_overtime",
    "approved_night_overtime_(closed)",
    "unapproved_night_overtime_(closed)",
    "approved_night_overtime_(Friday)",
    "unconfirmed_night_overtime_(Friday)",
    "unconfirmed_night_overtime_(Friday)",
  ];
  return (
    <>
      <div
        className={`bg-surface-50 flex h-full flex-col items-center rounded-xl p-3 font-sans ${isExpanded ? "w-full" : "border-primary w-[20%] border-1"} `}
      >
        <div className="flex w-full justify-start border-b border-neutral-100">
          <p className="mb-1 text-lg! font-bold! font-open-sans!">
            {t("comprehensive_report")}
          </p>
          <AppButton
            content={
              isExpanded ? <ArrowLeft2 size={14} /> : <ArrowRight2 size={14} />
            }
            size="xs"
            className="flex items-center justify-center w-6 h-[28.381px] fixed right-13 top-63 shadow-sm "
            isIconOnly={true}
            radius="full"
            onPress={onToggle}
          />
        </div>
        <div className="custom-scroll overflow-y-scroll pr-1 w-full">
          <div
            className={
              isExpanded
                ? "flex flex-wrap justify-between gap-x-14 gap-y-5 pt-4.5"
                : "mt-3.5 mr-2.5 flex flex-col justify-center gap-4"
            }
          >
            {inputs.map((label, index) => (
              <div
                key={index}
                className={`relative ${isExpanded ? "w-[20%]" : "w-full"}`}
              >
                <AppInput
                  name="title"
                  label={t(label)}
                  size="lg"
                  radius="lg"
                  className="bg-[linear-gradient(90deg,var(--Surface-Main,#FFF)_5%,#DDEEFA_50%,var(--Surface-Main,#FFF)_95%)] "
                  endContent={
                    <Tooltip
                      classNames={{
                        base: "z-999 flex w-[200px] flex-col gap-2 rounded-lg",
                        content: "border border-orange-400",
                      }}
                      content={
                        <div className="gap-2 p-2 rounded-lg">
                          <div className="flex w-full flex-row gap-1">
                            <span>
                              <InfoCircle color="#FD8F02" size={16} />
                            </span>
                            <p className="text-xs font-bold">
                              Total Number of All Attendance Days This Month
                            </p>
                          </div>
                          <div>
                            <p className="text-secondary-1000 text-sm!">
                              <span className="text-xs! font-bold! text-orange-400">
                                Note1:{" "}
                              </span>
                              Days without shifts are not included in this list.
                              <span className="text-xs! font-bold! text-orange-400">
                                Note2:{" "}
                              </span>
                              Monthly working hours refer to the total of
                              attendance days + official holidays + Fridays +
                              leaves + daily missions.
                            </p>
                          </div>
                        </div>
                      }
                      placement={"bottom-end"}
                      offset={10}
                    >
                      <span className="cursor-pointer">
                        <InfoCircle color="#FD8F02" size={18} />
                      </span>
                    </Tooltip>
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Comprehensivereport;
