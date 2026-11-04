"use client";

import { useEditor, useEditorState, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export default function OpportunityEditor({ value, onChange }) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[240px] w-full px-4 py-3 outline-none",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isHeading: editor?.isActive("heading", { level: 2 }) ?? false,
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,
      isLink: editor?.isActive("link") ?? false,
      isParagraph: editor?.isActive("paragraph") ?? false,
      isH3: editor?.isActive("heading", { level: 3 }) ?? false,
    }),
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-md border border-gray-300">
      <div className="sticky top-0 z-20 flex flex-wrap gap-2 rounded-t-md border-b border-gray-200 bg-white p-3 shadow-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded border px-3 py-1 text-sm font-bold ${
            editorState?.isBold
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded border px-3 py-1 text-sm font-bold ${
            editorState?.isItalic
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`rounded border px-3 py-1 text-sm ${
            editorState?.isParagraph
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          Paragraph
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`rounded border px-3 py-1 text-sm ${
            editorState?.isHeading
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`rounded border px-3 py-1 text-sm ${
            editorState?.isH3
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          H3
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`rounded border px-3 py-1 text-sm ${
            editorState?.isBulletList
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          Bullet List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`rounded border px-3 py-1 text-sm ${
            editorState?.isOrderedList
              ? "border-blue-700 bg-blue-50 text-blue-700"
              : "border-gray-300 text-gray-700"
          }`}
        >
          Numbered List
        </button>

        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter the link URL:");

            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="rounded border px-3 py-1 text-sm"
        >
          Link
        </button>

        <button
          type="button"
          disabled={!editorState?.isLink}
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={`rounded border px-3 py-1 text-sm ${
            editorState?.isLink
              ? "border-gray-300 text-gray-700"
              : "cursor-not-allowed border-gray-200 text-gray-400"
          }`}
        >
          Remove Link
        </button>

        <button
          type="button"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Undo
        </button>

        <button
          type="button"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Redo
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
