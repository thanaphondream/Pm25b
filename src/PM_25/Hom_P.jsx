import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTemperatureQuarter } from "react-icons/fa6";
import { MdOutlineWindPower } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import { RiExpandHeightFill } from "react-icons/ri"
import { FaLeaf } from "react-icons/fa6";
import { GiDustCloud } from "react-icons/gi";
import IssanMap from './IssanMap';


function Hom_P() {
  const [airisan, setAirisan] = useState({});
  const [currentDate, setCurrentDate] = useState('');
  const { datas } = IssanMap() || 1
  console.log(datas.en,"222  ")

  useEffect(() => {
    const fetchAirisanData = async () => {
      try {
       if(datas){
        const response = await axios.get(`http://localhost:4002/airisan_province/Ban_Muang`);
        console.log(response.data, 1155)
        setAirisan(response.data.check_airisans_province_now_ || response.data.check_airisansdistricts_province || check_airisans_province_now_);
       }
      } catch (err) {
        console.error('Error fetching airisan data:', err);
      }
    };
    fetchAirisanData();
  },[datas.en]);

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
      const months = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", 
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", 
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];

      const dayName = days[date.getDay()]; 
      const day = date.getDate(); 
      const monthName = months[date.getMonth()]; 
      const year = date.getFullYear() + 543;

      const formattedDate = `วัน${dayName} ${day} ${monthName} ${year}`;
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  const check_pm = () => {
    if(airisan.PM25 >= 30){
        return(
          <>
            <div className='p-7  bg-red-500 text-center w-[40%] rounded-4xl gap-2'>
          <p className='font-bold text-4xl'>ค่า PM2.5: {airisan.PM25 || 'กำลังโหลด...'}</p>
        </div>
        <div className='p-7  bg-red-500 text-center w-[40%] rounded-4xl gap-2'>
          <p className='font-bold text-4xl'>ค่าความสูง: {airisan.dust_height || 'กำลังโหลด...'}</p>
        </div>
          </>
        )
    }else{
      return(
        <>
          <div className='p-7  bg-green-500 text-center w-[40%] rounded-4xl gap-2'>
          <p className='font-bold text-4xl'>ค่า PM2.5: {airisan.PM25 || 'กำลังโหลด...'}</p>
        </div>
        <div className='p-7  bg-green-500 text-center w-[40%] rounded-4xl gap-2'>
          <p className='font-bold text-4xl'>ค่าความสูง: {airisan.dust_height || 'กำลังโหลด...'}</p>
        </div>
        </>
      )
    }
  }

  return (
    <div className='bg-gradient-to-r from-green-200 to-blue-300'>
      <div className='p-3 text-3xl text-center'>
        <p className='text-red-600 text-4xl'>PM2.5</p>
        <br/>
        <p className='text-4xl'>{currentDate}</p>
      </div>

      <div className=' justify-center flex flex-wrap gap-1.5'>
          {check_pm()}

          <div className='justify-center w-[80%] p-6 m-5 rounded-3xl flex flex-wrap gap-5 shadow-xl'>

  <div className='bg-blue-50 h-36 w-[47%] rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 items-center'>
    <div className='m-7 flex flex-col items-center justify-center '>
    <FaTemperatureQuarter className='text-4xl' />
      <p className='text-center   text-gray-700 text-lg font-semibold'>อุณหภูมิ</p>
      <p className='text-center text-blue-600 text-2xl font-bold mt-2'>{airisan.temperature} °C</p>
    </div>
  </div>

  <div className='bg-blue-50 h-36 w-[47%] rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300'>
    <div className='m-7 flex flex-col items-center justify-center'>
    <MdOutlineWindPower className='text-4xl' />
      <p className='text-center text-gray-700 text-lg font-semibold'>ความเร็วลม</p>
      <p className='text-center text-blue-600 text-2xl font-bold mt-2'>{airisan.wind_speed} m/s</p>
    </div>
  </div>

  <div className='bg-blue-50 h-36 w-[47%] rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300'>
    <div className='m-7 flex flex-col items-center justify-center'>
      <WiHumidity  className='text-4xl' />
      <p className='text-center text-gray-700 text-lg font-semibold'>ความชื้นสัมพัทธ์</p>
      <p className='text-center text-blue-600 text-2xl font-bold mt-2'>{airisan.relative_hamidity} %</p>
    </div>
  </div>

  <div className='bg-blue-50 h-36 w-[47%] rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300'>
    <div className='m-7 flex flex-col items-center justify-center'>
      <RiExpandHeightFill className='text-4xl' />
      <p className='text-center text-gray-700 text-lg font-semibold'>ความสูงขั้นขอบเขต</p>
      <p className='text-center text-blue-600 text-2xl font-bold mt-2'>{airisan.layer_heigh} %</p>
    </div>
  </div>


  <div className='bg-blue-50 h-36 w-[47%] rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300'>
    <div className='m-7 flex flex-col items-center justify-center'>
      <FaLeaf className='text-4xl' />
      <p className='text-center text-gray-700 text-lg font-semibold'>ค่าดัชนีพืชพรรณ</p>
      <p className='text-center text-blue-600 text-2xl font-bold mt-2'>{airisan.vegetation} </p>
    </div>
  </div>

  <div className='bg-blue-50 h-36 w-[47%] rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300'>
    <div className='m-7 flex flex-col items-center justify-center'>
    <GiDustCloud className='text-4xl'/>
      <p className='text-center text-gray-700 text-lg font-semibold'>ค่าความลึกเชิงแสงของฝุ่นละออง</p>
      <p className='text-center text-blue-600 text-2xl font-bold mt-2'>{airisan.ododp} </p>
    </div>
  </div>
    </div>
      </div>
      <div className="flex justify-center items-center">
    <p>ข้อมูลจาดกจุดตรวจวัดพื้นที่: {airisan.province}</p>
</div>

    </div>
  );
}

export default Hom_P;