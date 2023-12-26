'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";


const Register = () => {
  const [username, setUsername] = useState<string>("username");
  const [password, setPassword] = useState<string>("password");
  const [message, setMessage] = useState<string | null>(null);
  const [isFormLocked, setIsFormLocked] = useState<boolean>(false); // Nuevo estado para bloquear el formulario

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/administrator/`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseAPI = await res.json();

    if (res.ok) {
      // Registro exitoso, muestra el mensaje y bloquea el formulario
      setMessage("Administrador creado exitosamente.");
      setIsFormLocked(true);
    } else {
      // Manejar otros casos de error aquí si es necesario
      setMessage("Hubo un problema durante el registro.");
    }
  };

  const handleLoginClick = () => {
    // Redirige al usuario a la página de inicio de sesión
    router.push("login");
  };

  return (
    <div className="gap-2">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            placeholder="username"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            disabled={isFormLocked} // Deshabilita el input si el formulario está bloqueado
          />
        </div>
        <div className="gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isFormLocked} // Deshabilita el input si el formulario está bloqueado
          />
        </div>
        <button type="submit" disabled={isFormLocked}>Registrarse</button>
      </form>
      {message && (
        <div className="message">
          <p>{message}</p>
          {isFormLocked && (
            <button onClick={handleLoginClick}>Ir al Login</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;