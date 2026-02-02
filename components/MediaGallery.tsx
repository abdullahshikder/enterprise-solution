
import React from 'react';

const MediaGallery: React.FC = () => {
  const images = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/${i + 50}/300/300`,
    name: `product_img_${i + 1}.jpg`,
    size: '1.2 MB'
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Media Gallery</h2>
          <p className="text-sm text-gray-500">Manage all your product assets in one place.</p>
        </div>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 flex items-center gap-2">
          <i className="fa-solid fa-cloud-arrow-up"></i> Upload Media
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img) => (
          <div key={img.id} className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-50">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-2">
              <div className="text-[10px] font-medium text-gray-900 truncate">{img.name}</div>
              <div className="text-[9px] text-gray-400">{img.size}</div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <button className="w-6 h-6 bg-white shadow-sm rounded border flex items-center justify-center text-gray-400 hover:text-red-600">
                <i className="fa-solid fa-trash-can text-[10px]"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
