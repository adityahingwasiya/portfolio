import Script from "next/script";

export function ThemeScript() {
  return (
    <Script id="theme-init" strategy="beforeInteractive">
      {`(function(){try{var t=localStorage.getItem("theme");if(t!=="light")t="dark";document.documentElement.classList.toggle("dark",t==="dark");}catch(e){document.documentElement.classList.add("dark");}})();`}
    </Script>
  );
}
