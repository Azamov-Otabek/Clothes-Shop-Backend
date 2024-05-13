import Cookies from "js-cookie"
import { ZusProduct, ZusCategory } from "@store"
import { useStore } from "zustand"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ProductModal from "../../components/ui/product-modal"
import { Button } from "antd"
import { ToastContainer } from "react-toastify"

function index() {
  const { getProductbyId, idData, deleteProduct, updateProduct}:any = useStore(ZusProduct)
  const { datas, getCategory}:any = useStore(ZusCategory)
  const id = Cookies.get('id')
  const navigate = useNavigate()

  async function getDataa(){
    getProductbyId(id)
    getCategory({page: 1, limit: 1000})
  }
  
  async function deleteData(){
    await deleteProduct(id)
    setTimeout(() => {
      navigate('/admin/products')
    }, 1400);
  }

  async function updateData(e:any){
    e.product_id = idData.product_id
    updateProduct(e)
    navigate('/admin/products')
  }

  useEffect(() => {
    getDataa()
  }, [])
  return (
    <>
    <ToastContainer />
      <div className="max-w-[500px] mx-auto mt-[50px]">
          <img src="" alt="PRODUCT FOTO" />
        <div className="card-body text-center mt-[20px] bg-[#001529] text-[white] rounded-xl p-[40px]">
          <p className="text-[20px]">Name: {idData.product_name}</p>
          <p className="text-[20px]">Description: {idData.description}</p>
          <div className="flex justify-center text-center gap-3 ">
            <p className="text-[20px]">Max age: {idData.age_max}</p>
            <p className="text-[20px]">Min age: {idData.age_max}</p>
          </div>
          <div className="flex justify-center gap-3">
            <p className="text-[20px]">Narxi: {idData.cost}</p>
            <p className="text-[20px]">Soni: {idData.count}</p>
          </div>
          <p className="text-[20px]">Size: {idData.size}</p>
          <p className="text-[20px]">Made in: {idData.made_in}</p>
          <p className="text-[20px]">Discount: {idData.discount}</p>
          <p className="text-[20px]">Gender: {idData.for_gender}</p>
          <div className="flex gap-[30px] justify-center mb-[20px] mt-[20px]">
              <ProductModal datas={datas} text={idData} title={'Update'} postData={updateData}/>
              <Button onClick={() => deleteData()} type="primary" className='flex items-center text-[16px] font-semibold'>Delete Product</Button>   
          </div>
          <div className="flex gap-[30px] justify-center">
              <Button type="primary" className='flex items-center text-[16px] font-semibold'>Update Image</Button>   
              <Button type="primary" className='flex items-center text-[16px] font-semibold'>Delete Image</Button>   
          </div>
        </div>

    </div>
    </>

    
  )
}

export default index

