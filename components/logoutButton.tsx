import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST" });
      router.push("/log-in");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutButton;
