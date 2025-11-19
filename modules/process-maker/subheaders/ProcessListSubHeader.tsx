import {Add, Hierarchy3, SearchNormal, Setting4} from 'iconsax-reactjs';

import {AppButton} from '@hrbox/uikit/components';

const ProcessListSubHeader = () => {

    return (
        <div className="flex flex-row-reverse w-full justify-between">
            <div className="flex flex-row-reverse gap-2">
                <AppButton
                    color='white'
                    size='md'
                    radius='lg'
                    startContent={<Add/>}
                    // onPress={() => openModal('confirm', 'NewOneModal', <NewOneModal/>)}
                    className='border-1 border-primary'
                    content='Add new One'
                />
                <AppButton
                    color='bg-white'
                    size='md'
                    radius='lg'
                    className={'border-1 border-primary'}
                    startContent={<Setting4/>}
                />
                <AppButton
                    size='md'
                    radius='lg'
                    color="primary"
                    variant="bordered"
                    className='w-fit! p-2.5! text-lg'
                    startContent=<SearchNormal/>
                />
            </div>
            <div className="flex">
                <AppButton
                    color='primary'
                    size='md'
                    radius='lg'
                    startContent=<Hierarchy3/>
                    content='Processes'
                />
            </div>
        </div>
    );
};

export default ProcessListSubHeader;
