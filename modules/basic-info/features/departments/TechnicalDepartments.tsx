import { technicalDepartment } from 'mock';
import { Avatar, Card } from '@heroui/react';
import { AppButton } from 'core/components';
import { OrganizationDepartmentModal } from './modals/OrganizationDepartmentModal';

// import { CloseCircle } from 'iconsax-react';

const TechnicalDepartments = () => {
  return (
    <>

      <div className="w-full gap-3 rounded-2xl flex flex-wrap items-center content-start p-4">
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
                className: 'px-1.5 py-[2px] text-xs bg-primary-50 border border-primary-100 text-primary-400',
                size: '',
                color: '',
                radius: 'lg',
                onPress: () => {},
                content: <span>{user.job}</span>,
              }}
            />
          </Card>
        ))}
        <span className="text-9xl absolute top-175 left-455 font-bold text-[#04070E]/10">200</span>
        <OrganizationDepartmentModal/>
      </div>
    </>
  );
};

export default TechnicalDepartments;
