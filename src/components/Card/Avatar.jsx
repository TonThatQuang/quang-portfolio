import { useLanyard } from "use-lanyard";

function Avatar() {

    const discordId = "1201086421449056287";

    const presence = useLanyard(discordId);

    const status = presence?.discord_status ?? "offline";

    // =========================
    // DISCORD USER
    // =========================

    const discordUser = presence?.discord_user;

    const avatar = discordUser?.avatar;

    // =========================
    // DISCORD AVATAR URL
    // =========================

    const avatarUrl = avatar
        ? `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.${avatar.startsWith("a_") ? "gif" : "png"}?size=256`
        : `https://cdn.discordapp.com/embed/avatars/${Number(discordId) % 5}.png`;


    // =========================
    // AVATAR DECORATION
    // =========================

    const decoration =
        discordUser?.avatar_decoration_data;

    const decorationUrl = decoration?.asset
        ? `https://cdn.discordapp.com/avatar-decoration-presets/${decoration.asset}.png`
        : null;


    return (
        <div className="avatar">

            {/* Discord Avatar */}

            <img
                className="avatar-image"
                src={avatarUrl}
                alt={discordUser?.display_name || "Discord avatar"}
            />


            {/* Discord Avatar Decoration */}

            {decorationUrl && (
                <img
                    className="avatar-decoration"
                    src={decorationUrl}
                    alt=""
                />
            )}


            {/* Discord Status */}

            <span
                className={`discord-status ${status}`}
            ></span>

        </div>
    );
}

export default Avatar;