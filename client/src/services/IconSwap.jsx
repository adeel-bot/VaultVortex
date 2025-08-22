export default function IconSwap({ lightIcon, darkIcon, theme, size = 20, alt = "" }) {
  return (
    <div
      className={`relative flex justify-center items-center `}
      style={{ height: size, width: size }}
    >
      <img
        src={lightIcon}
        alt={alt}
        className={`absolute top-0 left-0 w-[19px] h-[19px] md:w-full md:h-full ${
          theme ? "opacity-100" : "opacity-0"
        }`}
      />

      <img
        src={darkIcon}
        alt={alt}
        className={`absolute top-0 left-0 w-[19px] h-[19px] md:w-full md:h-full ${
          theme ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
