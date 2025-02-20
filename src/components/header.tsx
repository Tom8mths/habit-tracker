import { Moon, Plus, Sun } from "lucide-react";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";
import { useTheme } from "next-themes";

type HeaderProps = {
  onAddTask: () => void;
  onSignIn: () => void;
  isAuthenticated: boolean;
}

export default function Header({ onAddTask, onSignIn, isAuthenticated}: HeaderProps) {
  const { setTheme, theme } = useTheme();

  return (
    <header className="border-b">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Habt</h1>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button
          onClick={onAddTask}
          className="gap-2"
        >
          <Plus className="h-4 w-4" /> Add Task
        </Button>
        { isAuthenticated ?
        <UserMenu /> :
          <Button
            onClick={onSignIn}
            className="gap-2"
            variant="outline"
          >
            Sign in / Sign up
          </Button>
        }
      </div>
    </div>
  </header>
  );
}