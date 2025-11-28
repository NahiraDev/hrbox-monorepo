import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";
import { Tooltip } from "@heroui/tooltip";
import { Edit, Trash } from "iconsax-react";
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { CloseIcon } from "@/icons/CloseIcon.tsx";
import { AppAutoComplete } from "@/components/AppAutoComplete.tsx";
import { AppInput } from "@/components/AppInput.tsx";
import AppCheckbox from "@/components/AppCheckbox.tsx";

const ComputationalCoefficients = ({ props }: { props: any }) => {
  const { data } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editableRowId, setEditableRowId] = useState<number | null>(null);
  const [rowsData, setRowsData] = useState(data);

  const handleInputChange = (id: number, field: string, value: any) => {
    setRowsData((prev: any) =>
      prev.map((row: any) =>
        (row.id ?? row.index) === id ? { ...row, [field]: value } : row,
      ),
    );
  };

  const DUMMY_PARAMETERS = [
    { id: 1, label: "Legal" },
    { id: 2, label: "Illegal" },
    { id: 3, label: "Conditionally Legal" },
    { id: 4, label: "Under Review" },
    { id: 5, label: "Unknown" },
  ];

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

  if (!data.length) return <div className="p-4">No data available</div>;
  const renderActions = (rowId: number) => (
    <div className="relative flex items-center justify-center gap-2">
      <Tooltip content="Edit">
        <Button
          className="!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent"
          onPress={() => {
            setEditableRowId((prev) => (prev === rowId ? null : rowId));
          }}
        >
          <span className="text-lg cursor-pointer">
            <Edit size="16" />
          </span>
        </Button>
      </Tooltip>
      <Tooltip content="Delete">
        <Button
          className="!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent"
          onPress={onOpen}
        >
          <span className="text-lg cursor-pointer">
            <Trash size="16" />
          </span>
        </Button>
      </Tooltip>
    </div>
  );

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
                {t("list")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("primeNumber")}
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
                {t("calculationInEid")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12">
                {t("years")}
              </TableColumn>
              <TableColumn className="text-secondary-1000 dark:text-white text-sm font-normal bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] text-center">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody>
              {data.map((row: any, index: number) => {
                const rowId = row.id ?? index;
                const isEditMode = editableRowId === rowId;

                return (
                  <TableRow
                    key={rowId}
                    className={`border-b border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
                  >
                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      {rowId}
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppAutoComplete
                        props={{
                          radius: "none",
                          classNames: {
                            base: `!shadow-none border-1 !rounded-none ${isEditMode ? "border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]" : "!border-transparent"}`,
                            input: "!text-netural-400",
                            selectorButton: `${!isEditMode && "!hidden"}`,
                            clearButton: `${!isEditMode && "!hidden"}`,
                          },
                          disabled: !isEditMode,
                          data: DUMMY_PARAMETERS,
                          value: row.list,
                          name: "listId",
                          onChange: (val: any) =>
                            handleInputChange(rowId, "listId", val),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppInput
                        props={{
                          classNames: {
                            inputWrapper: `!rounded-none !shadow-none border-1 ${isEditMode ? "border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]" : "border-main-light dark:border-[rgba(4,66,92,0.60)]"}`,
                            input: `!text-netural-400`,
                          },
                          disabled: !isEditMode,
                          name: "primeNumber",
                          value: rowsData[index].primeNumber,
                          onChange: (e: any) =>
                            handleInputChange(
                              rowId,
                              "primeNumber",
                              e.target.value,
                            ),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppAutoComplete
                        props={{
                          radius: "none",
                          classNames: {
                            base: `!shadow-none !rounded-none border-1 ${isEditMode ? "border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]" : "!border-transparent"}`,
                            input: "!text-netural-400",
                            selectorButton: `${!isEditMode && "!hidden"}`,
                            clearButton: `${!isEditMode && "!hidden"}`,
                          },
                          disabled: !isEditMode,
                          data: DUMMY_ELEMAN,
                          value: row.eleman,
                          name: "eleman",
                          onChange: (val: any) =>
                            handleInputChange(rowId, "eleman", val),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppInput
                        props={{
                          classNames: {
                            inputWrapper: `!rounded-none !shadow-none border-1 ${isEditMode ? "border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]" : "border-main-light dark:border-[rgba(4,66,92,0.60)]"}`,
                            input: `!text-netural-400`,
                          },
                          disabled: !isEditMode,
                          type: "number",
                          name: "coefficient",
                          value: rowsData[index].coefficient,
                          onChange: (e: any) =>
                            handleInputChange(
                              rowId,
                              "coefficient",
                              e.target.value,
                            ),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppInput
                        props={{
                          classNames: {
                            inputWrapper: `!rounded-none !shadow-none border-1 ${isEditMode ? "border-[#DCF0F9] dark:border-[rgba(4,66,92,0.60)]" : "border-main-light dark:border-[rgba(4,66,92,0.60)]"}`,
                            input: `!text-netural-400`,
                          },
                          disabled: !isEditMode,
                          type: "number",
                          name: "fixedNumber",
                          value: rowsData[index].fixedNumber,
                          onChange: (e: any) =>
                            handleInputChange(
                              rowId,
                              "fixedNumber",
                              e.target.value,
                            ),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppCheckbox
                        props={{
                          disabled: !isEditMode,
                          isSelected: rowsData[index].calculationInEid,
                          radius: "sm",
                          onChange: (e: any) =>
                            handleInputChange(
                              rowId,
                              "calculationInEid",
                              e.target.checked,
                            ),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0 text-center">
                      <AppCheckbox
                        props={{
                          disabled: !isEditMode,
                          isSelected: rowsData[index].years,
                          radius: "sm",
                          onChange: (e: any) =>
                            handleInputChange(rowId, "years", e.target.checked),
                        }}
                      />
                    </TableCell>

                    <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0">
                      {renderActions(rowId)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Modal
            hideCloseButton
            backdrop="blur"
            isOpen={isOpen}
            size="2xl"
            onOpenChange={onOpenChange}
          >
            <ModalContent className="rounded-[12px] bg-white/30 shadow-md backdrop-blur-[40px] p-12">
              {(onClose) => (
                <>
                  <ModalHeader>
                    <div className="flex justify-between items-center w-full">
                      <div className="bg-danger flex gap-2 !rounded-4 !px-3 !py-1.5 items-center">
                        <Trash className="text-white" size="18" />
                        <span className="text-xl text-white font-normal leading-normal">
                          {t("wouldItBeAcceptableForYouToRemoveThis")}?
                        </span>
                      </div>
                      <Button
                        className="!w-6 !h-6 !p-0 !min-w-fit !rounded-0"
                        variant="light"
                        onPress={onClose}
                      >
                        <CloseIcon />
                      </Button>
                    </div>
                  </ModalHeader>
                  <ModalFooter>
                    <Button
                      className="text-secondary-800 !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                      color="default"
                      variant="light"
                      onPress={onClose}
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                      onPress={() => {
                        onClose();
                      }}
                    >
                      {t("delete")}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        <div className="px-5 py-2 mt-1 w-full bg-primary-50 dark:bg-[rgba(4,66,92,0.60)] rounded-4">
          <div className="flex justify-between pl-5 py-2">
            <div className="text-sm">{t("total")}:</div>
            <div className="text-xs">{t("coefficient")}</div>
          </div>
        </div>
        <div className="felx flex-col mt-3">
          <div>
            <h4 className="text-secondary-400 dark:text-secondary-0 font-bold">
              {t("insurance")}:
            </h4>
          </div>
          <div className="mt-4 px-2 flex flex-col gap-5">
            <div className="text-sm text-netural-400 dark:text-netural-250 flex justify-between">
              <span>{t("workersShareInsurance")}</span>
              <span>69%</span>
            </div>
            <div className="text-sm text-netural-400 dark:text-netural-250 flex justify-between">
              <span>{t("employersShareInsurance")}</span>
              <span>69%</span>
            </div>
            <div className="text-sm text-netural-400 dark:text-netural-250 flex justify-between">
              <span>{t("unemploymentInsurance")}</span>
              <span>69%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputationalCoefficients;
