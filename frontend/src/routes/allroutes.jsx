import { Route, Routes } from "react-router-dom";
import { ProductDetails } from "../pages/details";
import { Products } from "../pages/products";


export function AllRoutes(){
    return(
        <>
        <Routes>

<Route path="/"  element={<Products/>} />
<Route path="/details/:id" element={<ProductDetails/>}/>
        </Routes>
        </>
    )
}