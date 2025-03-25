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
    const provinces = [
      { en: "Amnat Charoen", th: "จังหวัดอำนาจเจริญ" },
      { en: "Bueng Kan", th: "จังหวัดบึงกาฬ" },
      { en: "Buri Ram", th: "จังหวัดบุรีรัมย์" },
      { en: "Chaiyaphum", th: "จังหวัดชัยภูมิ" },
      { en: "Kalasin", th: "จังหวัดกาฬสินธุ์" },
      { en: "Khon Kaen", th: "จังหวัดขอนแก่น" },
      { en: "Loei", th: "จังหวัดเลย" },
      { en: "Maha Sarakham", th: "จังหวัดมหาสารคาม" },
      { en: "Mukdahan", th: "จังหวัดมุกดาหาร" },
      { en: "Nakhon Phanom", th: "จังหวัดนครพนม", maps: "Nakhon Phanom Province"},
      { en: "Nakhon Ratchasima", th: "จังหวัดนครราชสีมา" },
      {en: "SakhonNakhon", th:"จังหวัดสกลนคร"},
      {en: "", th: "จังหวัดร้อยเอ็ด"}
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
        for(i in sakonNakhonDistricts){
          // console.log(sakonNakhonDistricts[i].th)
          if(data.sakonNakhonDistricts === sakonNakhonDistricts[i].th){
            // console.log(sakonNakhonDistricts[i], fff)
            setDatas(sakonNakhonDistricts[i])
            break;
          }
        }
      }else{
        provinces.map((P) => {
          if(data.province === P.th || data.province === P.maps){
            setDatas(P)
            console.log(P, 111)
          }  

        })
      }
    }else{ 
      console.log("error")
    }


  }

  return {datas}
};

export default IssanMap;
