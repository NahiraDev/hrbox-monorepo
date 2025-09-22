import AppModal from './AppModal';

interface ColumnPair {
  key: string;
  label: string;
}

interface AppShowModeModalProps {
  columnPairs?: ColumnPair[][];
  selectedRow?: Record<string, any>;
  title?: string;
}

const AppShowModeModal = ({ columnPairs = [], selectedRow = {}, title = 'Record Details' }: AppShowModeModalProps) => {
  return (
    <AppModal size="3xl" title={title}>
      <AppModal.Body>
        <div className="space-y-4">
          {columnPairs.map((pair, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pair.map(
                (col) =>
                  col && (
                    <div key={col.key} className="flex-1">
                      <div className="p-4 flex justify-between rounded-md border border-[rgba(220,240,249,0.40)] bg-[linear-gradient(90deg,_#FBF1FE_0%,_#FCF8F8_50%,_#F9F0F0_75%,_#FCF4F3_100%)] backdrop-blur-xs dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-secondary-900 font-light">{col.label}</span>
                        </div>
                        <span className="text-secondary-900 font-semibold">{selectedRow?.[col.key] ?? ''}</span>
                      </div>
                    </div>
                  ),
              )}
            </div>
          ))}
        </div>
      </AppModal.Body>
    </AppModal>
  );
};

export default AppShowModeModal;
