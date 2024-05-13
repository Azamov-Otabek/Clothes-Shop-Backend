import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from "react-router-dom";
import App from "../App";
import {Login, Register, Catergory, SingleProduct, Products, UsersList, Worker} from '@pages'
import {Admin, User} from '@layout'

export default function Router(){
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route index element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/admin/*" element={<Admin/>}>
                    <Route index element={<UsersList/>}/>
                    <Route path="userlist" element={<UsersList/>}/>
                    <Route path="worker" element={<Worker/>}/>
                    <Route path="category" element={<Catergory/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="wiewproduct" element={<SingleProduct/>}/>
                    
                </Route>
                <Route path="/user/*" element={<User/>}>
                    <Route path="category" element={<Catergory/>}/>
                    <Route path="products" element={<Products/>}/>
                    <Route path="singleProduct" element={<SingleProduct/>}/>
                </Route>

                
            </Route>
        )
    )

    return <RouterProvider router={root} />
}