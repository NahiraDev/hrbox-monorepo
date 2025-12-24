import {AppTable} from "@hrbox/uikit/components";
import {Indicators} from "@hrbox/modules/job-gradings/app/mock";

const General = () => {
    return (
        <div className="w-full h-full flex justify-center">
            <AppTable
                data={Indicators}
                showStatus={true}
                rowActions={[]}
                hasPagination={true}
            />
        </div>
    );
};

export default General;
