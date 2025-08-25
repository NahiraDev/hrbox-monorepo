import { Button } from '@heroui/button';

const SubHeader = () => {
  return (
    <div className="w-340 mb-4 p-1 flex items-center justify-between">
      <div>
        <Button color="primary">Organization Departments</Button>
      </div>
      <div className="flex gap-2">
        <Button color="primary" variant="bordered" className="text-black">
          Bordered
        </Button>
        <Button color="primary" variant="bordered" className="text-black">
          Bordered
        </Button>
      </div>
    </div>
  );
};

export default SubHeader
