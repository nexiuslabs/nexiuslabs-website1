import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import { FontSize } from '../extensions/FontSize';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import { ImageUpload } from './ImageUpload';
import { TableDialog } from './TableDialog';
import type { Article } from '../types/database';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Type,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Save,
  Table as TableIcon,
  Youtube as YoutubeIcon,
  Highlighter,
  Type as FontIcon,
  X,
} from 'lucide-react';

const FONT_FAMILIES = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Helvetica', value: 'Helvetica' },
  { label: 'Georgia', value: 'Georgia' },
];

const FONT_SIZES = [
  { label: 'Small', value: '12px' },
  { label: 'Normal', value: '16px' },
  { label: 'Large', value: '20px' },
  { label: 'Huge', value: '24px' },
];

const COLORS = [
  '#000000', // Black
  '#FF0000', // Red
  '#00FF00', // Green
  '#0000FF', // Blue
  '#FFFF00', // Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
];

const HIGHLIGHT_COLORS = [
  '#FFEB3B', // Yellow
  '#4CAF50', // Green
  '#2196F3', // Blue
  '#F44336', // Red
  '#9C27B0', // Purple
];

interface ArticleEditorProps {
  onSave: (data: {
    title: string;
    description: string;
    content: string;
    featuredImage: string;
  }) => void;
  article?: Article | null;
  onCancel: () => void;
}

export function ArticleEditor({ onSave, article, onCancel }: ArticleEditorProps) {
  const [title, setTitle] = useState(article?.title || '');
  const [description, setDescription] = useState(article?.description || '');
  const [featuredImage, setFeaturedImage] = useState(article?.featured_image || '');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showYoutubeDialog, setShowYoutubeDialog] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [showTableDialog, setShowTableDialog] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Highlight.configure({ multicolor: true }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-gray-300',
        },
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-gray-300 p-2 bg-gray-100 font-bold',
        },
      }),
      Youtube,
    ],
    content: article?.content || '',
  });

  const handleSave = () => {
    if (!editor) return;
    
    onSave({
      title,
      description,
      content: editor.getHTML(),
      featuredImage,
    });
  };

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  const insertYoutubeVideo = () => {
    if (!editor || !youtubeUrl) return;
    
    editor.commands.setYoutubeVideo({
      src: youtubeUrl,
      width: 640,
      height: 480,
    });
    
    setYoutubeUrl('');
    setShowYoutubeDialog(false);
  };

  const insertTable = (rows: number, cols: number, withHeader: boolean, borderStyle: string) => {
    if (!editor) return;
    
    const borderWidths = {
      thin: '1px',
      medium: '2px',
      thick: '3px'
    }[borderStyle];

    // Create table with proper attributes
    editor.chain().focus().insertTable({
      rows,
      cols,
      withHeaderRow: withHeader,
      HTMLAttributes: {
        class: 'border-collapse',
        style: `border: ${borderWidths} solid #e5e7eb;`
      }
    }).run();

    // Apply styles to cells
    const style = `border: ${borderWidths} solid #e5e7eb; padding: 8px;`;
    
    // Update all cells with proper styling
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'tableCell' || node.type.name === 'tableHeader') {
        editor.chain().setNodeSelection(pos).updateAttributes(node.type.name, {
          style
        }).run();
      }
    });

    // Ensure cursor is inside the first cell
    editor.chain().focus().run();
  };

  const handleFeaturedImageUpload = (imageUrl: string) => {
    setFeaturedImage(imageUrl);
    setShowImageUpload(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          {article ? 'Edit Article' : 'Create New Article'}
        </h2>
        <button
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexius-teal"
          onClick={onCancel}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </button>
      </div>

      {/* Featured Image */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Featured Image</h2>
          <button
            onClick={() => setShowImageUpload(true)}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexius-teal"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Upload Image
          </button>
        </div>
        
        {showImageUpload ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <ImageUpload onUploadComplete={handleFeaturedImageUpload} />
          </div>
        ) : featuredImage ? (
          <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={featuredImage}
              alt="Featured"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nexius-teal focus:border-nexius-teal sm:text-sm"
          placeholder="Enter article title"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-nexius-teal focus:border-nexius-teal sm:text-sm"
          placeholder="Enter article description"
        />
      </div>

      {/* Editor */}
      {editor && (
        <div className="border border-nexius-dark-border rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="bg-nexius-dark-card border-b border-nexius-dark-border p-2 flex flex-wrap gap-1">
            {/* Text Style */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <select
                onChange={(e) => editor?.chain().focus().setFontFamily(e.target.value).run()}
                className="p-2 rounded hover:bg-nexius-dark-surface border border-nexius-dark-border bg-nexius-dark-surface text-nexius-dark-text"
                value={editor.getAttributes('textStyle').fontFamily || ''}
              >
                <option value="">Font Family</option>
                {FONT_FAMILIES.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => editor?.chain().focus().setFontSize(e.target.value).run()}
                className="ml-2 p-2 rounded hover:bg-nexius-dark-surface border border-nexius-dark-border bg-nexius-dark-surface text-nexius-dark-text"
                value={editor.getAttributes('textStyle').fontSize || ''}
              >
                <option value="">Font Size</option>
                {FONT_SIZES.map((size) => (
                  <option key={size.value} value={size.value}>
                    {size.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Text Color */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <div className="relative group">
                <button className="p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text">
                  <FontIcon className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-nexius-dark-surface border border-nexius-dark-border rounded-lg p-2 hidden group-hover:block shadow-lg z-50">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => editor?.chain().focus().setColor(color).run()}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="relative group ml-2">
                <button className="p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text">
                  <Highlighter className="h-4 w-4" />
                </button>
                <div className="absolute top-full left-0 mt-1 bg-nexius-dark-surface border border-nexius-dark-border rounded-lg p-2 hidden group-hover:block shadow-lg z-50">
                  {HIGHLIGHT_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => editor?.chain().focus().toggleHighlight({ color }).run()}
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Basic Formatting */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('bold') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <Bold className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('italic') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <Italic className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('underline') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <UnderlineIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Alignment */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive({ textAlign: 'left' }) ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <AlignLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive({ textAlign: 'center' }) ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <AlignCenter className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive({ textAlign: 'right' }) ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <AlignRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive({ textAlign: 'justify' }) ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <AlignJustify className="h-4 w-4" />
              </button>
            </div>

            {/* Headings */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('paragraph') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <Type className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('heading', { level: 1 }) ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <Heading1 className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('heading', { level: 2 }) ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <Heading2 className="h-4 w-4" />
              </button>
            </div>

            {/* Lists */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('bulletList') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('orderedList') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <ListOrdered className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('blockquote') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <Quote className="h-4 w-4" />
              </button>
            </div>

            {/* Links and Images */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text ${
                  editor.isActive('link') ? 'bg-nexius-dark-surface' : ''
                }`}
              >
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Tables and Media */}
            <div className="flex items-center border-r border-nexius-dark-border pr-2 mr-2">
              <button
                onClick={() => setShowTableDialog(true)}
                className="p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text"
              >
                <TableIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowYoutubeDialog(true)}
                className="p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text"
              >
                <YoutubeIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Undo/Redo */}
            <div className="flex items-center">
              <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className="p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text disabled:opacity-50"
              >
                <Undo className="h-4 w-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className="p-2 rounded hover:bg-nexius-dark-surface text-nexius-dark-text disabled:opacity-50"
              >
                <Redo className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white p-4">
            <EditorContent editor={editor} className="prose max-w-none" />
          </div>
        </div>
      )}
      
      {/* YouTube Dialog */}
      {showYoutubeDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-nexius-dark-surface rounded-lg p-6 max-w-md w-full border border-nexius-dark-border">
            <h3 className="text-lg font-semibold mb-4 text-nexius-dark-text">Insert YouTube Video</h3>
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="w-full px-3 py-2 border border-nexius-dark-border bg-nexius-dark-card text-nexius-dark-text placeholder-nexius-dark-text-muted rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowYoutubeDialog(false)}
                className="px-4 py-2 text-nexius-dark-text-muted hover:bg-nexius-dark-card rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={insertYoutubeVideo}
                className="px-4 py-2 bg-nexius-teal text-white rounded-lg hover:bg-nexius-teal/90"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Table Dialog */}
      {showTableDialog && (
        <TableDialog
          onClose={() => setShowTableDialog(false)}
          onInsert={insertTable}
        />
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-nexius-teal hover:bg-nexius-teal/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nexius-teal"
        >
          <Save className="h-4 w-4 mr-2" />
          {article ? 'Update Article' : 'Save Article'}
        </button>
      </div>
    </div>
  );
}