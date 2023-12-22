import React, { useEffect } from 'react'

const ProgressBar = ({orderDetails}) => {
    console.log('progressbar ka order details',orderDetails)
    console.log(orderDetails?.delivery_status)
    const{delivery_status,isPaymentDone,weighBillReceived,billSubmission,paymentReceived} = orderDetails

    useEffect(()=>{
        const{delivery_status,isPaymentDone,weighBillReceived,billSubmission,paymentReceived} = orderDetails

    },[])
  return (
    <>
        <div className='flex'>
                    <p ><button className=''>🟢 order placed</button></p> {delivery_status?.status ==='Delivered' && 
                (   
                <>
                <p className='text-green-400'>__________</p><button>🟢 order delivered</button>
                </>
                )
                    }
                    {
                    isPaymentDone?.status === 'Done' &&(
                    <>
                        <p className='text-green-400'>__________</p><button>🟢 payment done</button>
                    </>
                    )
                    
                    }
                    {
                        weighBillReceived?.status === 'Received' &&(
                        <>
                            <p className='text-green-400'>__________</p><button>🟢 bill received</button>
                        </>

                        )                
                    }
                    {
                        billSubmission?.status === 'Submitted' && (
                        <>
                            <p className='text-green-400'>__________</p><button>🟢 bill submitted</button>
                        </>

                        )
                    }
                    {
                    paymentReceived?.status === 'Received' &&(
                        <>
                            <p className='text-green-400'>__________</p><button>🟢 payment received</button>
                        </>
                    )
                    }
                    
            </div>
    </>
  )
}

export default ProgressBar
