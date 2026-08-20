import { useEffect, useState } from "react";

function ProfileEffect() {
    const [effects, setEffects] = useState([]);

    useEffect(() => {
        const loadEffect = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/profile-effect"
                );

                const data = await response.json();

                if (!data.success) {
                    console.error(
                        "Không lấy được Profile Effect:",
                        data.error
                    );
                    return;
                }

                setEffects(data.effects || []);

            } catch (error) {
                console.error(
                    "Lỗi khi lấy Profile Effect:",
                    error
                );
            }
        };

        loadEffect();
    }, []);

    return (
        <div className="profile-effect">
            {effects.map((effect, index) => (
                <EffectLayer
                    key={`${effect.src}-${index}`}
                    effect={effect}
                />
            ))}
        </div>
    );
}

function EffectLayer({ effect }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let startTimer;
        let hideTimer;
        let loopTimer;

        const runEffect = () => {
            setVisible(true);

            hideTimer = setTimeout(() => {
                setVisible(false);

                if (effect.loop) {
                    loopTimer = setTimeout(() => {
                        runEffect();
                    }, effect.loopDelay || 0);
                }
            }, effect.duration);
        };

        startTimer = setTimeout(() => {
            runEffect();
        }, effect.start || 0);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(hideTimer);
            clearTimeout(loopTimer);
        };
    }, [effect]);

    if (!visible) {
        return null;
    }

    return (
        <img
            className="profile-effect-layer"
            src={effect.src}
            alt=""
            style={{
                zIndex: effect.zIndex
            }}
        />
    );
}

export default ProfileEffect;