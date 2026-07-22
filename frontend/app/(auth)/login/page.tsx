import AuthLayout from "@/components/auth/auth-layout";
import Logo from "@/components/common/logo";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
    return (
        <AuthLayout>
            <div className="flex flex-col items-center">
                <Logo />
                <LoginForm />
            </div>
        </AuthLayout>
    );
}