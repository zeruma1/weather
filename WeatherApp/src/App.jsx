import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState(''); 
  const [temperature, setTemperature] = useState(null); 
  const [weatherImage, setWeatherImage] = useState(''); 
  const [weatherDescription, setWeatherDescription] = useState('');
  const [inputCity, setInputCity] = useState(''); 

  
  const weatherImages = {
    'Clear': { image: 'icons/sunny.png', description: 'Солнечно' },
    'Rain': { image: 'icons/rain.png', description: 'Дождь' },
    'Snow': { image: 'icons/snow.png', description: 'Снег' },
    'Clouds': { image: 'icons/clouds.png', description: 'Облачно' },
    'Thunderstorm': { image: 'icons/storm.png', description: 'Гроза' },
    'Drizzle': { image: 'icons/sun-and-rain.png', description: 'Моросящий дождь' }
  };

 
  const fetchWeatherData = async (cityName) => {
    try {
      console.log(`Получение данных о погоде для города: ${cityName}`); 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cd28f2dbf69869dd11cc60647961746f&units=metric`);
      if (!response.ok) { 
        throw new Error('Ответ сети не был успешным'); 
      }
      const data = await response.json(); 
      console.log('Получены данные о погоде:', data); 

      setCity(data.name);
      console.log('Город установлен:', data.name);

      setTemperature(Math.round(data.main.temp)); 
      console.log('Температура установлена:', Math.round(data.main.temp));

      const weatherMain = data.weather[0].main; 
      console.log('Основное состояние погоды:', weatherMain);

      const weatherInfo = weatherImages[weatherMain]; 
      console.log('Информация о погоде:', weatherInfo);

      if (weatherInfo) {
        setWeatherImage(weatherInfo.image); 
        console.log('Изображение погоды установлено:', weatherInfo.image);

        setWeatherDescription(weatherInfo.description); 
        console.log('Описание погоды установлено:', weatherInfo.description);
      } else {
        setWeatherImage('');
        setWeatherDescription('');
        console.log('Изображение и описание погоды сброшены');
      }
    } catch (error) {
      console.error('Ошибка при получении данных о погоде:', error); 
    }
  };

  
  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log(`Форма отправлена с городом: ${inputCity}`); 
    fetchWeatherData(inputCity); 
  };

  return (
    <div className="App">
      <h1>УЗНАЙ ПОГОДУ В ЛЮБОМ МЕСТЕ</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)} 
          placeholder="Введите город"
        />
        <button type="submit"></button>
      </form>
      {city && temperature !== null && (
        <div className="weather-info">
          <div className="city">{city}</div> 
          <div className="temperature">{temperature}°C</div> 
          <div className="weather-description">{weatherDescription}</div>
          <img className="weather-image" src={weatherImage} alt="Иконка погоды" />
        </div>
      )}
    </div>
  );
}

export default App; 
