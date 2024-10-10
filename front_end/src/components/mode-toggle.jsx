import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme,theme } = useTheme()

  return (
        <Button className=" rounded-full text-sm focus:ring-2 focus:ring-white" onClick={() => setTheme()} size="icon">
        {
            theme === "light" ?
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            :
                <Moon className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        }
        </Button>
  )
}
// import { useEffect, useState } from 'react';
// import '@/App.css'
// export  function ModeToggle() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const currentTheme = localStorage.getItem('theme') || 'light';
//     setIsDarkMode(currentTheme === 'dark');
//   }, []);

//   const handleToggle = () => {
//     const newTheme = isDarkMode ? 'light' : 'dark';
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.classList.toggle('dark', newTheme === 'dark');
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <div className="toggle-switch" onClick={handleToggle}>
//       <div className={`switch ${isDarkMode ? 'dark' : 'light'}`}>
//         <span className="icon">{isDarkMode ? <Moon/> : <Sun/>}</span>
//       </div>
//     </div>
//   );
// }
