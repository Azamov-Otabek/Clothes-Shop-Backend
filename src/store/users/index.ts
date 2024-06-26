import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'
import { UserStore } from "../../interface/users";

const useUserStore = create <UserStore> ((set) => ({
  isLoader: false,
  data: [],
  count: 0,
  getUsers: async (payload) => {
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
        set({isLoader: false})
    }

  },
  deleteUsers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/user/${payload}`)
        if(response.status === 200){
          set((state:any) => ({
            data: state.data.filter((x:any) => x.id !== payload)
        }));
        toast.success('Users deleted successfully')
        }

        set({isLoader: false})
    }catch(e){
        console.log(e)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
    }
  },
  postUsers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.post(`/user`, payload)
        if(response.status === 201){
          set((state:any) => ({
            data: [...state.data, response.data]
        }));
        toast.success('Users added successfully')
        set({isLoader: false})
        }
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }  
  },
  updateUsers: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.put(`/user`, payload)
        if(response.status === 200){
          set({data: response?.data?.user})
        }
        toast.success('Users updated successfully')
        set({isLoader: false})
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }
  }
}));


export default useUserStore;