import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { VehicleList } from "../../components/Table";

export function Home() {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      let token = sessionStorage.getItem("token");
      if (!token) {
        console.log("NAO TEM TOKEN");
        navigate("/login");
      }
      setIsAuthChecked(true);
    };

    handleStorageChange();
  }, [navigate]);

  if (!isAuthChecked) {
    return null; // Não renderiza nada até a verificação de autenticação ser concluída
  }

  return (
    <div>
      <Header />
    </div>
  );
}
