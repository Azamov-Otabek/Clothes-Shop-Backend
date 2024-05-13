export interface Data{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    gender: string;
    age: number;
    refresh_token: string;
    access_token: string;
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

export interface UserStore {
    count: number;
    data: Data[];
    isLoader: boolean;
    getUsers: (payload: getData) => any;
    deleteUsers: (id: Delete) => any;
    updateUsers: (payload: PutPostData) => any;
    postUsers: (payload: PutPostData) => any;
  }
