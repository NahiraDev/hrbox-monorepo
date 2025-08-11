import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@heroui/react";
import { ArrowRight, ClipboardTick, Designtools } from "iconsax-react";
import TodoListImage from "../assets/img/todoList.png";

const SortableTaskCard = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="bg-white shadow-shadow-light-tight/1 cursor-move rounded-5 p-4 mb-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center border-b-1 border-netural-100 pb-1">
            <ClipboardTick className="text-secondary-400" />
            <span className="font-semibold text-base text-secondary-1000 leading-normal">
              Payroll
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-4 w-full">
                <div className="flex items-center gap-2">
                  <img
                    alt="Avatar"
                    className="rounded-3 w-8 h-8"
                    src={TodoListImage}
                  />
                  <span className="text-secondary-1000 font-normal text-sm ">
                    Nima Rahimloo
                  </span>
                </div>
                <span className="text-sm text-secondary-1000 font-normal">
                  Design
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Designtools className="text-secondary-400 w-5 h-5" />
              <span className="text-sm text-secondary-1000 font-normal">
                Designer
              </span>
              <span className="text-sm text-secondary-1000 font-normal">
                80%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AppTasksList() {
  const [tasks, setTasks] = useState([
    "task-1",
    "task-2",
    "task-3",
    "task-4",
    "task-5",
    "task-6",
    "task-7",
  ]);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="bg-[#dcf0f966] border-1 border-primary-400 p-2.5 rounded-5 h-full overflow-y-scroll">
      <div className="flex items-center justify-between mb-4 border-b-1 pb-1 border-netural-100">
        <span className="text-base font-semibold text-secondary-1000">
          Tasks List
        </span>
        <Button
          className="!border-1 !border-primary-400 !px-2 !py-1 !rounded-2 bg-white gap-2 !h-fit"
          variant="light"
        >
          <span className="text-secondary-1000 text-xs font-normal">
            See More
          </span>
          <ArrowRight className="text-secondary-800" size="12" />
        </Button>
      </div>

      <div className="h-full">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((id) => (
              <SortableTaskCard key={id} id={id} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
