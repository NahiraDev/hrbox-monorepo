import { AppModal } from '../../../../core/components';

const ActionsModal = () => {
  return (
    <>
      <AppModal.Body>
        <div className="flex flex-col rounded-lg px-3 py-6 bg-[#FEDFB640] text-sm font-semibold">
          <p className="flex items-center gap-2">
            <span>
              <svg fill="none" height="8" viewBox="0 0 8 8" width="8" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4" cy="4" fill="#FD8F02" r="4" />
              </svg>
            </span>
            Pay attention to the following points:
          </p>
          <p className="ms-4">It is not possible to register traffic again for less than 5 minutes.</p>
        </div>
      </AppModal.Body>
    </>
  );
};

export default ActionsModal;
