import { useEffect, useState } from "react";

import "./Clock.css";

const TIME_ZONE = "Asia/Ho_Chi_Minh";

const WEATHER_LAT = 10.8231;
const WEATHER_LON = 106.6297;

function Clock() {
  const [now, setNow] = useState(new Date());

  const [weather, setWeather] = useState({
    temperatureMin: null,
    temperatureMax: null,
    windSpeed: null,
    rain: null,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ================================
  // WEATHER API
  // ================================
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${WEATHER_LAT}` +
          `&longitude=${WEATHER_LON}` +
          `&current=wind_speed_10m,precipitation` +
          `&daily=temperature_2m_min,temperature_2m_max` +
          `&timezone=${encodeURIComponent(TIME_ZONE)}` +
          `&forecast_days=1`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Weather API request failed");
        }

        const data = await response.json();

        setWeather({
          temperatureMin: Math.round(data.daily.temperature_2m_min[0]),
          temperatureMax: Math.round(data.daily.temperature_2m_max[0]),
          windSpeed: Math.round(data.current.wind_speed_10m),
          rain: Number(data.current.precipitation).toFixed(1),
        });
      } catch (error) {
        console.error("Weather error:", error);
      }
    };

    fetchWeather();

    // Cập nhật thời tiết mỗi 10 phút
    const weatherTimer = setInterval(fetchWeather, 10 * 60 * 1000);

    return () => clearInterval(weatherTimer);
  }, []);

  // ================================
  // ANALOG CLOCK
  // ================================

const saigonTime = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
}).formatToParts(now);

let hours = Number(
  saigonTime.find((part) => part.type === "hour")?.value
);

const minutes = Number(
  saigonTime.find((part) => part.type === "minute")?.value
);

const seconds = Number(
  saigonTime.find((part) => part.type === "second")?.value
);

// Một số browser có thể trả 24:xx lúc bắt đầu ngày
if (hours === 24) {
  hours = 0;
}

const secondDeg = seconds * 6;
const minuteDeg = minutes * 6 + seconds * 0.1;
const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  // ================================
  // DIGITAL TIME
  // ================================

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  const date = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(now);

  const ticks = Array.from({ length: 12 }, (_, index) => index);

  return (
    <div className="clock-widget">

      {/* ANALOG CLOCK */}
      <div className="analog-clock">

        {ticks.map((tick) => (
          <span
            key={tick}
            className="clock-tick"
            style={{
              transform: `rotate(${tick * 30}deg)`,
            }}
          />
        ))}

        <span
          className="clock-hand clock-hour"
          style={{
            transform: `rotate(${hourDeg}deg)`,
          }}
        />

        <span
          className="clock-hand clock-minute"
          style={{
            transform: `rotate(${minuteDeg}deg)`,
          }}
        />

        <span
          className="clock-hand clock-second"
          style={{
            transform: `rotate(${secondDeg}deg)`,
          }}
        />

        <span className="clock-center" />
      </div>

      {/* CLOCK INFO */}
      <div className="clock-info">

        <div className="clock-city">
          Saigon
        </div>

        <div className="clock-time">
          {time}
        </div>

        <div className="clock-date">
          {date}
          <span className="clock-separator">•</span>
          GMT+7
        </div>

      </div>

      {/* WEATHER */}
      <div className="clock-weather">

        <div className="weather-temperature">
          {weather.temperatureMin !== null &&
          weather.temperatureMax !== null
            ? `${weather.temperatureMin}–${weather.temperatureMax}°C`
            : "--°C"}
        </div>

      <div className="weather-details">

  <div className="weather-detail">
    <span className="weather-label">
      Wind
    </span>

    <span className="weather-value">
      {weather.windSpeed !== null
        ? `${weather.windSpeed} km/h`
        : "-- km/h"}
    </span>
  </div>

  <div className="weather-detail">
    <span className="weather-label">
      Rain
    </span>

    <span className="weather-value">
      {weather.rain !== null
        ? `${weather.rain} mm`
        : "-- mm"}
    </span>
  </div>

</div>

      </div>

    </div>
  );
}

export default Clock;