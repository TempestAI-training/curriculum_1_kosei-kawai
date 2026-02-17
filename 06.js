const API = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo&forecast_days=1";
const getWeatherDate = async () => {
try {
const responce = await fetch(API); 
const data = await responce.json();
return data;
}catch (error) {
console.log("Error:", error);
throw error;
}
};
