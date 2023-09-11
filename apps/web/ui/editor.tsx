"use client";

import { useState } from "react";
import { Editor as NovelEditor } from "novel";

export default function Editor() {
  const [saveStatus, setSaveStatus] = useState("Saved");

  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  return (
    <div className="relative w-full max-w-screen-lg">
      <div className="absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {charCount} chars - {wordCount} words - {wordCount / 600} pages | {saveStatus} 
      </div>
      <NovelEditor
        onUpdate={test => {
          console.log(test)
          setSaveStatus("Unsaved");
        }}
        onDebouncedUpdate={()=> {
          setSaveStatus("Saving...");
          // Simulate a delay in saving.

          const content = localStorage.getItem("novel__content");
        // its a json
        const parsed = JSON.parse(content);
          let totalCharCount = 0
          let totalWordCount = 0
          parsed.content.forEach(element => {
            totalCharCount += element?.content?.[0]?.text?.length;
            totalWordCount += element?.content?.[0]?.text?.split(" ")?.length;
          });
          setCharCount(totalCharCount)
          setWordCount(totalWordCount)

          setTimeout(() => {
            setSaveStatus("Saved");
          }, 500);
        }}
      />
    </div>
  );
}
