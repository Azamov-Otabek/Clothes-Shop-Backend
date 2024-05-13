import { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';
import type { TableProps } from 'antd';
import { DataType } from '../../interface/global';
import { ZusCategory } from '@store';
import { useStore } from 'zustand';
import { GlobalTable, CategoryModal } from '@ui';
import { ToastContainer } from 'react-toastify';


function index() {
  const [ispage, setispage] = useState(1)
  const {datas, count, getCategory, isLoader, deleteCategory, postCategory, updateCategory} = useStore(ZusCategory)
  const limit = 5
  const lastcount = Math.ceil(count/limit)
  const getData = async() => {
    const user = {
      page: ispage,
      limit: limit,
    }
    await getCategory(user)
}

const thead: TableProps<DataType>['columns'] = [
  {
    title: 'Category name',
    dataIndex: 'category_name',
    key: 'category_name',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (__, _, i) => (
      <Space size="middle">
        <a><CategoryModal postData={updateData} text={updateData} item={datas[i].category_id}/></a>
        <a className='bg-[#151341] py-[7px] px-[15px] rounded-md text-white font-bold' onClick={() => deleteButton(datas[i].category_id)}>Delete</a>
      </Space>
    ),
  },
];
  async function deleteButton(id:any){
    console.log(id);
    await deleteCategory(id)
    getData()
  }

  async function postData(data:any){
    await postCategory(data)
    getData()
  }

  async function updateData(data:any){
    await updateCategory(data)
    getData()
  }
    useEffect(() => {
      getData()
    }, [ispage])
  return (
   <>
      <ToastContainer/>
      <div className='flex justify-end  py-5'><CategoryModal postData={postData} text={'add'} title={'Category'}/></div>
      {isLoader ?  <div className='flex justify-center mt-[200px]'> <Spin size="large" /></div> :
      <GlobalTable thead={thead} data={datas} lastcount={lastcount} setispage={setispage} ispage={ispage}/>}
     </>
  )
}

export default index
