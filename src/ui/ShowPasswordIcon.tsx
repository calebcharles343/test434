import { HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";

interface ShowPasswordIconProps {
  showPassword: boolean;
}

const ShowPasswordIcon: React.FC<ShowPasswordIconProps> = ({
  showPassword,
}) => {
  return <>{!showPassword ? <HiMiniEye /> : <HiMiniEyeSlash />}</>;
};

export default ShowPasswordIcon;
