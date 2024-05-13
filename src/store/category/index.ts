import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'
import { postData, getData } from "../../interface/category";


const useCategoryStore = create((set) => ({
  isLoader: false,
  datas: [],
  count: 0,
  getCategory: async (payload:getData) => {
    try{
        set({isLoader: true})
        const response = await http.get(`/categories?page=${payload.page}&limit=${payload.limit}`)
        if(response.status === 200){
          set({datas: response?.data?.categories})
          set({count: response?.data?.total_count})
        }
        set({isLoader: false})
    }catch(e){
        console.log(e)
        set({isLoader: false})
    }

  },
  deleteCategory: async (payload:string) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/category/${payload}`)
        if(response.status === 200){
          set((state:any) => ({
            datas: state.data.filter((x:any) => x.id !== payload)
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
  postCategory: async (payload:postData) => {
    try{
        set({isLoader: true})
        const response = await http.post(`/category`, payload)
        if(response.status === 201){
          set((state:any) => ({
            datas: [...state.data, response.data]
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
  updateCategory: async (payload:postData) => {
    try{
        set({isLoader: true})
        const response = await http.put(`/category`, payload)
        if(response.status === 200){
          set({datas: response?.data?.user})
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


export default useCategoryStore;