"use client";

import React, { useEffect, useRef } from "react";
import type Quill from "quill";
import "quill/dist/quill.snow.css";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis isi pengumuman di sini...",
  className = "",
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    if (!containerRef.current) return;

    import("quill").then(({ default: Quill }) => {
      if (!isMounted || !containerRef.current) return;

      containerRef.current.innerHTML = "";
      const editorDiv = document.createElement("div");
      containerRef.current.appendChild(editorDiv);

      const quill = new Quill(editorDiv, {
        theme: "snow",
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "link", "image"],
            ["clean"],
          ],
        },
      });

      quillRef.current = quill;

      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.on("text-change", () => {
        if (isUpdatingRef.current) return;
        const html = quill.root.innerHTML;
        onChange(html === "<p><br></p>" ? "" : html);
      });
    });

    return () => {
      isMounted = false;
      quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    const currentHtml = quill.root.innerHTML === "<p><br></p>" ? "" : quill.root.innerHTML;
    if (value !== currentHtml) {
      isUpdatingRef.current = true;
      quill.clipboard.dangerouslyPasteHTML(value || "");
      isUpdatingRef.current = false;
    }
  }, [value]);

  return (
    <div className={`rich-text-editor-wrapper rounded border border-zinc-200 bg-white transition focus-within:border-emerald-600 dark:border-zinc-700 dark:bg-zinc-900 ${className}`}>
      <div ref={containerRef} className="min-h-[300px]" />
    </div>
  );
}

export default RichTextEditor;
