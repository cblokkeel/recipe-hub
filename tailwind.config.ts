import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                hitpink: {
                    "50": "#fff5ed",
                    "100": "#fee8d6",
                    "200": "#fccdac",
                    "300": "#fab387",
                    "400": "#f67c41",
                    "500": "#f3581c",
                    "600": "#e43f12",
                    "700": "#bd2d11",
                    "800": "#962616",
                    "900": "#792115",
                    "950": "#410e09",
                }
            },
            boxShadow: {
                light: "rgba(255, 255, 255, 0.25) 0px 2px 0px 0px inset, rgba(189, 45, 17, 0.5) 0px 2px 4px 0px",
            }
        }
    },
}
