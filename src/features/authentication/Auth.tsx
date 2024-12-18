import { useState } from "react";
import authBg from "../../data/img/bg-2.jpg";
import LoginForm from "./LoginForm.tsx";
import SignupForm from "./SignupForm.tsx";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col w-full min-h-[100vh] justify-center items-center bg-gray-800 gap-4">
      <div
        className="flex flex-col justify-center items-center w-[60%] h-[600px] bg-cover bg-center bg-no-repeat border border-red-600 rounded-xl gap-4"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <span
          className="Protest+Revolution text-[16px] text-gray-700 font-extrabold p-2 border border-gray-700 rounded-lg"
          style={{ fontFamily: "Syncopate" }}
        >
          Shopping List
        </span>
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
      <div className="flex items-center text-white">
        <p>
          {isLogin
            ? "Need an account? sign up"
            : "Already have an account? log in"}
        </p>
        <span
          onClick={handleLogin}
          className="text-[#ff9928] px-1 cursor-pointer hover:underline"
        >
          here.
        </span>
      </div>
    </div>
  );
};

export default Auth;
