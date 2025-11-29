import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Calculator, Profile } from "iconsax-react";
import { useTranslation } from "react-i18next";

export default function EditDetailModal({ props }: { props: any }) {
  const { isOpen, onOpenChange, data } = props;
  const { t } = useTranslation();

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      isOpen={isOpen}
      placement="top"
      size="4xl"
      onOpenChange={onOpenChange}
    >
      <ModalContent className="bg-white dark:bg-info-1000 shadow-md shadow-[rgba(8,14,28,0.22)] dark:shadow-secondary-600 backdrop-blur-[40px] p-12 aria-[modal]:!rounded-6">
        {(onClose) => (
          <div className="flex flex-col gap-8">
            <ModalHeader className="flex flex-col gap-1 !p-0">
              <div className="flex justify-between items-center">
                <div className="bg-primary dark:bg-surface-primary shadow-shadow-light-tight/1 rounded-4 flex items-center gap-2 px-3 py-1.5 w-fit">
                  <Calculator color="#ffffff" />
                  <span className="text-white font-normal text-xl">
                    {t("detailsOfChanges")}
                  </span>
                </div>
                <Button
                  className="!min-w-fit !rounded-0 w-6 h-6 !p-0"
                  variant="light"
                  onPress={onClose}
                >
                  <svg
                    fill="none"
                    height="25"
                    viewBox="0 0 24 25"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.6465 6.14648C17.8173 5.97563 18.0813 5.95387 18.2754 6.08203L18.3535 6.14648C18.5244 6.31735 18.5461 6.58131 18.418 6.77539L18.3535 6.85352L12.707 12.5L18.3535 18.1465C18.5488 18.3417 18.5488 18.6583 18.3535 18.8535C18.1583 19.0488 17.8417 19.0488 17.6465 18.8535L12 13.207L6.35352 18.8535C6.18265 19.0244 5.91869 19.0461 5.72461 18.918L5.64648 18.8535C5.47563 18.6827 5.45387 18.4187 5.58203 18.2246L5.64648 18.1465L11.293 12.5L5.64648 6.85352C5.47562 6.68265 5.45387 6.41869 5.58203 6.22461L5.64648 6.14648C5.81735 5.97562 6.08131 5.95387 6.27539 6.08203L6.35352 6.14648L12 11.793L17.6465 6.14648Z"
                      fill="#04070E"
                      stroke="#666666"
                    />
                  </svg>
                </Button>
              </div>
            </ModalHeader>
            <ModalBody className="!p-0">
              <div className="flex flex-col w-full gap-4">
                <div className="border-1 border-main-light dark:border-[rgba(4,66,92,0.60)] rounded-5 flex w-full px-3 py-4 justify-between !bg-gradient-to-r from-white via-[#EEF9FF] to-white dark:bg-gradient-to-r dark:from-[#01101A] dark:via-[#022C3D] dark:to-[#01101A]">
                  <div className="flex gap-3">
                    <div>
                      <Profile fill="secondary-1000 dark:text-white" />
                    </div>
                    <div className="text-secondary-1000 dark:text-white">
                      {t("UserName")}
                    </div>
                  </div>
                  <div className="text-secondary-900 font-[600] dark:text-white">
                    {data.userName}
                  </div>
                </div>
                <div className="border-1 border-main-light dark:border-[rgba(4,66,92,0.60)] rounded-5 flex w-full px-3 py-4 justify-between !bg-gradient-to-r from-white via-[#EEF9FF] to-white dark:bg-gradient-to-r dark:from-[#01101A] dark:via-[#022C3D] dark:to-[#01101A]">
                  <div className="flex gap-3">
                    <div>
                      <Profile fill="secondary-1000 dark:text-white" />
                    </div>
                    <div className="text-secondary-1000 dark:text-white">
                      {t("personnelCode")}
                    </div>
                  </div>
                  <div className="text-secondary-900 font-[600] dark:text-white">
                    {data.personnelCode}
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div className="font-bold text-secondary-400 dark:!text-white mb-2">
                  {t("modifierUser")}:
                </div>
                <div>
                  <div className="border-1 border-main-light dark:border-[rgba(4,66,92,0.60)] !text-secondary-900 dark:!text-white flex items-center justify-between w-full p-3 rounded-5 !bg-gradient-to-r from-white via-[#EEF9FF] to-white dark:bg-gradient-to-r dark:from-[#01101A] dark:via-[#022C3D] dark:to-[#01101A]">
                    <div className="flex items-center gap-3">
                      <Avatar
                        alt={data.modifierUser.name}
                        className="rounded-lg"
                        size="md"
                        src={data.avatar}
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {data.modifierUser.name}
                        </span>
                        <span className="text-xs">
                          {data.modifierUser.role}
                        </span>
                      </div>
                    </div>
                    <span>{data.modifierUser.ipAddress}</span>
                    <span>{data.modifierUser.date}</span>
                    <span>{data.modifierUser.time}</span>
                  </div>
                </div>
              </div>

              <div className="px-2 mt-5">
                <div className="text-secondary-400 dark:!text-white mb-2">
                  {t("changes")}:
                </div>
                <div>
                  <Table>
                    <TableHeader className="!rounded-0">
                      <TableColumn className="text-secondary-1000 dark:text-white text-sm font-semibold bg-main-light dark:bg-[rgba(4,66,92,0.60)] text-center">
                        No.
                      </TableColumn>
                      <TableColumn className="text-secondary-1000 dark:text-white text-sm font-semibold bg-main-light dark:bg-[rgba(4,66,92,0.60)] text-center">
                        Title
                      </TableColumn>
                      <TableColumn className="text-secondary-1000 dark:text-white text-sm font-semibold bg-main-light dark:bg-[rgba(4,66,92,0.60)] text-center">
                        Before
                      </TableColumn>
                      <TableColumn className="text-secondary-1000 dark:text-white text-sm font-semibold bg-main-light dark:bg-[rgba(4,66,92,0.60)] text-center">
                        After
                      </TableColumn>
                    </TableHeader>
                    <TableBody>
                      {data.changes.map((row: any, index: number) => (
                        <TableRow
                          key={index}
                          className={`border-[#dcf0f966] dark:border-[#04425c66] hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
                        >
                          <TableCell className="text-xs font-normal text-secondary-1000 dark:text-white text-center">
                            {row.no}
                          </TableCell>
                          <TableCell className="text-xs font-normal text-secondary-1000 dark:text-white text-center">
                            {row.title}
                          </TableCell>
                          <TableCell className="text-xs font-normal text-secondary-1000 dark:text-white text-center">
                            {row.before}
                          </TableCell>
                          <TableCell className="text-xs font-normal text-secondary-1000 dark:text-white text-center">
                            {row.after}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ModalBody>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
