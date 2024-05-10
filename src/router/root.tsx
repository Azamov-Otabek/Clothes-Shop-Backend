import { Products, Worker, Categories,   } from "@pages";
import {UsergroupDeleteOutlined, ProductOutlined , ShoppingCartOutlined} from '@ant-design/icons'


export const root = [
    {
        name: "Workers",
        path: "/admin",
        element: <Worker/>,
        icon: <UsergroupDeleteOutlined/>
    },
    {
        name: "Products",
        path: "/admin/products",
        element: <Products/>,
        icon: <ShoppingCartOutlined/>
    },
    {
        name: "Categories",
        path: "/admin/category",
        element: <Categories/>,
        icon: <ProductOutlined/>
    }
]