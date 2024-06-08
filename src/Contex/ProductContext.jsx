import { Children, createContext, useEffect, useState } from "react";

export const ProductContext=createContext({})
export const ProductProvider=({children})=>{
    const [products,setProducts]=useState([])
    const [customerInformation, setCustomerInformation] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [reservinform,setReservinform]=useState({})
    const [customerInform,setCustomerInform]=useState({})
    const [carInformation,setCarInformation]=useState({})
    useEffect(()=>{
       fetch('https://exam-server-7c41747804bf.herokuapp.com/carsList')
       .then(res=>res.json())
       .then(data=>setProducts(data.data))
    },[])
    return <ProductContext.Provider value={{products,setProducts,
        customerInformation, setCustomerInformation,
        reservinform,setReservinform,
        customerInform,setCustomerInform,
        carInformation,setCarInformation
    }}>{children}</ProductContext.Provider>
}