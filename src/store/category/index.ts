import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'
import { CategoryStore } from "../../interface/category";


const useCategoryStore = create <CategoryStore>((set) => ({
  isLoader: false,
  datas: [],
  count: 0,
  getCategory: async (payload) => {
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
  deleteCategory: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/category/${payload}`)
        if(response.status === 200){
          set((state:any) => ({
            datas: state.datas.filter((x:any) => x.id !== payload)
        }));
        toast.success('Category deleted successfully')
        }

        set({isLoader: false})
    }catch(e){
        console.log(e)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
    }
  },
  postCategory: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.post(`/category`, payload)
        if(response.status === 201){
          set((state:any) => ({
            datas: [...state.datas, response.data]
        }));
        toast.success('Category added successfully')
        set({isLoader: false})
        }
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }  
  },
  updateCategory: async (payload) => {
    try{
        set({isLoader: true})
        const response = await http.put(`/category`, payload)
        if(response.status === 200){
          set({datas: response?.data?.user})
        }
        toast.success('Catefory updated successfully')
        set({isLoader: false})
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }
  }
}));


export default useCategoryStore;