import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST" });
      router.replace("/log-in");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <button
      className="fixed flex items-center justify-center px-4 py-2 text-xl font-bold transition-colors border-transparent border-none shadow-xl cursor-pointer rounded-3xl top-5 right-5 bg-butter-yellow hover:bg-butter-red text-butter-red hover:text-butter-yellow"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
