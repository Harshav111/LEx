import React, { useState, ChangeEvent } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';

interface HtmlEditorProps {
  initialContent: string;
}

const HtmlEditor: React.FC<HtmlEditorProps> = ({ initialContent }) => {
  const [htmlContent, setHtmlContent] = useState<string>(initialContent);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
  };

  const handleExport = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'exported.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Textarea
        value={htmlContent}
        onChange={handleTextChange}
        rows={10}
        placeholder="Edit HTML content here..."
        mb={4}
      />
      <Button onClick={handleExport} colorScheme="blue">
        Export as HTML
      </Button>
    </Box>
  );
};

export default HtmlEditor;
