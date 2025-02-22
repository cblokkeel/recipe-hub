export default defineAppConfig({
    ui: {
        primary: "hitpink",
        gray: "neutral",
        strategy: "merge",
        button: {
            color: {
                primary: {
                    solid: "dark:bg-gradient-to-b dark:from-primary-400 dark:to-primary-500 dark:border dark:border-primary-600 dark:text-white dark:shadow-light dark:hover:from-primary-500 dark:hover:to-primary-600 dark:hover:border-primary-700 dark:active:from-primary-700 dark:active:to-primary-800 dark:active:border-primary-900"
                },
                red: {
                    solid: "dark:bg-gradient-to-b dark:from-red-600 dark:to-red-700 dark:border dark:border-red-800 dark:text-white dark:shadow-light dark:hover:from-red-700 dark:hover:to-red-800 dark:hover:border-red-900 dark:active:from-red-800 dark:active:to-red-900 dark:active:border-red-950"
                }
            }
        }
    }
})
