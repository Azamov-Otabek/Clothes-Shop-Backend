export interface Data{
    category_id: string;
    category_name: string;
}

export interface PutPostData{
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    gender: string;
    age: number;
}


export interface Delete{
    id: string;
}

export interface getData{
    page: number;
    limit: number;
}

export interface CategoryStore {
    count: number;
    datas: Data[];
    isLoader: boolean;
    getCategory: (payload: getData) => any;
    deleteCategory: (id: Delete) => any;
    updateCategory: (payload: PutPostData) => any;
    postCategory: (payload: PutPostData) => any;
  }
