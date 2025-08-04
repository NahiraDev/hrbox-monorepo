import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
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

import { AppPagination } from "./AppPagination";
import { CloseIcon } from "@hrbox/shared-templates";

const AppTable = ({ props }: { props: any }) => {
  const {
    data,
    columns,
    onOpenEditDialog,
    hasPagination = true,
    hasPadding = true,
    hasShadow = true,
    hasRowBorder = true,
  } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!data.length) return <div className="p-4">No data available</div>;

  const autoColumns =
    columns ||
    Object.keys(data[0])
      .filter((key) => key !== "id")
      .map((key) => ({ key, label: key }));

  const renderActions = () => (
    <div className="relative flex items-center justify-center gap-2">
      <Tooltip content="Edit">
        <Button
          className="!min-w-fit !p-0 !w-4 !h-4 !rounded-0 !bg-transparent"
          onPress={onOpenEditDialog}
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
    <div
      className={`bg-primary-50 w-full border border-primary dark:bg-[rgba(4,66,92,0.60)] ${hasPadding && "pt-5 pl-5 pr-6"} pb-4 h-full !rounded-[14px] ${hasShadow && "shadow-shadow-light-tight/1"}`}
    >
      <Table aria-label="Customizable Table" className="!h-[95%]">
        <TableHeader className="!rounded-0">
          {autoColumns.map((col: any) => (
            <TableColumn
              key={col.key}
              className="text-white dark:text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] !rounded-0 text-center !h-12"
            >
              {col.label}
            </TableColumn>
          ))}
          <TableColumn className="text-white dark:text-white text-sm font-semibold bg-primary dark:bg-[rgba(4,66,92,0.60)] text-center">
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((row: any, index: number) => (
            <TableRow
              key={row.id ?? index}
              className={`${hasRowBorder && "border-b border-[#dcf0f966] dark:border-[#04425c66]"} hover:bg-surface dark:hover:bg-[#04425c66] !rounded-4 transition-colors !h-12`}
            >
              {autoColumns.map((col: any) => (
                <TableCell
                  key={col.key}
                  className="text-xs font-normal text-black dark:text-white text-center"
                >
                  {row[col.key] ??
                    (col.key.toLowerCase().includes("date") ? "Present" : "")}
                </TableCell>
              ))}
              <TableCell className="text-xs font-normal text-secondary-400 dark:text-secondary-0">
                {renderActions()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {hasPagination && (
        <div className="flex justify-end">
          <AppPagination
            props={{
              size: "md",
              total: data.length,
            }}
          />
        </div>
      )}
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
                      Would it be acceptable for you to remove this?
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
                  Cancel
                </Button>
                <Button
                  className="bg-danger text-white !px-3 !py-1.5 !rounded-4 !font-normal !min-w-fit"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AppTable;
