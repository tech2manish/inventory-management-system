import { Button } from "./ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <header className="w-full py-4 px-6 border-b shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">
          Inventory Manager
        </h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>
          <Button onClick={() => (window.location.href = "/signup")}>
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
            Smart Inventory Management for Your Business
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Manage stock levels, track transactions, and streamline inventory
            processes with our powerful and easy-to-use dashboard.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm border-t mt-10">
        © {new Date().getFullYear()} Inventory Manager. All rights reserved.
      </footer>
    </div>
  );
}
