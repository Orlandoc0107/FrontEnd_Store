"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("username");
  const [password, setPassword] = useState<string>("password");
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(","));
      setIsRegistrationSuccessful(false);
    } else {
      setIsRegistrationSuccessful(true);
    }
  };

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={isRegistrationSuccessful} // Bloquea el input si el registro fue exitoso
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isRegistrationSuccessful} // Bloquea el input si el registro fue exitoso
            />
          </div>
          <div>
            <button type="submit" disabled={isRegistrationSuccessful}>
              Ingresar
            </button>
          </div>
        </form>
        {isRegistrationSuccessful && (
          <div>
            <p>Ingreso exitosamente.</p>
            <button onClick={handleRedirect}>Ingresar</button>
          </div>
        )}
        {errors && errors.length > 0 && (
          <div>
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;