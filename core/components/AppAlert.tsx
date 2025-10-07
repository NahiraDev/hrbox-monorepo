import React from 'react';
import { Alert, Button } from '@heroui/react';
interface AlertProps {
  visible: boolean;
}
const ApAlert = ({ visible = false }: AlertProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const title = 'Success Notification';
  const description = "Your action has been completed successfully. We'll notify you when updates are available.";

  return (
    <div className="flex flex-col gap-4">
      {isVisible ? (
        <Alert
          color="success"
          description={description}
          isVisible={isVisible}
          title={title}
          variant="faded"
          onClose={() => setIsVisible(visible)}
        />
      ) : (
        <Button variant="bordered" onPress={() => setIsVisible(visible)}>
          Show Alert
        </Button>
      )}
    </div>
  );
};

export default ApAlert;
