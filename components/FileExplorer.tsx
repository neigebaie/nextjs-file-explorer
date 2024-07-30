"use client"

import { useState, useEffect } from 'react';

type File = {
  name: string;
  type: 'file' | 'directory';
};

const FileExplorer: React.FC = () => {
  const [files, setFiles] = useState<File[]>([
    { name: 'Documents', type: 'directory' },
    { name: 'Photos', type: 'directory' },
    { name: 'video.mp4', type: 'file' },
    { name: 'presentation.pptx', type: 'file' }
  ]);

  useEffect(() => {
    fetch('/api/files')
      .then((response) => response.json())
      .then((data) => setFiles([
        { name: 'Documents', type: 'directory' },
        { name: 'Photos', type: 'directory' },
        { name: 'video.mp4', type: 'file' },
        { name: 'presentation.pptx', type: 'file' }
      ]))
      .catch((error) => console.error('Error fetching files:', error));
  }, []);

  return (
    <div>
      <h1>File Explorer</h1>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.type === 'directory' ? '📁' : '📄'} {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
