import React, { useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';

const CustomProgressBar = ({ deliveryStatus, unloadingStatus, isDelivered, isPaymentReceived }) => {
    console.log(deliveryStatus, unloadingStatus, isDelivered, isPaymentReceived)
    const [unloadingActive, setUnloadingActive] = useState(false);
    const [deliveryActive, setDeliveryActive] = useState(false);
    const [paymentReceivedActive, setPaymentReceivedActive] = useState(false);
    const [deliveredActive, setDeliveredActive] = useState(false);
  
    useEffect(() => {
      setUnloadingActive(unloadingStatus === 'Yes');
      setDeliveryActive(deliveryStatus === 'Delivered');
      setPaymentReceivedActive(isPaymentReceived === 'Yes');
      setDeliveredActive(isDelivered === 'Yes');
    }, [unloadingStatus, deliveryStatus, isPaymentReceived, isDelivered]);

    const getStepContent = (step) => {
        switch (step) {
          case 0:
            return `Unloading Status: ${unloadingStatus?.status}, Date: ${unloadingStatus?.date ? new Date(unloadingStatus?.date).toLocaleDateString() : 'Yet to be unload'}`;
          case 1:
            return `Delivery Status: ${deliveryStatus?.status}, Date: ${deliveryStatus?.date ? new Date(deliveryStatus?.date).toLocaleDateString() : 'Yes to be Delivered'}`;
          case 2:
            return `Payment Received: ${isPaymentReceived?.status}, Date: ${isPaymentReceived?.date ? new Date(isPaymentReceived?.date).toLocaleDateString() : 'yet to be received'}`;
          case 3:
            return `Delivered: ${isDelivered?.status}, Date: ${isDelivered?.date ? new Date(isDelivered?.date).toLocaleDateString() : 'Yes to be delivered'}`;
          default:
            return '';
        }
      };

  const steps = ['Unloading', 'Delivery', 'isPaymentReceived', 'Delivered'];

  const getStepIcon = (index) => {
    switch (index) {
      case 0:
        return unloadingActive ? <CheckIcon className="text-green-500" /> : <ArrowForwardIcon className="text-gray-500" />;
      case 1:
        return deliveryActive ? <CheckIcon className="text-green-500" /> : <ArrowForwardIcon className="text-gray-500" />;
      case 2:
        return paymentReceivedActive ? <CheckIcon className="text-green-500" /> : <ArrowForwardIcon className="text-gray-500" />;
      case 3:
        return deliveredActive ? <CheckIcon className="text-green-500" /> : <ArrowForwardIcon className="text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <Stepper activeStep={3}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            icon={getStepIcon(index)}
            StepIconProps={{
              style: {
                color:
                  (index === 0 && unloadingActive) ||
                  (index === 1 && deliveryActive) ||
                  (index === 2 && paymentReceivedActive) ||
                  (index === 3 && deliveredActive)
                    ? 'blue'
                    : 'red',
              },
            }}
          >
            <Typography
              style={{
                color:
                  (index === 0 && unloadingActive) ||
                  (index === 1 && deliveryActive) ||
                  (index === 2 && paymentReceivedActive) ||
                  (index === 3 && deliveredActive)
                    ? 'blue'
                    : 'red',
              }}
            >
              {label}
            </Typography>
          </StepLabel>
          <div className="mt-2 text-sm text-gray-600">{getStepContent(index)}</div>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomProgressBar;