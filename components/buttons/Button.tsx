interface item {
  id: string;
  name: string;
}

interface ButtonProps {
  name: string;
  disabled?: boolean;
  icon?: string;
  theme?: string;
  extraClasses?: string;
  onSelect: () => void;
  items?: item[];
  textClasses?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  name,
  icon,
  items = [],
  onSelect,
  theme = "dafault",
  textClasses = "",
  extraClasses = "justify-between w-fit px-3 py-2 gap-2",
  disabled = false,
  loading = false,
}) => {
  const themes: any = {
    default: ` ${
      disabled
        ? "bg-zinc-500 cursor-not-allowed"
        : "bg-zinc-900 cursor-pointer hover:bg-zinc-800"
    }`,
    delete: `${
      disabled
        ? "bg-200 cursor-not-allowed"
        : "bg-red-600 text-100 cursor-pointer hover:bg-red-700"
    }`,
    ghost: `${
      disabled
        ? "bg-white-200 cursor-not-allowed"
        : "bg-white cursor-pointer hover:bg-gray-50"
    }`,
  };

  const borderTheme: any = {
    default: `border ${disabled ? "border-zinc-500" : "border-zinc-900 hover:border-zinc-800"}`,
    delete: `border ${disabled ? "b-100" : " border-red-600"}`,
    ghost: `border ${disabled ? "b-100" : " border-gray-300"}`,
  };

  const textTheme: any = {
    default: `${disabled ? "text-white" : "text-white"}`,
    delete: `${disabled ? "text-white" : "text-white"}`,
    ghost: `${disabled ? "text-200" : "text-500 group-hover:text-500"}`,
  };

  return (
    <button
      onClick={() => {
        !loading && onSelect();
      }}
      className={`group flex relative items-center rounded-xl ${extraClasses} ${themes[theme]} ${borderTheme[theme]} duration-300 ease-in-out transition-all`}
    >
      <p
        className={`font-medium text-sm ${textClasses} ${textTheme[theme]} ${
          loading ? "opacity-0" : ""
        }`}
      >
        {name}
      </p>
      {loading ? (
        <div className="absolute left-[35%]">
          {/* <Icon name="Loader" fill="#FFF" /> */}
        </div>
      ) : null}
    </button>
  );
};
export default Button;
