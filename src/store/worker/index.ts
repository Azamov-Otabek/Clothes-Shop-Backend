import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'
import { WorkerStore } from "../../interface/workers";

const useWorkerStore =  create <WorkerStore> ((set) => ({
  isLoader: false,
  data: [],
  count: 0,
  getWorkers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.get(`/workers?page=${payload.page}&limit=${payload.limit}`)
        if(response.status === 200){
          set({data: response?.data?.user})
          set({count: response?.data?.totcal_count})
        }
        set({isLoader: false})
    }catch(e){
        console.log(e)
        set({isLoader: false})
    }

  },
  deleteWorkers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/worker/${payload}`)
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
  postWorkers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.post(`/worker`, payload)
        if(response.status === 201){
          set((state:any) => ({
            data: [...state.data, response.data]
        }));
        toast.success('Workers added successfully')
        set({isLoader: false})
        }
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }  
  },
  updateWorkers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.put(`/worker`, payload)
        if(response.status === 200){
          set({data: response?.data?.user})
        }
        toast.success('Workers updated successfully')
        set({isLoader: false})
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }
  }
}));


export default useWorkerStore;