import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


const myIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const isanBounds = [
  [14.0, 101.0], 
  [18.5, 105.0], 
];

// รายชื่อจังหวัดในภาคอีสานพร้อมพิกัดและรูปภาพ
const isanProvinces = [
  { 
    name: "นครราชสีมา", 
    lat: 14.9799, 
    lng: 102.0977,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Korat_city_gate.jpg/250px-Korat_city_gate.jpg",
    description: "นครราชสีมา หรือ โคราช เป็นประตูสู่อีสาน"
  },
  { 
    name: "ขอนแก่น", 
    lat: 16.4322, 
    lng: 102.8236,
    image: "https://www.mbkg.co.th/storage/newsroom/video/2022/12/20221201-1.jpg",
    description: "ขอนแก่นเป็นศูนย์กลางเศรษฐกิจและการศึกษาในอีสาน"
  },
  { 
    name: "อุบลราชธานี", 
    lat: 15.228, 
    lng: 104.859,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Ubon_Ratchathani_Candle_Festival.jpg/250px-Ubon_Ratchathani_Candle_Festival.jpg",
    description: "อุบลราชธานีมีประเพณีแห่เทียนพรรษาที่โดดเด่น"
  },
  { 
    name: "สกลนคร", 
    lat: 17.168, 
    lng: 104.148,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Sakon_Nakhon_Lake.jpg/250px-Sakon_Nakhon_Lake.jpg",
    description: "สกลนครมีทะเลสาบที่สวยงามและเป็นเมืองพระพุทธศาสนา"
  },
];

const MyLocationMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (
            latitude >= isanBounds[0][0] &&
            latitude <= isanBounds[1][0] &&
            longitude >= isanBounds[0][1] &&
            longitude <= isanBounds[1][1]
          ) {
            setPosition([latitude, longitude]);
          } else {
            setPosition([16.4322, 102.8236]); 
          }
        },
        (error) => {
          console.error("ไม่สามารถเข้าถึงตำแหน่ง:", error);
          setPosition([16.4322, 102.8236]); 
        }
      );
    }
  }, []);

  return (
    <div className="flex ml-60" >
      <div className="w-full h-full">
        <MapContainer
          center={[16.4322, 102.8236]} 
          zoom={8}
          style={{ height: "800px", width: "100%" }}
          maxBounds={isanBounds} 
          maxBoundsViscosity={1.0} 
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* แสดง Marker ตำแหน่งของผู้ใช้ */}
          {position && (
            <Marker position={position} icon={myIcon}>
              <Popup>ตำแหน่งของคุณอยู่ที่นี่! 📍</Popup>
            </Marker>
          )}

          {/* แสดง Marker สำหรับจังหวัดในภาคอีสาน */}
          {isanProvinces.map((province, index) => (
            <Marker key={index} position={[province.lat, province.lng]} icon={myIcon}>
             <Popup className="w-[250px] text-left">
                <div className="flex flex-col items-start">
                  <img src={province.image} alt={province.name} className="w-full h-auto rounded-lg mb-2" />
                  <h3 className="text-lg font-bold mb-1">{province.name}</h3>
                  <p className="text-sm text-gray-600">{province.description}</p>
                </div>
              </Popup>

            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MyLocationMap;
