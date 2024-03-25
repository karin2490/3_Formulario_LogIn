
import { useState } from 'react';

export function LoginForm({ handleLogin }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const response = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username:username,email: email, password: password }),
          });    
        if (response.ok) {
            handleLogin(); 
            setError('');            
          }else{           
            if (response.status === 400) {
                setError('Usuario o contraseña incorrectos');
              } else {
                setError(response.statusText);
              }
          }
        
      } catch (error) {
        setError('Error: Usuario o contraseña incorrectos');
      } finally {
        setIsLoading(false); 
      }
    };

    if (isLoading) {
        return <div>Loading...</div>;
      }

      if (error) {
        return <div>Error: {error}</div>;
      }
  
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-anton font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Ingresa al sistema
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-2 text-sm font-medium font-serif text-gray-900 dark:text-white">Nombre de usuario:</label>
                                <input 
                                    type="text" 
                                    value={username} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="username" 
                                    required=""
                                    onChange={(e) => setUsername(e.target.value)} />                   
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium font-serif text-gray-900 dark:text-white">Correo electrónico:</label>
                                <input 
                                    type="email" 
                                    value={email} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="name@company.com" 
                                    required=""
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>                       
                            <div>
                                <label className="block mb-2 text-sm font-medium font-serif text-gray-900 dark:text-white">Contraseña:</label>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required=""
                                    />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " required=""/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label className="text-gray-500 dark:text-gray-300 font-anton">Remember me</label>
                                </div>
                                </div>
                            </div>
                    
                    
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar sesión</button>
                            {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                No se encuentra registrado? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Registrarse</a>
                            </p> */}
                           
                        </form>
                       
                            {error && <div className="text-red-600">{error}</div>}
                        
                       
                    </div>
                </div>
            </div>
        </section>
   
    );
  }
  
  