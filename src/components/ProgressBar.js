import React, { useEffect } from 'react'

const ProgressBar = ({orderDetails}) => {
    console.log('progressbar ka order details',orderDetails)
    console.log(orderDetails?.delivery_status)
    // const loadData = (orderDetails)=>{
        // const{delivery_status,isPaymentDone,weighBillReceived,billSubmission,paymentReceived} = orderDetails

    // }

   

    useEffect(()=>{
        // loadData()
        

    },[])
    
  return !orderDetails? <div>progress bar loading</div>:(
    <>
        <div className='flex'>
                    <p ><button className=''>🟢 order placed</button></p> {orderDetails.delivery_status?.status ==='Delivered' && 
                (   
                <>
                <p className='text-green-400'>__________</p><button>🟢 order delivered</button>
                </>
                )
                    }
                    {
                    orderDetails.isPaymentDone?.status === 'Done' &&(
                    <>
                        <p className='text-green-400'>__________</p><button>🟢 payment done</button>
                    </>
                    )
                    
                    }
                    {
                        orderDetails.weighBillReceived?.status === 'Received' &&(
                        <>
                            <p className='text-green-400'>__________</p><button>🟢 bill received</button>
                        </>

                        )                
                    }
                    {
                        orderDetails.billSubmission?.status === 'Submitted' && (
                        <>
                            <p className='text-green-400'>__________</p><button>🟢 bill submitted</button>
                        </>

                        )
                    }
                    {
                    orderDetails.paymentReceived?.status === 'Received' &&(
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
