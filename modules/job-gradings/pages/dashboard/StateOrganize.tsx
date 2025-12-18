interface OrganizationItem {
  id: string;
  title: string;
  number: string;
}

interface StateOrganizeProps {
  organization: OrganizationItem[];
}

const StateOrganize = ({ organization }: StateOrganizeProps) => {
  return (
    <div className="w-[60%]  flex flex-col dark:bg-[#04425C60] border-primary border rounded-xl px-3 py-4 bg-[#DCF0F9]">
      <div className="w-full pb-2.5">
        <p className="text-secondary-1000 font-sans text-[24px] font-semibold">
          The state of the organization
        </p>
        
      </div>

      <hr className="w-full border-[#05587A]" />

      <div className="flex flex-col gap-3 pt-4 w-full items-center h-full">
        {organization.map((element) => (
          <div
            key={element.id}
            className="bg-white py-3 px-3 flex flex-col rounded-xl w-full"
          >
            <div className="flex w-full justify-between items-center">
              <p className="text-secondary-1000  text-xl font-semibold">
                {element.title}
              </p>
              <span className="text-[32px] text-[#1E3363] font-bold ">
                {element.number}
              </span>
            </div>
            <hr className="w-full border-[#B2B2B2]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateOrganize;
