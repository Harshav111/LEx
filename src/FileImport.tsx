import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';

interface FileImportProps {
  onFileLoad: (content: string) => void;
}

const FileImport: React.FC<FileImportProps> = ({ onFileLoad }) => {
  const [fileContent, setFileContent] = useState<string>('');
  const [showContent, setShowContent] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        setFileContent(fileContent);
        setFileName(file.name);
        onFileLoad(fileContent);
      };
      reader.readAsText(file);
    }
  };

  const handleToggleContent = () => {
    setShowContent((prevShowContent) => !prevShowContent);
  };

  const handleConvertToHtml = () => {
    const blob = new Blob([fileContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'converted.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRemoveFile = () => {
    setFileContent('');
    setFileName('');
    onFileLoad('');
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Input type="file" accept=".txt" onChange={handleFileChange} mb={4} />
      <Button onClick={handleToggleContent} colorScheme="blue" mr={2}>
        {showContent ? 'Hide Content' : 'Show Content'}
      </Button>
      <Button onClick={handleConvertToHtml} colorScheme="green" mr={2} disabled={!fileContent}>
        Convert to HTML
      </Button>
      <Button onClick={handleRemoveFile} colorScheme="red" disabled={!fileContent}>
        Remove File
      </Button>
      {fileName && <Text mt={2}>Uploaded File: {fileName}</Text>}
      {showContent && (
        <Box
          mt={4}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          dangerouslySetInnerHTML={{ __html: fileContent }}
        />
      )}
    </Box>
  );
};

export default FileImport;
