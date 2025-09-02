// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

import { DashboardLayout } from "@/pages/Dashboard/Layout.tsx";
// import ResumeChart from "@/components/AppChart.tsx";
// import ResumeCompletion from "@/components/AppResumeComplation.tsx";
// import AppJobOpportunities from "@/components/AppJobOppertunities.tsx";
// import { AppMap } from "@/components/AppMap.tsx";
// import { AppGeneralDetails } from "@/components/AppGeneralDetails.tsx";
// import { AppDispatch } from "@/redux/store.ts";
// import { handleFetchDashboardDataApi } from "@/services/Dashboard/apis.ts";
// import closeicon from "@/icons/closeIcon"
import { Add, Chart, SearchNormal, Setting4 } from "iconsax-react";
import { useTranslation } from "react-i18next";
import AppDocs from "@/components/AppDocs.tsx";
import { useState } from "react";
import { ProcessModal } from "@/pages/Process/ProcessModal.tsx";
import { AddEventModal } from "@/pages/Process/AddEventModal.tsx";
import { AddActionsModall } from "@/pages/Process/AddActionsModal.tsx";
import { AddPointModall } from "@/pages/Process/AddPointModall.tsx";
import { AddActionsShow } from "@/pages/Process/AddActionsShow.tsx";
import { EventModall } from "@/pages/Process/EventModal.tsx";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [editModal, setEditModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addEvent, setAddEvent] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<boolean>(false);
  const [showEvent, setShowEvent] = useState<boolean>(false);
  const [actionsModal, setActionsModal] = useState<boolean>(false);
  const [addPoint, setAddPoint] = useState<boolean>(false);
  const [addactionsShow, setAddActionsShow] = useState<boolean>(false);
  const [addpointShow, setAddPointShow] = useState<boolean>(false);
  const [eventModall, setEventModal] = useState<boolean>(false);
  const [showEventModall, setShowEventModal] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row-reverse justify-between ">
        <div
          className={
            i18n.language === "en"
              ? "flex flex-row-reverse"
              : "flex flex-row"
          }
        >
          <button
            className={` px-[12px] py-[6px] border-[1px] border-solid dark:bg-[#01101A] dark:border-[#0D4D6A] border-[#0A9AD7] rounded-[8px] bg-white flex-row flex items-center ${i18n.language === "en" ? "" : ""} `}
          >
                    <span className={i18n.language === "en" ? "mr-2" : "ml-2"}>
                      <Add />
                    </span>
            {t("add_new_one")}
          </button>
          <button className="p-[8px] border-[1px] border-solid border-[#0A9AD7] rounded-[8px] mx-[4px] dark:bg-[#01101A] dark:border-[#0D4D6A] bg-white">
            <Setting4 />
          </button>
          <button className="p-[8px] border-[1px] border-solid border-[#0A9AD7] rounded-[8px] dark:bg-[#01101A] dark:border-[#0D4D6A] bg-white">
            <SearchNormal />
          </button>
        </div>
        <div className="flex">
          <button className="px-[12px] py-[6px] rounded-[8px] text-white dark:bg-[#0D4D6A] bg-[#0A9AD7] flex items-center  ">
                    <span
                      className={`${i18n.language === "en" ? "mr-[8px]" : "ml-[8px]"}`}
                    >
                      <Chart />
                    </span>{" "}
            {t("dashboard")}
          </button>
        </div>
      </div>
      <div className="flex w-[100%] mt-[15px] h-full dark:border-[#0D4D6A] dark:bg-[rgba(4,66,92,0.60)] bg-[#DCF0F9] border-[1px] border-solid rounded-[12px] border-[#0A9AD7] ">
        <div className="flex gap-3">
          <button onClick={() => setEditModal(true)}>
            Edit Starting Point
          </button>
          <ProcessModal
            isOpen={editModal}
            headerText={"edit_starting_point"}
            onClose={() => setEditModal(false)}
            buttonText={"save_changes"}
            data={{
              title: "My Process",
              type: 2,
              newBuiltForms: "Form X",
              workflowImplementation: "Workflow Y",
              cartableStartType: "Auto",
              description: "This is a description",
              id: "1",
              notification: 1,
            }}
          />
          <button onClick={() => setShowModal(true)}>showModal</button>
          <ProcessModal
            isOpen={showModal}
            headerText={"starting_point"}
            showFooter={false}
            onClose={() => setShowModal(false)}
            disabledForm={true}
          />
          <button onClick={() => setAddEvent(true)}>
            AddEventModal
          </button>
          <AddEventModal
            headerText="add_event"
            buttonText="submit"
            isOpen={addEvent}
            onClose={() => setAddEvent(false)}
          />{" "}
          <button onClick={() => setEventModal(true)}>
            EventModall
          </button>
          <EventModall
            isOpen={eventModall}
            onClose={() => setEventModal(false)}
            headerText="add_event"
          />{" "}
          <button onClick={() => setShowEventModal(true)}>
            ShowEventModall
          </button>
          <EventModall
            isOpen={showEventModall}
            onClose={() => setShowEventModal(false)}
            disabledForm={true}
            showFooter={false}
          />{" "}
          <button onClick={() => setEditEvent(true)}>
            EditEventModal
          </button>
          <AddEventModal
            headerText="edit_event"
            buttonText="save_changes"
            isOpen={editEvent}
            onClose={() => setEditEvent(false)}
          />{" "}
          <button onClick={() => setShowEvent(true)}>
            ShowEventModal
          </button>
          <AddEventModal
            headerText="edit_event"
            buttonText="save_changes"
            isOpen={showEvent}
            showModal={true}
            showFooter={false}
            onClose={() => setShowEvent(false)}
            disabled={true}
          />{" "}
          <button onClick={() => setActionsModal(true)}>
            AddActionModal
          </button>
          <AddActionsModall
            isOpen={actionsModal}
            onClose={() => setActionsModal(false)}
          />
          <button onClick={() => setAddActionsShow(true)}>
            AddActionsShow
          </button>
          <AddActionsShow
            isOpen={addactionsShow}
            onClose={() => setAddActionsShow(false)}
          />
          <button onClick={() => setAddPoint(true)}>
            AddPointModall
          </button>
          <AddPointModall
            isOpen={addPoint}
            onClose={() => setAddPoint(false)}
          />
          <button onClick={() => setAddPointShow(true)}>
            AddPointShow
          </button>
          <AddPointModall
            isOpen={addpointShow}
            onClose={() => setAddPointShow(false)}
            disabledForm={true}
            showFooter={false}
          />
        </div>
      </div>
      <AppDocs />
    </div>
  );
}
