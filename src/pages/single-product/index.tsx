import Cookies from "js-cookie"
import { ZusProduct, ZusCategory, ZusMedia } from "@store"
import { useStore } from "zustand"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ProductModal from "../../components/ui/product-modal"
import { Button } from "antd"
import { ToastContainer } from "react-toastify"
import { Image } from 'antd';
function index() {
  const { getProductbyId, idData, deleteProduct, updateProduct}:any = useStore(ZusProduct)
  const { datas, getCategory}:any = useStore(ZusCategory)
  const { getMedia, deleteMedia, postMedia}:any = useStore(ZusMedia)
  const [img, setimg] = useState('')
  const id = Cookies.get('id')
  const navigate = useNavigate()

  async function getDataa(){
    getProductbyId(id)
    getCategory({page: 1, limit: 1000})
    const response = await getMedia(id)
    setimg(response?.data?.images[response?.data?.images?.length - 1].image_url)
  }
  
  async function deleteData(){
    await deleteProduct(id)
    setTimeout(() => {
      navigate('/admin/products')
    }, 1400);
  }

  async function updateData(e:any){
    e.product_id = idData.product_id
    await updateProduct(e)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }

  async function deleteImg(){
    await deleteMedia(id)
    getDataa()
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  }

  async function updateImg(e:any){
    const file = e.target.files[0];
    const payload = {
      upload_photo: file,
      id: id,
    }
    await postMedia(payload)
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  };

  useEffect(() => {
    getDataa()
  }, [])
  return (
    <>
    <ToastContainer />
      <div className="border justify-center mt-[50px] flex w-[1100px] mx-auto">
          <Image width={500} height={520}  src={img}/>
        <div className="card-body  bg-[#001529] text-[white] rounded-r-xl p-[40px] w-[600px]">
          <p className="text-[20px]">Name: {idData.product_name}</p>
          <p className="text-[20px]">Description: 
          {idData.description}</p>
          <p className="text-[20px]">Max age: {idData.age_max}</p>
          <p className="text-[20px]">Min age: {idData.age_max}</p>
          <p className="text-[20px]">Narxi: {idData.cost}$</p>
          <p className="text-[20px]">Soni: {idData.count}</p>
          <p className="text-[20px]">Size: {idData.size}</p>
          <p className="text-[20px]">Size: {idData.color}</p>
          <p className="text-[20px]">Made in: {idData.made_in}</p>
          <p className="text-[20px]">Discount: {(idData.cost - (idData.cost / 100 * idData.discount))}$</p>
          <p className="text-[20px]">Gender for: {idData.for_gender}</p>
          <div className="flex gap-[30px] mb-[20px] mt-[20px]">
              <ProductModal datas={datas} text={idData} title={'Update'} postData={updateData}/>
              <Button onClick={() => deleteData()} type="primary" className='flex items-center text-[16px] font-semibold'>Delete Product</Button>   
          </div>
          <div className="flex gap-[30px] relative">
              <Button type="primary" className='flex items-center text-[16px] font-semibold'>Update Image</Button>   
              <Button onClick={() => deleteImg()} type="primary" className='flex items-center text-[16px] font-semibold'>Delete Image</Button>   
              <input onChange={(e) => updateImg(e)} type="file" accept="image/*" className="absolute left-[66px] top-1 opacity-0 w-[130px]"/>
          </div>
        </div>

    </div>
    </>

    
  )
}

export default index

