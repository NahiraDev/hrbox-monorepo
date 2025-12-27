import {AppTable} from "@hrbox/uikit/components";
import {GeneralMock} from "@hrbox/modules/job-gradings/app/mock";


const General = () => {
    return (
        <div className="w-full h-full flex justify-center">
            <AppTable
                data={GeneralMock}
                showStatus={true}
                rowActions={[]}
                hasPagination={true}
            />
        </div>
    );
};

export default General;
