import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import { useTranslation } from "react-i18next";

import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import { AppInput } from "@/components/AppInput.tsx";
import AppCheckbox from "@/components/AppCheckbox.tsx";

const CalculationComputationalCoefficients = () => {
  const { t } = useTranslation();

  const DUMMY_ELEMAN = [
    { id: 1, label: "Ali Rezaei" },
    { id: 2, label: "Sara Mohammadi" },
    { id: 3, label: "Hossein Karimi" },
    { id: 4, label: "Fatemeh Ghasemi" },
    { id: 5, label: "Mohammad Taheri" },
    { id: 6, label: "Narges Jafari" },
    { id: 7, label: "Ehsan Rahimi" },
    { id: 8, label: "Leila Kazemi" },
    { id: 9, label: "Reza Shokri" },
    { id: 10, label: "Maryam Ahmadi" },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        <div className="text-secondary-400 dark:text-secondary-0 mb-2">
          {t("computationalCoefficients")}
        </div>

        <div
          className={`bg-white dark:bg-info-1000 pb-4 h-full !rounded-[14px]`}
        >
          <Table
            className="!h-[95%]"
            classNames={{
              th: `first:pl-9 last:pr-9 px-7`,
            }}
          >
            <TableHeader className="!rounded-0">
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("no")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("title")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("eleman")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("coefficient")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("fixedNumber")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("tax")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("insurance")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("calculationInEid")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("years")}
              </TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow
                className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
              >
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  1
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  {t("overtime")}
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppAutoComplete
                    props={{
                      radius: "none",
                      classNames: {
                        base: `!shadow-none !rounded-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: "!text-netural-400",
                      },
                      data: DUMMY_ELEMAN,
                      name: "eleman",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "coefficient",
                      value: "",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "fixedNumber",
                      value: "",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
              >
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  2
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  {t("nightShift")}
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppAutoComplete
                    props={{
                      radius: "none",
                      classNames: {
                        base: `!shadow-none !rounded-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: "!text-netural-400",
                      },
                      data: DUMMY_ELEMAN,
                      name: "eleman",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "coefficient",
                      value: "",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "fixedNumber",
                      value: "",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
              >
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  3
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  {t("holidayWork")}
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppAutoComplete
                    props={{
                      radius: "none",
                      classNames: {
                        base: `!shadow-none !rounded-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: "!text-netural-400",
                      },
                      data: DUMMY_ELEMAN,
                      name: "eleman",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "coefficient",
                      value: "",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "fixedNumber",
                      value: "",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
              >
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  4
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  {t("mission")}
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppAutoComplete
                    props={{
                      radius: "none",
                      classNames: {
                        base: `!shadow-none !rounded-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: "!text-netural-400",
                      },
                      data: DUMMY_ELEMAN,
                      name: "eleman",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "coefficient",
                      value: "",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "fixedNumber",
                      value: "",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
              >
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  5
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  {t("fridayWork")}
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppAutoComplete
                    props={{
                      radius: "none",
                      classNames: {
                        base: `!shadow-none !rounded-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: "!text-netural-400",
                      },
                      data: DUMMY_ELEMAN,
                      name: "eleman",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "coefficient",
                      value: "",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "fixedNumber",
                      value: "",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
              >
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  6
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  {t("hourlyMission")}
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppAutoComplete
                    props={{
                      radius: "none",
                      classNames: {
                        base: `!shadow-none !rounded-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: "!text-netural-400",
                      },
                      data: DUMMY_ELEMAN,
                      value: "",
                      name: "eleman",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "coefficient",
                      value: "",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppInput
                    props={{
                      classNames: {
                        inputWrapper: `!rounded-none !shadow-none border-1 border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]`,
                        input: `!text-netural-400`,
                      },
                      type: "number",
                      name: "fixedNumber",
                      value: "",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>

                <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                  <AppCheckbox
                    props={{
                      radius: "sm",
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CalculationComputationalCoefficients;
