import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'

const useProductStore = create ((set) => ({
  idData: [],
  isLoader: false,
  data: [],
  count: 0,
  getProduct: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.get(`/products?page=${payload.page}&limit=${payload.limit}&name=${payload.name}`)
        if(response.status === 200){
          set({data: response?.data?.products})
          set({count: response?.data?.total_count})
        }
        set({isLoader: false})
    }catch(e){
        console.log(e)
        set({isLoader: false})
    }

  },
  deleteProduct: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/product/${payload}`)
        if(response.status === 200){
          set((state:any) => ({
            data: state.data.filter((x:any) => x.id !== payload)
        }));
        toast.success('Product deleted successfully')
        }

        set({isLoader: false})
    }catch(e){
        console.log(e)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
    }
  },
  postProduct: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.post(`/product`, payload)
        if(response.status === 201){
          set((state:any) => ({
            data: [...state.data, response.data]
        }));
        toast.success('Product added successfully')
        set({isLoader: false})
        }
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }  
  },
  updateProduct: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.put(`/product`, payload)
        if(response.status === 200){
          set({data: response?.data?.user})
        }
        toast.success('Product updated successfully', {autoClose: 1000})
        set({isLoader: false})
      }catch(err){
        console.log(err)
        toast.error('Something went wrong', {autoClose: 1000})
        set({isLoader: false})
      }
  },
  getProductbyId: async(id:string) => {
    try{
      const response = await http.get(`/product/${id}`)
      if(response.status === 200){
        set({idData: response?.data})
      }
  }catch(e){
      console.log(e)
  }
  }
}));


export default useProductStore;