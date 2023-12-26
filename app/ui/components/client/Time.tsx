'use client';


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Time() {
  const [timeLeft, setTimeLeft] = useState<number>(60 * 60); 
  const router = useRouter();

  useEffect(() => {
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const intervalId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (!isVisible || prevTimeLeft <= 0) {
          clearInterval(intervalId);
          if (!isVisible) {
            // La página no es visible, cerrar sesión y redirigir
            signOut();
            router.push("/");
          }
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    // Limpiar intervalo y remover event listener al desmontar el componente
    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [router]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div>
      <p>Cierre de Session : {formatTime(timeLeft)}</p>
    </div>
  );
}
