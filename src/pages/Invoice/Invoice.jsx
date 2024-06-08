import React from 'react';
import useProducts from '../../hooks/useProducts';
import logo from '../../assets/17668f7b929362e7caeec68b917db969.jpg';

const Invoice = () => {
    const { customerInform, reservinform, carInformation, products } = useProducts();
    const product = products.find((itm) => itm?.id === carInformation.id);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='grid justify-center grid-cols-2 gap-2'>
            <div>
                <div className='grid grid-cols-2 justify-center'>
                    <div>
                        <img className='h-36 w-36' src={logo} alt="Logo" />
                        <div>
                            <h1 className='text-start'>Renter Info</h1>
                            <p className='text-start'>{customerInform?.firstName} {customerInform?.lastName}</p>
                            <p className='text-start'>{customerInform?.email}</p>
                            <p className='text-start'>pH: {customerInform?.phoneNumber}</p>
                        </div>
                    </div>
                    <div>
                        <p>35 Bangla Bagla <br /> Motor, Dhaka</p>
                        <div>
                            <p>Sunday 9.00 am to 6 pm</p>
                            <p>Monday 9.00 am to 6 pm</p>
                            <p>Tuesday 9.00 am to 6 pm</p>
                            <p>Thursday 5.00 am to 4 pm</p>
                        </div>
                    </div>
                </div>
                <h1 className='font-bold text-2xl'>Additional Authorization Drivers</h1>
            </div>
            <div>
                <div>
                    <h1>Reservation</h1>
                    <p className='font-bold'>{reservinform?.id}</p>
                    <p>Repair Order</p>
                    <p>CLAIM:</p>
                    <p>Date Time Out: {reservinform?.pickupDate}</p>
                    <p>Date Time In: {reservinform?.returnDate}</p>
                    <div>
                        <h1>Charge Summary</h1>
                        <hr className='border-[#5D5CFF] font-bold' />
                        <table className='border w-full mt-2 border-[#DFDFFF]'>
                            <thead>
                                <tr className='w-full'>
                                    <th className='p-4 me-6'>Charge</th>
                                    <th className='p-4'>Unit</th>
                                    <th className='p-4'>Rate</th>
                                    <th className='p-4'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='w-full'>
                                    <td className='p-4 me-6'>Daily</td>
                                    <td className='p-4'>{carInformation?.day}</td>
                                    <td className='p-4'>{carInformation?.rates?.daily || 0}</td>
                                    <td className='p-4'>{carInformation?.day * (carInformation?.rates?.daily || 0)}</td>
                                </tr>
                                <tr className='w-full'>
                                    <td className='p-4 me-6'>Weekly</td>
                                    <td className='p-4'>{carInformation?.weeks}</td>
                                    <td className='p-4'>{carInformation?.rates?.weekly || 0}</td>
                                    <td className='p-4'>{carInformation?.weeks * (carInformation?.rates?.weekly || 0)}</td>
                                </tr>
                                <tr>
                                    <td className='font-bold'>Total</td>
                                    <td></td>
                                    <td></td>
                                    <td className='font-bold'>{(carInformation?.weeks * (carInformation?.rates?.weekly || 0)) + (carInformation?.day * (carInformation?.rates?.daily || 0))}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum nisi soluta explicabo, eaque doloremque dicta nulla in vitae vero. Accusamus reiciendis earum similique temporibus enim nihil ullam. Fugiat, repellendus modi!</p>
                    <p>Renter Signature</p>
                    <hr className='border-dotted' />
                    <p>Additional Driver</p>
                    <hr />
                </div>
            </div>
            <div className='col-span-2 flex justify-center'>
                <button onClick={handlePrint} className='bg-blue-500 text-white py-2 px-4 rounded'>Print</button>
            </div>
        </div>
    );
};

export default Invoice;
