import { onBoarding, DNNSupervisor } from '@module/basic-info/app/mock';
import { ArrowRight2, Calendar, Clipboard, ReceiveSquare, Refresh2, TickCircle, UserAdd } from "iconsax-reactjs";
import {
  Card,
  Chip,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@heroui/react";
import { BasicInfoLayout } from '@hrbox/modules/basic-info/components';
import { AppDoubleLineProgress } from "@hrbox/uikit/components/AppDoubleLineProgress";
import {Accordion, AccordionItem} from "@heroui/react";
import { useState } from "react";

const columns = [
  { key: 'no', label: 'No.' },
  { key: 'name', label: 'Title' },
  { key: 'fromDate', label: 'Result' },
  { key: 'toDate', label: 'Description' },
  { key: 'contractName', label: 'Issuer' },
  { key: 'description', label: 'Send Date' },
  { key: 'status', label: 'Due Date' },
  { key: 'action', label: 'Time' },
];

const rows = [
  {
    key: '1',
    no: 1,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },
  {
    key: '2',
    no: 2,
    name: 'Zahra Pakniyat',
    fromDate: '2025/09/11',
    toDate: '2025/09/11',
    contractName: 'Confidentiality Agreement',
    description: '-',
    status: 'Signed',
    action: <ReceiveSquare size={16} className="cursor-pointer hover:text-primary transition-colors" />,
  },

];


const Offboarding = () => {


  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <BasicInfoLayout
      content={
        <div className="grid grid-cols-[25%_75%] gap-2 p-4">
          <div className="flex flex-col gap-3 ">
            <div className="flex items-center gap-1 p-3">
              <UserAdd size="26" />
              <span className="text-xl font-semibold">Onboarding</span>
            </div>
            {onBoarding.map((board, index) => (
              <Card
                isPressable
                key={index}
                onPress={() => setActiveIndex(index)}
                className={`
                py-2 px-3 flex flex-col gap-2 shadow-sm cursor-pointer
                transition-all duration-200
                hover:!bg-[#D6F2FF]
                ${activeIndex === index
                  ? "bg-[#D6F2FF] border border-primary-400"
                  : "border border-transparent"
                }
  `}
              >

                <div className="flex gap-1 items-center border-b border-neutral-100 pb-1">
                  <Clipboard size="20" />
                  <span className="text-[16px] text-secondary-1000 font-semibold">{board.title}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between border border-[#DCF0F9]/40 rounded-lg px-2 py-1.5">
                    <div className="flex gap-1 items-center text-xs">
                      <Calendar size="16" />
                      <span className="text-xs text-secondary-1000">date</span>
                    </div>
                    <div>
                      <span className="text-xs text-secondary-1000 font-semibold">{board.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 p-3">
                <UserAdd size="26" />
                <span className="text-xl font-semibold">DNN Supervisor</span>
              </div>
              <div className="flex gap-1">
                <UserAdd size="26" />
                <span className="text-xl font-semibold">Today:</span>
                <span className="text-xl font-semibold ml-3">Oct.21</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <TableDnn/>
              <TableDnn/>
              <TableDnn/>
              <TableDnn/>
              <TableDnn/>
            </div>
          </div>
        </div>
      }
    />
  );
};

const TableDnn = () => {

  const renderStatusChip = (status: string) => {
    if (status === 'Signed') {
      return (
        <Chip
          startContent={<TickCircle size="16" color="#22AD5C" variant={"Bold"}/>}
          variant=""
          className=" text-[#22AD5C] text-xs"
        >
          Signed
        </Chip>
      );
    } else if (status === 'Pending') {
      return (
        <Chip
          startContent={<Refresh2 size="16" color="#0B76B7"/>}
          variant=""
          className=" text-primary-400 text-xs"
        >
          Pending
        </Chip>
      );
    }
    return status;
  };

  return(
    <Accordion>
      <AccordionItem
        key="1"
        title={
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <ArrowRight2
                size="20"
                color="#04070E"
                className="
                transition-transform duration-300 ease-in-out
                group-data-[open=true]:rotate-90
              "
              />
              <span className="text-[16px] text-secondaru-1000 font-semibold">
                DNN Supervisor
              </span>
            </div>
          </div>
        }

        className="border bg-white border-primary-400 p-3 rounded-xl shadow-sm group"
      >
        <Table
          removeWrapper
          aria-label="Contracts Table"
          classNames={{
            th: 'bg-[#E5E5E5] text-[#04070E] py-3 px-2 text-sm font-semibold rounded-none text-center',
            td: 'py-5  px-2 text-xs text-[#1E3363] text-center',
            thead: '[&>tr]:rounded-none',
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} className="text-white">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === 'status' ? (
                      renderStatusChip(getKeyValue(item, columnKey))
                    ) : columnKey === 'action' ? (
                      <div className="flex justify-center">
                        {getKeyValue(item, columnKey)}
                      </div>
                    ) : (
                      getKeyValue(item, columnKey)
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </AccordionItem>
    </Accordion>
  )
}

export default Offboarding;
