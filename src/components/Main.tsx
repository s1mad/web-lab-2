import { useState, useEffect } from 'react';

interface WeatherData {
    location: {
        name: string;
        country: string;
        localtime: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
        };
        last_updated: string;
    };
    forecast: {
        forecastday: {
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
            };
        }[];
    };
}

function Main() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        if (weatherData === null) {
            fetchData();
        }
    }, [weatherData]);

    const fetchData = () => {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=d18f8eb0c67a4f8bad850325232712&q=Moscow&days=1&aqi=no&alerts=no&_=${Math.random()}`)
            .then(response => response.json())
            .then(data => setWeatherData(data))
            .catch(error => console.error('Error fetching weather data:', error));
    };

    return (
        <div>
            {weatherData ? (
                <div>
                    <h1>{weatherData.location.name}, {weatherData.location.country}</h1>
                    <p>Temperature: {weatherData.current.temp_c}°C</p>
                    <p>Condition: {weatherData.current.condition.text}</p>
                    <p>Max Temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</p>
                    <p>Min Temperature: {weatherData.forecast.forecastday[0].day.mintemp_c}°C</p>
                    <p>Last Updated: {weatherData.current.last_updated}</p>
                    <button onClick={() => setWeatherData(null)}>Refresh</button>
                    <p style={{position: 'absolute', bottom: -10, right: 10}}>Date and time of the last request: {weatherData.location.localtime}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Main;
