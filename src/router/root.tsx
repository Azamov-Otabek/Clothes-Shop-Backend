import { Products, UsersList, Categories, Worker} from "@pages";
import {UsergroupDeleteOutlined, ProductOutlined , ShoppingCartOutlined} from '@ant-design/icons'


export const root = [
    {
        name: "Users List",
        path: "/admin",
        element: <UsersList/>,
        icon: <UsergroupDeleteOutlined/>
    },
    {
        name: "Worker List",
        path: "/admin/worker",
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
    },
]