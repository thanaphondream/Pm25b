import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const isanBounds = [
  [14.0, 101.0],
  [18.5, 105.0],
];

const MyLocationMap = () => {
  const [position, setPosition] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);

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

  useEffect(() => {
    const fetchAirQuality = async () => {
      try {
        const response = await axios.get("http://localhost:4002/airisan_");
        console.log(response.data.check_airisans_)
        if (Array.isArray(response.data.check_airisans_)) {
          setAirQualityData(response.data.check_airisans_);
        } else {
          console.error("Data format is incorrect:", response.data);
        }
      } catch (error) {
        console.error("Error fetching air quality data:", error);
      }
    };

    fetchAirQuality();
  }, []);

  const getIcon = (pm) => {
    let iconColor = "green"; 

    if (pm > 39 && pm <= 49) {
      iconColor = "yellow";
    } else if (pm >= 50 && pm <= 59) {
      iconColor = "orange"; 
    } else if (pm >= 60) {
      iconColor = "red"; 
    }

    return new L.divIcon({
      className: "pm-icon",
      html: `<div style="background-color:${iconColor}; color: white; border-radius: 50%; padding: 10px; font-size: 14px; text-align: center; width: 40px; height: 40px;">
              ${pm}
             </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -20],
    });
  };

  return (
    <div className="flex ml-60">
      <div className="w-full h-full">
        <MapContainer
          center={[16.4322, 102.8236]}
          zoom={8}
          style={{ height: "800px", width: "100%", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}
          maxBounds={isanBounds}
          maxBoundsViscosity={1.0}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
          {/* Marker ตำแหน่งของผู้ใช้ */}
          {/* {position && (
            <Marker position={position} icon={defaultIcon}>
              <Popup className="bg-white p-4 rounded-lg shadow-lg text-center">
                <h4 className="text-lg font-semibold">ตำแหน่งของคุณอยู่ที่นี่! 📍</h4>
              </Popup>
            </Marker>
          )} */}

          {/* Marker คุณภาพอากาศ */}
          {airQualityData &&
            airQualityData.map((air, index) => {
              const lat = air.airisan_imgae?.lat;
              const lng = air.airisan_imgae?.lng;
  
              if (!lat || !lng) {
                console.warn(`Skipping marker: Missing coordinates for entry ${index}`, air);
                return null;
              }

              const pm = air.PM25;

              return (
                <Marker key={index} position={[lat, lng]} icon={getIcon(pm)}>
                  <Popup className="bg-white p-4 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-semibold mb-2">{air?.airisan_imgae?.name_airisan_th || "No District"}</h3>
                    <p className="text-sm mb-2">{air.airisan_imgae?.description || "No Description Available"}</p>
                    <p className="text-sm mb-2">PM2.5: {pm}</p>
                    <img
                      src={air.airisan_imgae?.img}
                      alt="Location"
                      className="w-full h-auto rounded-lg shadow-md mb-2"
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </Popup>
                </Marker>
              );
            })}
        </MapContainer>
      </div>
    </div>
  );
};

export default MyLocationMap;
