import { useEffect, useRef, useState } from 'react';
import {Editor, Color4} from 'js-draw';
import 'js-draw/styles';
import { saveDrawing } from '@/lib/supabase';
import VisitorGallery from './VisitorGallery';

function DrawingCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [shareStatus, setShareStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [artistName, setArtistName] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing content
    containerRef.current.innerHTML = '';
    
    const editor = new Editor(containerRef.current);
    editorRef.current = editor;
    
    editor.dispatch(
        editor.setBackgroundStyle({
          color: Color4.fromString('#EAE0CC'),
        })
    );
    
    const toolbar = editor.addToolbar();
    
    // Add save button to download drawing as SVG
    toolbar.addSaveButton(() => {
      const svgElem = editor.toSVG();
      const svgData = svgElem.outerHTML;
      const blob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `thanks-for-visiting-caras-portfolio.svg`;
      link.click();
      
      URL.revokeObjectURL(url);
    });

    const addToHistory = false;
    editor.dispatch(editor.image.setAutoresizeEnabled(true), addToHistory);
    editor.dispatch(editor.setBackgroundStyle({ autoresize: true }), addToHistory);

    // Add resize observer to handle dynamic resizing
    const resizeObserver = new ResizeObserver(() => {
      // Trigger window resize event to make js-draw recalculate
      window.dispatchEvent(new Event('resize'));
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      // Clean up the editor and resize observer on unmount
      resizeObserver.disconnect();
      containerRef.current?.replaceChildren();
      editorRef.current = null;
    };
  }, []);

  const handleShareClick = () => {
    if (!editorRef.current) return;
    setShowNamePrompt(true);
  };

  const handleShareToGallery = async () => {
    if (!editorRef.current || !artistName.trim()) return;
    
    setShowNamePrompt(false);
    setShareStatus('saving');
    const svgElem = editorRef.current.toSVG();
    const svgData = svgElem.outerHTML;
    
    const result = await saveDrawing(svgData, artistName.trim());
    
    if (result && !('error' in result)) {
      setShareStatus('saved');
      setArtistName('');
      setTimeout(() => setShareStatus('idle'), 3000);
    } else {
      setShareStatus('error');
      if (result && 'error' in result) {
        alert(result.error);
      }
      setTimeout(() => setShareStatus('idle'), 3000);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 md:p-16 gap-4">
      <style>{`
        .imageEditorContainer {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
      <div 
        ref={containerRef} 
        className="w-full max-w-4xl h-[70vh] rounded-2xl shadow-2xl overflow-hidden"
      />
      <button
        onClick={handleShareClick}
        disabled={shareStatus === 'saving'}
        className="px-6 py-3 bg-[#EC573F] text-white rounded-full font-semibold hover:bg-[#d94a34] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {shareStatus === 'idle' && '✨ Share to Visitor Gallery'}
        {shareStatus === 'saving' && 'Saving...'}
        {shareStatus === 'saved' && '✓ Shared! Thank you!'}
        {shareStatus === 'error' && '✗ Error - try again'}
      </button>

      {/* Name Prompt Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#EAE0CC] rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Sign your artwork!</h3>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#EC573F]"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && artistName.trim() && handleShareToGallery()}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNamePrompt(false)}
                className="bg-white flex-1 px-4 py-2 border rounded-lg hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleShareToGallery}
                disabled={!artistName.trim()}
                className="flex-1 px-4 py-2 bg-[#EC573F] text-white rounded-lg hover:bg-[#d94a34] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Visitor Gallery */}
      <div className="w-full mt-8 pt-8">
        <VisitorGallery key={shareStatus === 'saved' ? Date.now() : 'gallery'} />
      </div>
    </div>
  );
}

export default DrawingCanvas;

