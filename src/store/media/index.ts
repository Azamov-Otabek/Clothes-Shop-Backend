import { create } from "zustand";
import http from "../../service/config";
import {toast} from 'react-toastify'
import axios from "axios";
import { getCookies } from "../../utils/cocies";


const useMedia = create((set) => ({
  postMedia: async (payload:any) => {
    try{
      const token = getCookies('token')
      const url = `http://store.go-clothes.uz:5555/v1/media/upload-photo?id=${payload.id}`;
      const formData = new FormData();
      formData.append("file", payload.upload_photo);

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`
        }
      });
        if(response.status === 200){  
            toast.success('Media uploaded successfully', {autoClose: 1000})
        }
    }catch(e){
        console.log(e);
        toast.error('Something went wrong', {autoClose: 1000})
    }

  },
  deleteMedia: async (payload:any) => {
    try{
        set({isLoader: true})
        const response = await http.delete(`/media/${payload}`)
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
  getMedia: async (payload:any) => {
    try{
        const response = await http.get(`/media/${payload}`)
        return response
      }catch(err){
        toast.error('Something went wrong', {autoClose: 1000})
      }  
  },
}));


export default useMedia;