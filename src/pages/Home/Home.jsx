import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';

const Home = () => {
    const { id } = useParams();
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [daysBetween, setDaysBetween] = useState(0);

    const handlePickupDateChange = (event) => {
        const dateString = event.target.value;
        setPickupDate(dateString);
        calculateDaysBetween(dateString, returnDate);
    };

    const handleReturnDateChange = (event) => {
        const dateString = event.target.value;
        setReturnDate(dateString);
        calculateDaysBetween(pickupDate, dateString);
    };

    const calculateDaysBetween = (startDate, endDate) => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDaysBetween(diffDays);
        } else {
            setDaysBetween(0);
        }
    };

    const calculateWeeksAndDays = (days) => {
        let weeks = 0;
        let dayes = 0;
        if (days >= 7) {
            weeks = Math.floor(days / 7);
            dayes = days % 7;
        } else {
            dayes = days;
        }
        return { weeks, dayes };
    };

    const { weeks, dayes } = calculateWeeksAndDays(daysBetween);

    const { products } = useProducts();
    const product = products.find((itm) => itm?.id === id);

    const { customerInformation, setCustomerInformation,setCustomerInform } = useProducts()
    console.log(customerInformation)
    const { reservinform, setReservinform } = useProducts()
    const [reservation, setReservation] = useState({
        id: '',
        pickupDate: pickupDate,
        returnDate: returnDate,
        days: dayes,
        weeks: weeks,
        discount: '',
        pid:id,
    });

    console.log(reservinform)
    const handleCustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomerInformation((prevCustomerInformation) => ({
            ...prevCustomerInformation,
            [name]: value,
        }));
    };

    const handleReservationChange = (e) => {
        const { name, value } = e.target;
        setReservation((prevReservation) => ({
            ...prevReservation,
            [name]: value,
        }));

    };

    useEffect(() => {
        setReservation((prevReservation) => ({
            ...prevReservation,
            pickupDate: pickupDate,
            returnDate: returnDate,
            days: dayes,
            weeks: weeks,
        }));

    }, [pickupDate, returnDate, dayes, weeks]);


    const options = [
        { name: 'collisionDamageWaiver', label: 'Collision Damage Waiver', cost: 9.00 },
        { name: 'libraryInsurance', label: 'Library Insurance', cost: 15.00 },
        { name: 'rentalTax', label: 'Rental Tax', cost: 11.00 },
    ];

    const [selectedOptions, setSelectedOptions] = useState({
        collisionDamageWaiver: false,
        libraryInsurance: false,
        rentalTax: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [name]: checked,
        }));
    };
    const {carInformation,setCarInformation}=useProducts()
    const car={carId:id,
        day:dayes,
        weeks:weeks,
        rates:product.rates,

    }
    const navigate = useNavigate()
    const handelPrint = () => {
        setReservinform(reservation)
        setCustomerInform(customerInformation)
        setCarInformation(car)
        console.log(reservinform)
       
        navigate('/invoice')

    }
    return (
        <div>
            <div className='flex justify-between items-center'>
                <p className='font-bold'>Reservations</p>
                <button onClick={handelPrint} className='font-bold bg-[#5D5CFF] p-2 rounded'>Print/Download</button>
            </div>
            <div className='grid grid-cols-3 justify-between gap-5'>
                <div>
                    <div>
                        <h1>Reservation Details</h1>
                        <hr className='border-[#5D5CFF] font-bold' />
                        <label className="form-control border-[#DFDFFF] border-solid border p-4 mt-2 rounded w-full">
                            <div className="label">
                                <span className="label-text">Reservation Id</span>
                            </div>
                            <input
                                type="text"
                                name="id"
                                value={reservation.id}
                                onChange={handleReservationChange}
                                className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                            />

                            <div className="label">
                                <span className="label-text">Pickup Date</span>
                            </div>
                            <input
                                type="date"
                                name="pickupDate"
                                value={pickupDate}
                                onChange={handlePickupDateChange}
                                className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                                required
                            />

                            <div className="label">
                                <span className="label-text">Return Date</span>
                            </div>
                            <input
                                type="date"
                                name="returnDate"
                                value={returnDate}
                                onChange={handleReturnDateChange}
                                className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                                required
                            />

                            <div className="label">
                                <span className="label-text">Duration</span>
                            </div>
                            <input
                                type="text"
                                value={`${weeks} weeks ${dayes} days`}
                                className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                                readOnly
                            />

                            <div className="label">
                                <span className="label-text">Discount</span>
                            </div>
                            <input
                                type="text"
                                name="discount"
                                value={reservation.discount}
                                onChange={handleReservationChange}
                                className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                            />
                        </label>
                    </div>
                    <div>
                        <h1>Vehicle Information</h1>
                        <hr className='border-[#5D5CFF] font-bold' />
                        <label className="form-control border-[#DFDFFF] border-solid border p-4 mt-2 rounded w-full">
                            <div className="label">
                                <span className="label-text">Vehicle Type</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Car</option>
                                <option>Bike</option>
                                <option>CNG</option>
                            </select>
                            <div className="label">
                                <span className="label-text">Vehicle</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs">
                                <option disabled selected>{product?.model}</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div>
                    <h1>Customer Information</h1>
                    <hr className='border-[#5D5CFF] font-bold' />
                    <label className="form-control border-[#DFDFFF] border-solid border p-4 mt-2 rounded w-full">
                        <div className="label">
                            <span className="label-text">First Name</span>
                        </div>
                        <input
                            type="text"
                            name="firstName"
                            value={customerInformation.firstName}
                            onChange={handleCustomerChange}
                            className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                        />

                        <div className="label">
                            <span className="label-text">Last Name</span>
                        </div>
                        <input
                            type="text"
                            name="lastName"
                            value={customerInformation.lastName}
                            onChange={handleCustomerChange}
                            className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                            required
                        />

                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={customerInformation.email}
                            onChange={handleCustomerChange}
                            className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                            required
                        />

                        <div className="label">
                            <span className="label-text">Phone Number</span>
                        </div>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={customerInformation.phoneNumber}
                            onChange={handleCustomerChange}
                            className="input input-bordered border-[#DFDFFF] w-full max-w-xs"
                        />
                    </label>
                    <div>
                        <h1>Additional Charge</h1>
                        <hr className='border-[#5D5CFF] font-bold' />
                        <table className='border w-full rounded-2 border-[#DFDFFF] mt-2 '>
                            {options.map((option) => (
                                <tr key={option.name} className='m-2 text-start'>
                                    <td className='p-4'>
                                        <input
                                            name={option.name}
                                            checked={selectedOptions[option.name]}
                                            onChange={handleCheckboxChange}
                                            type="checkbox"
                                        /> {option.label}
                                    </td>
                                    <td>{option.cost}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
                <div>
                    <h1>Charge Summary</h1>
                    <hr className='border-[#5D5CFF] font-bold' />
                    <table className='border w-full mt-2 border-[#DFDFFF]'>
                        <tr className='w-full'>
                            <td className='p-4 me-6'>Charge</td>
                            <td className='p-4'>Unit</td>
                            <td className='p-4'>Rate</td>
                            <td className='p-4'>Total</td>
                        </tr>
                        <tr className='w-full'>
                            <td className='p-4 me-6'>Daily</td>
                            <td className='p-4'>{dayes}</td>
                            <td className='p-4'>{product?.rates?.daily || 0}</td>
                            <td className='p-4'>{dayes * (product?.rates?.daily || 0)}</td>
                        </tr>
                        <tr className='w-full'>
                            <td className='p-4 me-6'>Weekly</td>
                            <td className='p-4'>{weeks}</td>
                            <td className='p-4'>{product?.rates?.weekly || 0}</td>
                            <td className='p-4'>{weeks * (product?.rates?.weekly || 0)}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Total</td>
                            <td></td>
                            <td></td>
                            <td className='font-bold'>{(weeks * (product?.rates?.weekly || 0)) + (dayes * (product?.rates?.daily || 0))}</td>
                        </tr>
                        <ul>
                            {/* {selectedOptionsData.map(option => (
                            <li key={option.name}>
                                {option.label}: ${option.cost}
                            </li>
                        ))} */}
                        </ul>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
