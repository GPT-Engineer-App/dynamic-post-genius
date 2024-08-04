import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowBigUp, MessageSquare } from 'lucide-react';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subreddit, setSubreddit] = useState('');
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
    if (title && content && subreddit) {
      generateOgImage();
    }
  }, [title, content, subreddit]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Reddit-style Post</h1>
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Subreddit"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
        />
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
      </div>
      
      <div ref={postRef} className="mt-8 p-6 bg-white rounded-lg shadow-md" style={{ width: '1200px', height: '630px' }}>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded-full mr-2"></div>
          <span className="font-bold text-lg">{subreddit || 'Subreddit'}</span>
        </div>
        <h2 className="text-3xl font-bold mb-4">{title || 'Your post title here'}</h2>
        <p className="text-lg mb-4">{content || 'Your post content here'}</p>
        <div className="flex items-center text-gray-500">
          <ArrowBigUp className="w-6 h-6 mr-1" />
          <span className="mr-4">Vote</span>
          <MessageSquare className="w-6 h-6 mr-1" />
          <span>Comment</span>
        </div>
        <div className="absolute bottom-4 right-4">
          <img src="/favicon.ico" alt="Reddit Logo" className="w-8 h-8" />
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
