import { useEffect, useState } from "react";
import "./Loading.css";

function Loading({ onEnter }) {

    const [finish, setFinish] = useState(false);

    const [hide, setHide] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {

            setFinish(true);

        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    const handleEnter = () => {

        if (!finish) return;

        setHide(true);

        setTimeout(() => {

            onEnter();

        }, 800);

    };

    return (

        <div
            className={`loading-screen ${hide ? "hide" : ""}`}
            onClick={handleEnter}
        >

            <div className="main-container">

                <div className="loader">

                    <svg
                        viewBox="0 0 800 500"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <defs>

                            <linearGradient
                                id="chipGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop offset="0%" stopColor="#2d2d2d" />

                                <stop offset="100%" stopColor="#0f0f0f" />

                            </linearGradient>

                            <linearGradient
                                id="textGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >

                                <stop offset="0%" stopColor="#eeeeee" />

                                <stop offset="100%" stopColor="#888888" />

                            </linearGradient>

                            <linearGradient
                                id="pinGradient"
                                x1="1"
                                y1="0"
                                x2="0"
                                y2="0"
                            >

                                <stop offset="0%" stopColor="#bbbbbb" />

                                <stop offset="50%" stopColor="#888888" />

                                <stop offset="100%" stopColor="#555555" />

                            </linearGradient>

                        </defs>

                        <g id="traces">

                            <path
                                d="M100 100 H200 V210 H326"
                                className="trace-bg"
                            />

                            <path
                                d="M100 100 H200 V210 H326"
                                className="trace-flow blue2"
                            />

                            <path
                                d="M80 180 H180 V230 H326"
                                className="trace-bg"
                            />

                            <path
                                d="M80 180 H180 V230 H326"
                                className="trace-flow blue"
                            />

                            <path
                                d="M60 260 H150 V250 H326"
                                className="trace-bg"
                            />

                            <path
                                d="M60 260 H150 V250 H326"
                                className="trace-flow blue2"
                            />

                            <path
                                d="M100 350 H200 V270 H326"
                                className="trace-bg"
                            />

                            <path
                                d="M100 350 H200 V270 H326"
                                className="trace-flow blue"
                            />

                            <path
                                d="M700 90 H560 V210 H474"
                                className="trace-bg"
                            />

                            <path
                                d="M700 90 H560 V210 H474"
                                className="trace-flow blue"
                            />

                            <path
                                d="M740 160 H580 V230 H474"
                                className="trace-bg"
                            />

                            <path
                                d="M740 160 H580 V230 H474"
                                className="trace-flow blue2"
                            />

                            <path
                                d="M720 250 H590 V250 H474"
                                className="trace-bg"
                            />

                            <path
                                d="M720 250 H590 V250 H474"
                                className="trace-flow blue"
                            />

                            <path
                                d="M680 340 H570 V270 H474"
                                className="trace-bg"
                            />

                            <path
                                d="M680 340 H570 V270 H474"
                                className="trace-flow blue2"
                            />

                        </g>

                        <rect
                            x="315"
                            y="180"
                            width="170"
                            height="120"
                            rx="20"
                            ry="20"
                            fill="url(#chipGradient)"
                            stroke="#222"
                            strokeWidth="3"
                        />

                        {/* Chân chip bên trái */}
                        <g>

                            <rect x="317" y="205" width="8" height="10" fill="url(#pinGradient)" rx="2" />
                            <rect x="317" y="225" width="8" height="10" fill="url(#pinGradient)" rx="2" />
                            <rect x="317" y="245" width="8" height="10" fill="url(#pinGradient)" rx="2" />
                            <rect x="317" y="265" width="8" height="10" fill="url(#pinGradient)" rx="2" />

                        </g>

                        {/* Chân chip bên phải */}
                        <g>

                            <rect x="475" y="205" width="8" height="10" fill="url(#pinGradient)" rx="2" />
                            <rect x="475" y="225" width="8" height="10" fill="url(#pinGradient)" rx="2" />
                            <rect x="475" y="245" width="8" height="10" fill="url(#pinGradient)" rx="2" />
                            <rect x="475" y="265" width="8" height="10" fill="url(#pinGradient)" rx="2" />

                        </g>

                        {/* Chữ Loading / Click */}
                        <text
                            x="400"
                            y="240"
                            className="loading-text"
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {finish ? "Click To Enter" : "Loading..."}
                        </text>

                        {/* Các chấm mạch */}
                        <circle cx="100" cy="100" r="5" fill="black" />
                        <circle cx="80" cy="180" r="5" fill="black" />
                        <circle cx="60" cy="260" r="5" fill="black" />
                        <circle cx="100" cy="350" r="5" fill="black" />

                        <circle cx="700" cy="90" r="5" fill="black" />
                        <circle cx="740" cy="160" r="5" fill="black" />
                        <circle cx="720" cy="250" r="5" fill="black" />
                        <circle cx="680" cy="340" r="5" fill="black" />

                    </svg>

                </div>

            </div>

        </div>

    );

}

export default Loading;