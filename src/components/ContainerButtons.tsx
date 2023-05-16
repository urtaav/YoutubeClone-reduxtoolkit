import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeTheme } from '../store/theme/ThemeSlice';
import { BsFillLaptopFill, BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ContainerButtons = () => {

    const themeValue = useAppSelector((state) => state.themeApp.theme);
    const htmlDoc = document.documentElement;
    const themeSystem = window.matchMedia("(prefers-color-scheme: dark)");


    // if (themeValue === "light") {
    //     htmlDoc.classList.remove("dark");
    //     localStorage.theme = "light";
    // }
    // if (themeValue === "dark") {
    //     htmlDoc.classList.add("dark");
    //     localStorage.theme = "dark";
    // }
    // if (themeValue === "system") {
    //     localStorage.removeItem("theme");
    //     if (!("theme" in localStorage) && themeSystem.matches) {
    //         htmlDoc.classList.add("dark");
    //     } else {
    //         htmlDoc.classList.remove("dark");
    //     }
    // }

    if (themeValue === "light") {
        htmlDoc.classList.remove("dark");
        localStorage.theme = "light";
    } else if (themeValue === "dark") {
        htmlDoc.classList.add("dark");
        localStorage.theme = "dark";
    } else if (themeValue === "system") {
        localStorage.removeItem("theme");
        if (!("theme" in localStorage) && themeSystem.matches) {
            htmlDoc.classList.add("dark");
        } else {
            htmlDoc.classList.remove("dark");
        }
    }

    // const changeSystemDark = (e) => {
    //     if (!("theme" in localStorage)) {
    //         if (e.matches) {
    //             htmlDoc.classList.add("dark");
    //         } else {
    //             htmlDoc.classList.remove("dark");
    //         }
    //     }
    // };

    const changeSystemDark = (e) => {
        if (!localStorage.hasOwnProperty("theme")) {
            htmlDoc.classList.toggle("dark", e.matches);
        }
    };

    useEffect(() => {
        themeSystem.addEventListener("change", changeSystemDark);
        return () => {
            window.removeEventListener("change", changeSystemDark);
        };
    }, [themeValue]);

    return (
        <div className='flex gap-5'>
            <Button />
        </div>
    )
}

const Button = () => {
    const dispatch = useAppDispatch();
    const themeValue = useAppSelector((state) => state.themeApp.theme);
    return (
        <>
            {
                themeValue === 'dark' ? <BsFillSunFill

                    className={`text-gray-600 dark:text-white ${themeValue === 'dark' ? "border-sky-400" : ""}`}
                    onClick={() => dispatch(changeTheme('light'))} />
                    :
                    <BsFillMoonFill
                        className={`text-gray-600 dark:text-white ${themeValue === 'light' ? "border-sky-400 " : ""}`}
                        onClick={() => dispatch(changeTheme('dark'))} />
            }

            <BsFillLaptopFill
                className={`text-gray-600 dark:text-white ${themeValue === 'system' ? "border-sky-400" : ""}`}
                onClick={() => dispatch(changeTheme('system'))} />
        </>

    );
};
export default ContainerButtons;
