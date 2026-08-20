function Banner() {
    return (
        <div className="banner">
            <video
                className="banner-video"
                autoPlay
                muted
                loop
                playsInline
            >
               <source src="/img/chill1.mp4" type="video/mp4" />
            </video>
        </div>
    );
}

export default Banner;