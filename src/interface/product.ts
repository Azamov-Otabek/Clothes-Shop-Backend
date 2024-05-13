export interface Data{
    age_max: number
    age_min: number
    category_id: string
    color: string
    cost: number
    count: number
    description: string
    discount: number
    for_gender: string
    made_in: string
    product_id: string
    product_name: string
    size: number
}

export interface PutPostData{
    age_max: number
    age_min: number
    category_id: string
    color: string
    cost: number
    count: number
    description: string
    discount: number
    for_gender: string
    made_in: string
    product_id: string
    product_name: string
    size: number
}


export interface Delete{
    id: string;
}

export interface getData{
    page: number;
    limit: number;
    name : string;
}

export interface idData{

}

export interface ProductStore {
    count: number;
    data: Data[];
    isLoader: boolean;
    idData: Data;
    getUsers: (payload: getData) => any;
    deleteUsers: (id: Delete) => any;
    updateUsers: (payload: PutPostData) => any;
    postUsers: (payload: PutPostData) => any;
  }
