import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const fetchUrls = async () => {
    const res = await axios.get("http://localhost:5173/api/url");
    setUrls(res.data.urls);
  };

  const createShortUrl = async () => {
    if (!inputValue) return;
    const res = await axios.post("http://localhost:5173/api/url/generate", { url: inputValue });
    setCurrentUrl(res.data.newUrl);
    setInputValue("");
    fetchUrls();
  };

  const deleteUrl = async (code) => {
    await axios.delete(`http://localhost:5173/api/url/${code}`);
    fetchUrls();
  };

  const copyUrl = (code) => {
    navigator.clipboard.writeText(`http://localhost:5173/api/url/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1000);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return (
    <>
    <main className="p-10 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold mb-6">Url Shortner</h1>
      {/* Input */}
      <div className="w-full max-w-4xl p-2 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your URL here..."
          className="border border-gray-300 rounded p-2 flex-1 outline-none"
        />
        <button onClick={createShortUrl} className="px-4 py-2 rounded bg-blue-600 text-white font-medium">
          Generate
        </button>
      </div>

      {/* Generated Banner */}
      {currentUrl && (
        <div className="w-full max-w-4xl p-3 border border-green-300 rounded bg-green-50 flex items-center justify-between">
          <p>
            Generated:{" "}
            <a
              href={`http://localhost:5173/api/url/${currentUrl.uniqueCode}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 underline"
            >
              http://localhost:5173/api/url/{currentUrl.uniqueCode}
            </a>
          </p>
          <button onClick={() => copyUrl(currentUrl.uniqueCode)} className="px-3 py-1 rounded bg-blue-600 text-white">
            {copiedCode === currentUrl.uniqueCode ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* URL List */}
      <div className="w-full max-w-4xl p-2 space-y-2">
        {urls.map((url) => (
          <div key={url._id} className="border border-gray-300 rounded p-3 flex items-center justify-between gap-4">
            <a
              href={`http://localhost:5173/api/url/${url.uniqueCode}`}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 underline"
            >
              {url.uniqueCode}
            </a>
            <p className="truncate flex-1">{url.originalUrl}</p>
            <p>{url.clickCount}</p>
            <button onClick={() => copyUrl(url.uniqueCode)} className="px-3 py-1 rounded bg-blue-600 text-white">
              {copiedCode === url.uniqueCode ? "Copied!" : "Copy"}
            </button>
            <button onClick={() => deleteUrl(url.uniqueCode)} className="px-3 py-1 rounded bg-red-600 text-white">
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
    </>
  );
};

export default App;