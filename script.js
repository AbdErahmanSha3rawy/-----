if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ar`)
        .then(res => res.json())
        .then(data => {
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".day-buttons").style.display = "flex";

             document.querySelector(".icon").style.display ="none";
            const city = data.address.city || data.address.town || data.address.village || "غير معروفة";
           document.getElementById("city").innerText =  ` ${city}`  ;
      });

        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=relative_humidity_2m&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`)
        .then(res => res.json())
        .then(data => {
 const days = data.daily.time; 
    const maxTemps = data.daily.temperature_2m_max;
    const minTemps = data.daily.temperature_2m_min;
    const codes = data.daily.weathercode;

    const weekDays = ["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];

    for(let i = 0; i < days.length; i++){
        const date = new Date(days[i]);
        const dayName = weekDays[date.getDay()]; 
        
    }
    const today = new Date();
const now_day = weekDays[today.getDay()];
document.getElementById("day").innerText =
              now_day ;
              const time1=data.current_weather.time;
             document.getElementById("day2").innerText =
               time1.split("T")[0];  
            document.getElementById("temp").innerText =
               "°C" + "  درجة الحرارة : " + data.current_weather.temperature ;
               
                 document.getElementById("windspeed").innerText =
                  "     سرعة الرياح :  " +data.current_weather.windspeed+"  كم/س " ;
                  let humidity = data.hourly.relative_humidity_2m[0];


const humidityLevels = [
  {max: 20, feeling: "جفاف شديد"},
  {max: 30, feeling: "جاف"},
  {max: 50, feeling: "مريح"},
  {max: 60, feeling: "مائل للرطوبة"},
  {max: 70, feeling: "رطب"},
  {max: 80, feeling: "رطوبة عالية"},
  {max: 90, feeling: "رطوبة عالية جدًا"},
  {max: 100, feeling: "خانق جدًا"}
];
let feeling = humidityLevels.find(h => humidity <= h.max).feeling;

                   document.getElementById("Humidity").innerText =
                  "      الرطوبة :  " +"  % "+data.hourly.relative_humidity_2m[0] +"  "+   `( ${feeling} ) `+" " ;
               
let dir = data.current_weather.winddirection;   
const directions = [
{min: 337.5, max: 360, name: "شمالية"},
{min: 0, max: 22.5, name: "شمالية"},
{min: 22.5, max: 67.5, name: "شمالية شرقية"},
{min: 67.5, max: 112.5, name: "شرقية"},
{min: 112.5, max: 157.5, name: "جنوبية شرقية"},
{min: 157.5, max: 202.5, name: "جنوبية"},
{min: 202.5, max: 247.5, name: "جنوبية غربية"},
{min: 247.5, max: 292.5, name: "غربية"},
{min: 292.5, max: 337.5, name: "شمالية غربية"}
];
let direction = directions.find(d => dir >= d.min && dir < d.max).name;


 document.getElementById("winddirection").innerText =
             "      اتجاه الرياح  :  "+"  "+  data.current_weather.winddirection +"  "+   `( ${direction} ) `+" " ;
    
let code = data.current_weather.weathercode;
let code2;
let weather = {
0: {text: "سماء صافية", icon: "☀️"},
1: {text: "غيوم خفيفة", icon: "🌤"},
2: {text: "غيوم", icon: "⛅"},
3: {text: "غيوم كثيفة", icon: "☁️"},

45: {text: "ضباب", icon: "🌫"},
48: {text: "ضباب متجمد", icon: "🌫"},

51: {text: "رذاذ خفيف", icon: "🌦"},
53: {text: "رذاذ متوسط", icon: "🌦"},
55: {text: "رذاذ كثيف", icon: "🌧"},
56: {text: "رذاذ متجمد خفيف", icon: "🌧"},
57: {text: "رذاذ متجمد كثيف", icon: "🌧"},

61: {text: "مطر خفيف", icon: "🌦"},
63: {text: "مطر متوسط", icon: "🌧"},
65: {text: "مطر غزير", icon: "🌧"},
66: {text: "مطر متجمد خفيف", icon: "🌧"},
67: {text: "مطر متجمد غزير", icon: "🌧"},

71: {text: "ثلج خفيف", icon: "❄️"},
73: {text: "ثلج متوسط", icon: "❄️"},
75: {text: "ثلج كثيف", icon: "❄️"},
77: {text: "حبيبات ثلج", icon: "❄️"},

80: {text: "زخات مطر خفيفة", icon: "🌦"},
81: {text: "زخات مطر متوسطة", icon: "🌧"},
82: {text: "زخات مطر غزيرة", icon: "🌧"},

85: {text: "زخات ثلج خفيفة", icon: "❄️"},
86: {text: "زخات ثلج كثيفة", icon: "❄️"},

95: {text: "عاصفة رعدية", icon: "⛈"},
96: {text: "عاصفة رعدية مع برد خفيف", icon: "⛈"},
99: {text: "عاصفة رعدية مع برد شديد", icon: "⛈"}
};
 document.getElementById("weathercode").innerText =
             "       حالة الطقس  :  "+"  "+ "  "+   `( ${weather[code].icon + " " + weather[code].text} ) `+" " ;
    

       const buttonsContainer = document.getElementById("day-buttons");
        const forecastDetails = document.getElementById("forecast-details");

        buttonsContainer.innerHTML = "";

        const todayIndex = new Date().getDay();
        const startIndex = 1; 

        for (let i = startIndex; i < days.length; i++) {
            const dateObj = new Date(days[i]);
            const dayName = weekDays[dateObj.getDay()];

            const btn = document.createElement("button");
            btn.innerText = dayName;

            btn.addEventListener("click", () => {
                document.getElementById("forecast-day").innerText = dayName;
                document.getElementById("min-temp").innerText = `°C   الصغري:      ${minTemps[i]} `;
                document.getElementById("max-temp").innerText = `°C العظمى: ${maxTemps[i]}`;
              code2=codes[i];
                document.getElementById("forecast-weather").innerText = `حالة الطقس: ( ${weather[code2].icon + " " + weather[code2].text} ) `; // لاحقًا ممكن نحول الكود لأيقونة + نص عربي
                forecastDetails.style.display = "block";
            });

            buttonsContainer.appendChild(btn);
        
}      
        });

    }, error => {
        console.error(error);
        alert("Cannot get your location");
    });
} else {
    alert("Geolocation is not supported by this browser.");
}





