import { useState } from "react";
// import authBg from "../../data/img/bg-2.jpg";
import LoginForm from "./LoginForm.tsx";
import SignupForm from "./SignupForm.tsx";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-800 gap-4">
      <span
        className="Protest+Revolution text-[16px] text-[#ff9928] font-extrabold p-2 border border-[#ff9928] rounded-lg"
        style={{ fontFamily: "Syncopate" }}
      >
        Shopping List
      </span>
      <div
        className=" min-w-full md:min-w-[350px]"
        // style={{ backgroundImage: `url(${authBg})` }}
      >
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
