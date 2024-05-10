import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'

const useWorkerStore = create((set) => ({
  isLoader: false,
  data: [],
  count: 0,
  getWorkers: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.get(`/users?page=${payload.page}&limit=${payload.limit}`)
        if(response.status === 200){
          set({data: response?.data?.user})
          set({count: response?.data?.totcal_count})
        }
        set({isLoader: false})
    }catch(e){
        console.log(e)
    }

  },
  deleteWorkers: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/user/${payload}`)
        if(response.status === 200){
          set((state:any) => ({
            data: state.data.filter((x:any) => x.id !== payload)
        }));
        toast.success('Workers deleted successfully')
        }

        set({isLoader: false})
    }catch(e){
        console.log(e)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
    }
  },
  postWorkers: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.post(`/user`, payload)
        if(response.status === 201){
          set((state:any) => ({
            data: [...state.data, response.data]
        }));
        toast.success('Workers added successfully')
        }
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
      }  
  }
}));


export default useWorkerStore;