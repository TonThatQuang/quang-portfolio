require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3001;

const PROFILE_EFFECT_SKU =
    process.env.DISCORD_PROFILE_EFFECT_SKU;

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Discord Presence Server đang chạy!"
    });
});

app.get("/profile-effect", async (req, res) => {
    try {
        const response = await fetch(
            `https://discord.com/api/v9/collectibles-products/${PROFILE_EFFECT_SKU}`
        );

        if (!response.ok) {
            throw new Error(
                `Discord API trả về ${response.status}`
            );
        }

        const data = await response.json();

        const effects = data?.items?.[0]?.effects || [];

        res.json({
            success: true,
            sku_id: PROFILE_EFFECT_SKU,
            name: data.name,
            effects
        });

    } catch (error) {
        console.error("Profile Effect Error:", error);

        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `Server đang chạy tại http://localhost:${PORT}`
    );
});