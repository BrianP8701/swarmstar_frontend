import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthCheck from '@/hooks/auth/authCheck';

const Index = () => {
    const router = useRouter();
    const isAuthenticated = useAuthCheck();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/spawn');
        } else {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return null;
}

export default Index;
