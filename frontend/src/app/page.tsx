"use client";

import { useEffect, useState } from "react";

export default function Home() {
const [status, setStatus] = useState("Checking...");
const [error, setError] = useState("");

useEffect(() => {
async function checkBackend() {
try {
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    if (!apiUrl) {
      throw new Error("API URL is missing");
    }

    const response = await fetch(apiUrl + "/health");

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const data = await response.json();
    setStatus(data.status);
  } catch (err) {
    setStatus("Connection failed");
    setError(
      err instanceof Error ? err.message : "Unknown error"
    );
  }
}

    checkBackend();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold">Next.js + FastAPI</h1>
      <p>Frontend: Running successfully</p>
      <p>Backend Status: {status}</p>

      {error && <p className="text-red-600">Error: {error}</p>}
    </main>
  );
}
