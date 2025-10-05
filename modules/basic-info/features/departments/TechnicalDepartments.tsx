import { technicalDepartment } from '@module/basic-info/app/mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton } from '@core/components';
// import { OrganizationDepartmentModal } from '@module/basic-info/features/departments/modals/OrganizationDepartmentModal';


const TechnicalDepartments = () => {
  return (
    <div className="w-340 ">
      <div className="w-full grid grid-cols-8 gap-3">
        {technicalDepartment.map((user, index) => (
          <Card
            key={index}
            className="w-39 h-55 bg-white rounded-2xl shadow-sm
            flex items-center justify-center gap-2 relative"
          >
            <Avatar className="w-30 h-30 " color="primary" radius="lg" src="" />
            {/*<img src={user.diactive} alt="avatar" className="absolute" />*/}
            <span className="text-xs font-semibold">{user.name}</span>
            <AppButton
              props={{
                className: 'bg-primary-100 bg-[#DCF0F9] text-[#0A9AD7] border-1 border-[#DCF0F9]',
                size: 'sm',
                radius: 'lg',
                onPress: () => {},
                content: <span>{user.job}</span>,
              }}
            />
          </Card>
        ))}
        <span className="text-9xl absolute top-175 left-455 font-bold text-[#04070E]/10">200</span>
        {/*<OrganizationDepartmentModal/>*/}
      </div>
    </div>
  );
};

export default TechnicalDepartments;
