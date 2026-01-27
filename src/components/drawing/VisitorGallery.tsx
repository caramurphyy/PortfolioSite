import { useEffect, useState } from 'react';
import { getDrawings } from '@/lib/supabase';

interface Drawing {
  id: string;
  svg_data: string;
  artist_name: string;
  created_at: string;
}

function VisitorGallery() {
  const [drawings, setDrawings] = useState<Drawing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrawings = async () => {
      const data = await getDrawings();
      setDrawings(data);
      setLoading(false);
    };
    fetchDrawings();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-black">
        Loading visitor drawings...
      </div>
    );
  }

  if (drawings.length === 0) {
    return (
      <div className="text-center py-8 text-black">
        No visitor drawings yet. Be the first to share!
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <style>{`
        .drawing-container svg {
          width: 100% !important;
          height: 100% !important;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
      `}</style>
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 font-['Caveat_Brush',cursive]">
        Visitor Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
        {drawings.map((drawing) => (
          <div
            key={drawing.id}
            className="bg-[#EAE0CC] rounded-xl shadow-md overflow-hidden border-2 border-black"
          >
            <div 
              className="drawing-container aspect-square p-2 flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: drawing.svg_data }}
            />
            <div className="px-3 py-2 bg-[#EAE0CC]">
              <p className="text-sm font-medium text-black truncate">
                by {drawing.artist_name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VisitorGallery;

