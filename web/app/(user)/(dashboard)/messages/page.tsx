export default function MessagesPage() {
  return (
    <div className="hidden lg:flex flex-col h-full justify-center items-center p-5 border-t border-info">
      <h1 className="text-4xl font-bold text-primary">Select a chat</h1>
      <p className="text-left text-xl text-accent">
        Choose from your existing messages, or start a new one.
      </p>
    </div>
  );
}
