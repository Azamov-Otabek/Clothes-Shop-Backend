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

export interface WorkerStore {
    count: number;
    data: Data[];
    isLoader: boolean;
    getWorkers: (payload: getData) => any;
    deleteWorkers: (id: Delete) => any;
    updateWorkers: (payload: PutPostData) => any;
    postWorkers: (payload: PutPostData) => any;
  }

