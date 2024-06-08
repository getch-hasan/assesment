import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Product = ({ product }) => {
    const { id, make, model, year, type, seats, bags, features, rates, imageURL } = product
   
    const navigate=useNavigate()
    const handelBooking=()=>{
        navigate(`/form/${id}`)
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={imageURL} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {make}
                    <div className="badge badge-secondary">{model}</div>
                </h2>
                <p className='text-start'>Release {year}</p>
                <p className='text-start'>Type :{type}</p>
                <div className='text-start'>
                    <h1>Features : {features.map(iteam => <p className='ms-16' key={iteam.index}>{iteam}</p>)} </h1>
                </div>
                <div className='text-start'>
                    <h1>rates :
                        <p className='ms-12'>per hour: {rates.hourly}</p>
                        <p className='ms-12'>per day: {rates.daily}</p>
                        <p className='ms-12'>per hour: {rates.weekly}</p>
                    </h1>
                </div>
                <div className="card-actions justify-start">
                    <div className="badge badge-outline">seats:{seats}</div>
                    <div className="badge badge-outline">bags:{bags}</div>
                </div>
            </div>
            <button onClick={handelBooking} className='btn btn-primary rounded-md'>booking</button>
        </div>
    );
};

export default Product;