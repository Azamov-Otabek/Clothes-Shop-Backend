import { Table } from 'antd';
import './style.css'
import { useEffect } from 'react';

function index(props:any) {

  function checkPogination(){
    if(props.ispage > props.lastcount)
      props.setispage(1)
  }

  useEffect(()=>{
    checkPogination()
  }, props.ispage)

  return (
   <>
      <div>
        <Table columns={props.thead} dataSource={props?.data?.map((e:any,i:number ) => {
          return {...e, key: i }
        })} pagination={false}  rowClassName={(_, index) => {
          // return a class name based on record or index
          return index % 2 === 0 ? 'even-row' : 'odd-row';
        }}/>
      </div>
      
      {
        props.lastcount == 1 || props.lastcount == 0 ? '' : <div className='flex justify-center items-center gap-3 mt-[30px]'>
        <button onClick={() => props.setispage(props.ispage - 1)} disabled={props.ispage == 1 ? true : false} className='bg-[#3D94FF] py-[6px] px-[8px] rounded-xl text-[white] font-bold'>back</button>
        <button className='cursor-auto font-bold '>{props.ispage}</button>
        <button onClick={() => props.setispage(props.ispage + 1) } disabled={props.ispage == props.lastcount && true || props.lastcount == 0 && true} className='bg-[#3D94FF] py-[6px] px-[8px] rounded-xl text-[white] font-bold'>next</button>
      </div> 
      }
   </>
  )
}

export default index
