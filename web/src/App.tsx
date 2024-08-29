import { Button } from "./components/ui/button";

export default function App() {
  return (
    <>
      <h1>Hello, there</h1>
      <Button onClick={() => alert("Clicked!")}>Click me</Button>
    </>
  );
}
