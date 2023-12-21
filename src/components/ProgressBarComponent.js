import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";

const CustomProgressBar = ({
  deliveryStatus,
  isPaymentDone,
  weighBillReceived,
  billSubmission,
  paymentReceived,
}) => {
  console.log(
    deliveryStatus,
    isPaymentDone,
    weighBillReceived,
    billSubmission,
    paymentReceived
  );
  const [deliveryStatusActive, setdeliveryStatusActive] = useState(false);
  const [isPaymentDoneActive, setisPaymentDoneActive] = useState(false);
  const [weighBillReceivedActive, setweighBillReceivedActive] = useState(false);
  const [paymentReceivedActive, setPaymentReceivedActive] = useState(false);
  const [billSubmissionActive, setbillSubmissionActive] = useState(false);

  useEffect(() => {
    setdeliveryStatusActive(deliveryStatus?.status === "Delivered");
    setisPaymentDoneActive(isPaymentDone?.status === "Done");
    setweighBillReceivedActive(weighBillReceived?.status === "Received");
    setbillSubmissionActive(billSubmission?.status === "Submitted");
    setPaymentReceivedActive(paymentReceived?.status === "Received");
  }, [
    deliveryStatus,
    isPaymentDone,
    weighBillReceived,
    billSubmission,
    paymentReceived,
  ]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return `Delivery Status: ${deliveryStatus?.status}, Date: ${
          deliveryStatus?.date
            ? new Date(deliveryStatus?.date).toLocaleDateString()
            : "Yet to be Delivered"
        }`;
      case 1:
        return `payment Status: ${isPaymentDone?.status}, Date: ${
          isPaymentDone?.date
            ? new Date(isPaymentDone?.date).toLocaleDateString()
            : "Yet to be Payment"
        }`;
      case 2:
        return `Weigh-Bill Received: ${weighBillReceived?.status}, Date: ${
          weighBillReceived?.date
            ? new Date(weighBillReceived?.date).toLocaleDateString()
            : "yet to be received"
        }`;
      case 3:
        return `Bill-Submission: ${billSubmission?.status}, Date: ${
          billSubmission?.date
            ? new Date(billSubmission?.date).toLocaleDateString()
            : "yet to be Submit"
        }`;

      case 4:
        return `Payment Received: ${paymentReceived?.status}, Date: ${
          paymentReceived?.date
            ? new Date(paymentReceived?.date).toLocaleDateString()
            : "yet to be received"
        }`;
      default:
        return "";
    }
  };

  const steps = ["Delivered", "Payment", "Weigh Bill", "Bill Submission","Payment Received"];

  const getStepIcon = (index) => {
    switch (index) {
      case 0:
        return deliveryStatusActive ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <ArrowForwardIcon className="text-gray-500" />
        );
      case 1:
        return isPaymentDoneActive ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <ArrowForwardIcon className="text-gray-500" />
        );
      case 2:
        return weighBillReceivedActive ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <ArrowForwardIcon className="text-gray-500" />
        );
      case 3:
        return billSubmissionActive ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <ArrowForwardIcon className="text-gray-500" />
        );
        case 4:
        return paymentReceivedActive ? (
          <CheckIcon className="text-green-500" />
        ) : (
          <ArrowForwardIcon className="text-gray-500" />
        );
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
                  (index === 0 && deliveryStatusActive) ||
                  (index === 1 && isPaymentDoneActive) ||
                  (index === 2 && weighBillReceivedActive) ||
                  (index === 3 && billSubmissionActive)||
                  (index === 4 && paymentReceivedActive)
                    ? "blue"
                    : "red",
              },
            }}
          >
            <Typography
              style={{
                color:
                  (index === 0 && deliveryStatusActive) ||
                  (index === 1 && isPaymentDoneActive) ||
                  (index === 2 && weighBillReceivedActive) ||
                  (index === 3 && billSubmissionActive)||
                  (index === 4 && paymentReceivedActive)
                    ? "blue"
                    : "red",
              }}
            >
              {label}
            </Typography>
          </StepLabel>
          <div className="mt-2 text-sm text-gray-600">
            {getStepContent(index)}
          </div>
        </Step>
      ))}
    </Stepper>
  );
};

export default CustomProgressBar;
