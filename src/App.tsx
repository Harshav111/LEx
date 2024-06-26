/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { Box } from '@chakra-ui/react'; // Using Chakra UI Box

import ExampleTheme from './ExampleTheme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import HtmlToDocx from './HtmlToDocx';
import FileImport from './FileImport';
import HtmlEditor from './HtmlEditor';

function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

const App: React.FC = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {/* <TreeViewPlugin /> */}
        </div>
        {/* Additional Components */}
        <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
          <HtmlToDocx />
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
          <FileImport onFileLoad={(content) => console.log('File content loaded:', content)} />
        </Box>
        <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
          <HtmlEditor initialContent="<p>Initial HTML content</p>" />
        </Box>
      </div>
    </LexicalComposer>
  );
};

export default App;
