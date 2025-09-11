
import { useEffect, useState } from "react"
import { FaSun, FaMoon } from "react-icons/fa"

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("system") // "light" | "dark" | "system"

  // set initial theme from localStorage or system
  useEffect(() => {
    const saved = localStorage.getItem("az-theme") || "system"
    setTheme(saved)
  }, [])

  // apply theme to <html> and persist
  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = theme === "dark" || (theme === "system" && prefersDark)

    root.classList.toggle("dark", isDark)
    localStorage.setItem("az-theme", theme)
  }, [theme])

  const next = () => {
    // cycle: system -> light -> dark -> system
    setTheme((t) => (t === "system" ? "light" : t === "light" ? "dark" : "system"))
  }

  const Icon = theme === "dark" ? FaMoon : theme === "light" ? FaSun : ( // system icon hint
    // show Sun if system=light, Moon if system=dark
    (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? FaMoon : FaSun
  )

  const label =
    theme === "system" ? "Toggle theme (system)" :
    theme === "light"  ? "Switch to dark" :
                         "Switch to system"

  return (
    <button
      onClick={next}
      aria-label={label}
      title={label}
      className={`p-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition ${className}`}
    >
      <Icon className="w-5 h-5" />
    </button>
  )
}
