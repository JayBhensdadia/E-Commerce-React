import React from "react";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/ModeToggle";

const App = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center dark:bg-slate-700">
      <Button> click me</Button>
      <ModeToggle />
    </div>
  );
};

export default App;
