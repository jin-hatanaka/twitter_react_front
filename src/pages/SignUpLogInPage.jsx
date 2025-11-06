import { useState } from "react";
import LogInButton from "../components/ui/LogInButton";
import Or from "../components/ui/Or";
import SignUpButton from "../components/ui/SignUpButton";
import SocialAuthButton from "../components/ui/SocialAuthButton";
import XLogo from "../components/ui/XLogo";
import SignUpModal from "../components/ui/SignUpModal";
import LogInModal from "../components/ui/LogInModal";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const SignUpLogInPage = () => {
  const [isOpenSignUp, setIsOpenSignUp] = useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex w-2xl items-center justify-center">
        <XLogo size={370} />
      </div>
      <div className="p-9">
        <h1 className="my-12 text-6xl font-bold">すべての話題が、ここに。</h1>
        <h2 className="mb-8 text-3xl font-semibold">今すぐ参加しましょう。</h2>
        <div>
          <div className="flex w-2xs flex-col items-center gap-4">
            <SocialAuthButton icon={<FcGoogle />} label="Googleで登録" />
            <SocialAuthButton
              icon={<FaApple />}
              label="Appleのアカウントで登録"
            />
            <Or />
            <SignUpButton onClick={() => setIsOpenSignUp(true)} />
            <SignUpModal
              isOpen={isOpenSignUp}
              onClose={() => setIsOpenSignUp(false)}
            />
          </div>
          <div className="mt-15">
            <h3 className="mb-5 text-base font-semibold">
              アカウントをお持ちの場合
            </h3>
            <LogInButton onClick={() => setIsOpenLogIn(true)} />
            <LogInModal
              isOpen={isOpenLogIn}
              onClose={() => setIsOpenLogIn(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogInPage;
