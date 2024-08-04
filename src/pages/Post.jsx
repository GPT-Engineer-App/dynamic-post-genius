import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [ogImage, setOgImage] = useState('');
  const postRef = useRef(null);

  const generateOgImage = async () => {
    if (postRef.current) {
      const dataUrl = await toPng(postRef.current, { width: 1200, height: 630 });
      setOgImage(dataUrl);
      
      // Add og:image meta tag
      const metaTag = document.createElement('meta');
      metaTag.setAttribute('property', 'og:image');
      metaTag.content = dataUrl;
      document.getElementsByTagName('head')[0].appendChild(metaTag);
    }
  };

  useEffect(() => {
    if (title && content) {
      generateOgImage();
    }
  }, [title, content, image]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      
      <div ref={postRef} className="mt-8 p-6 bg-white rounded-lg shadow-md" style={{ width: '1200px', height: '630px' }}>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-4">{content.slice(0, 100)}...</p>
        {image && <img src={image} alt="Post" className="w-full h-64 object-cover rounded" />}
        <div className="absolute bottom-4 left-4">
          <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
          <span className="ml-2 text-sm">Your Brand</span>
        </div>
      </div>
      
      {ogImage && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Generated OG Image:</h3>
          <img src={ogImage} alt="OG Image" className="w-full" />
        </div>
      )}
    </div>
  );
};

export default Post;
