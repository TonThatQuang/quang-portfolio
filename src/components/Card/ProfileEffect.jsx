import { useEffect, useState } from "react";

function ProfileEffect() {
    const [effects, setEffects] = useState([]);
    const [showSecondEffect, setShowSecondEffect] = useState(false);

    useEffect(() => {
        const loadEffects = async () => {
            try {
                const response = await fetch(
                    "https://quang-portfolio.onrender.com/profile-effect"
                );

                if (!response.ok) {
                    throw new Error(
                        `Backend trả về ${response.status}`
                    );
                }

                const data = await response.json();

                console.log("Profile Effect:", data);

                if (data.success && data.effects) {
                    setEffects(data.effects);
                }
            } catch (error) {
                console.error(
                    "Không thể tải Profile Effect:",
                    error
                );
            }
        };

        loadEffects();
    }, []);

    useEffect(() => {
        if (effects.length < 2) return;

        const effect = effects[1];

        let startTimer;
        let showTimer;
        let hideTimer;

        const runEffect = () => {
            setShowSecondEffect(true);

            hideTimer = setTimeout(() => {
                setShowSecondEffect(false);

                showTimer = setTimeout(() => {
                    runEffect();
                }, effect.loopDelay || 0);

            }, effect.duration || 0);
        };

        startTimer = setTimeout(() => {
            runEffect();
        }, effect.start || 0);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [effects]);

    if (effects.length === 0) {
        return null;
    }

    return (
        <div className="profile-effect">

            {/* Effect 1 */}
            {effects[0] && (
                <img
                    className="profile-effect-layer"
                    src={effects[0].src}
                    alt=""
                    style={{
                        zIndex: effects[0].zIndex
                    }}
                />
            )}

            {/* Effect 2 */}
            {effects[1] && showSecondEffect && (
                <img
                    className="profile-effect-layer"
                    src={effects[1].src}
                    alt=""
                    style={{
                        zIndex: effects[1].zIndex
                    }}
                />
            )}

        </div>
    );
}

export default ProfileEffect;