import React, { useState, useEffect, use } from "react";
import axios from "axios";

const IssanMap = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [ datas, setDatas ] = useState([])

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            const data = await response.json();
            console.log(data.address.province)
            check_Pm25_province(data.address)
            setLocation(data.address.province); 
          } catch (err) {
            setError("ไม่สามารถดึงข้อมูลจังหวัดได้");
          }
        },
        (err) => {
          setError("ไม่สามารถเข้าถึงตำแหน่งของคุณได้");
        }
      );
    } else {
      setError("เบราว์เซอร์ของคุณไม่รองรับ Geolocation");
    }
  }, []);


  const check_Pm25_province  = (data ) => {
    console.log(data.province)
    const provinces = [
      { en: "Amnat Charoen", th: "อำนาจเจริญ" },
      { en: "Bueng Kan", th: "บึงกาฬ" },
      { en: "Buri Ram", th: "บุรีรัมย์" },
      { en: "Chaiyaphum", th: "ชัยภูมิ" },
      { en: "Kalasin", th: "กาฬสินธุ์" },
      { en: "Khon Kaen", th: "ขอนแก่น" },
      { en: "Loei", th: "เลย" },
      { en: "Maha Sarakham", th: "มหาสารคาม" },
      { en: "Mukdahan", th: "มุกดาหาร" },
      { en: "Nakhon Phanom", th: "นครพนม" },
      { en: "Nakhon Ratchasima", th: "นครราชสีมา" },
      {en: " SakhonNakhon", th:"จังหวัดสกลนคร"},
    ];
    
    const sakonNakhonDistricts = [
      { en: "Akat Amnuai", th: "อากาศอำนวย" },
      { en: "Ban Muang", th: "บ้านม่วง" },
      { en: "Charoen Sin", th: "เจริญศิลป์" },
      { en: "Kham Ta Kla", th: "คำตากล้า" },
      { en: "Khok Si Suphan", th: "โคกศรีสุพรรณ" },
      { en: "Kusuman", th: "กุสุมาลย์" },
      { en: "Kut Bak", th: "กุดบาก" },
      { en: "Mueang Sakon Nakhon", th: "เมืองสกลนคร" },
      { en: "Nikhom Nam Un", th: "นิคมน้ำอูน" },
      { en: "Phang Khon", th: "พังโคน" },
      { en: "Phanna Nikhom", th: "พรรณานิคม" },
      { en: "Phon Na Kaeo", th: "โพนนาแก้ว" },
      { en: "Phu Phan", th: "ภูพาน" },
      { en: "Sawang Daen Din", th: "สว่างแดนดิน" },
      { en: "Song Dao", th: "ส่องดาว" },
      { en: "Tao Ngoi", th: "เต่างอย" },
      { en: "Wanon Niwat", th: "วานรนิวาส" },
      { en: "Waritchaphum", th: "วาริชภูมิ" }
    ];
    
    if(data.province){
      if(data.sakonNakhonDistricts){
        console.log('dddd')
        for(i in sakonNakhonDistricts){
          console.log(sakonNakhonDistricts[i].th)
          if(data.sakonNakhonDistricts === sakonNakhonDistricts[i].th){
            console.log(sakonNakhonDistricts[i], fff)
            setDatas(sakonNakhonDistricts[i])
            break;
          }
        }
      }else{
        provinces.map((P) => {
          if(data.province === P.th){
            setDatas(P)
            console.log(P, 111)
          }

        })
      }
    }else{ 
      console.log("error")
    }


  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-lg font-bold">ค้นหาตำแหน่งปัจจุบัน</h1>
      {location ? (
        <p className="text-green-500 text-xl">คุณอยู่ที่จังหวัด: {location}</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>กำลังดึงข้อมูลตำแหน่ง...</p>
      )}
    </div>
  );
};

export default IssanMap;
