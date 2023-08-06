"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (input.length < 30) setError(false);
  }, [input]);

  const submit = async () => {
    // Check if input character count is greater than 30
    if (input.length > 30) {
      return setError(true);
    }

    setLoading(true);
    // Send input to server
    try {
      const res = await fetch("/api/marketing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const suggestion = await res.json();
      const { result } = suggestion;
      setSuggestion(result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl py-12">
      <h2 className="text-center text-2xl font-bold">
        Marketing Copy Generator
      </h2>
      {/* Input field for marketing copy */}
      <div className="mx-auto mt-6 flex w-1/3 flex-col justify-center gap-4">
        <div className="relative w-full">
          {/* Error message if input is greater than 30 characters */}
          {error && (
            <p className="text-sm text-red-500">Character limit exceeded</p>
          )}
          {/* Textarea for input */}
          <textarea
            rows={3}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full resize-none rounded-lg border-2 border-gray-300 p-4 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Enter your topic here..."
          />
          {/* Character count/limit in the bottom right of textarea */}
          <div
            className={`absolute ${
              input.length > 30 ? "text-red-500" : "text-gray-400"
            } bottom-2 right-2 text-xs`}
          >
            <span>{input.length}</span>/30
          </div>
        </div>
        <button
          type="button"
          onClick={submit}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-4">
              <p>Loading...</p>
              <svg
                className="h-6 w-6 animate-spin text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-65"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>
          ) : (
            "Generate"
          )}
        </button>
        {/* Output field for marketing copy */}
        {suggestion && (
          <div className="mt-8">
            <h4 className="py-2 text-lg font-semibold">Your marketing copy:</h4>
            <div className="relative w-full rounded-md bg-gray-100 p-4">
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
