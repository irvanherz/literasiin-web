/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
// import LexicalClickableLinkPlugin from '@lexical/react/LexicalClickableLinkPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
// import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
// import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
// import useLexicalEditable from '@lexical/react/useLexicalEditable'
import { JSX, useEffect, useState } from 'react'
import { CAN_USE_DOM } from './shared/canUseDOM'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState, LexicalEditor } from 'lexical'
import { useSharedHistoryContext } from './context/SharedHistoryContext'
import './index.scss'
import AutocompletePlugin from './plugins/AutocompletePlugin'
import ComponentPickerPlugin from './plugins/ComponentPickerPlugin'
import DragDropPaste from './plugins/DragDropPastePlugin'
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin'
import EmojiPickerPlugin from './plugins/EmojiPickerPlugin'
import EmojisPlugin from './plugins/EmojisPlugin'
import StoryEditorFloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin/StoryEditorFloatingTextFormatToolbarPlugin'
import KeywordsPlugin from './plugins/KeywordsPlugin'
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin'
import { MaxLengthPlugin } from './plugins/MaxLengthPlugin'
import StoryEditorToolbarPlugin from './plugins/ToolbarPlugin/StoryEditorToolbarPlugin'
import ContentEditable from './ui/ContentEditable'
import Placeholder from './ui/Placeholder'

export type StoryEditorComponentProps = {
  onReady: (editor: LexicalEditor) => void
  onChange: (props: { editorState: EditorState, editor: LexicalEditor, tags: Set<string> }) => void
}
export default function StoryEditorComponent ({ onReady, onChange }: StoryEditorComponentProps): JSX.Element {
  // const currentUser = useCurrentUser()
  const { historyState } = useSharedHistoryContext()
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)
  const [isSmallWidthViewport, setIsSmallWidthViewport] = useState<boolean>(false)
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    onReady(editor)
  }, [editor])

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem)
    }
  }

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport)
      }
    }
    updateViewPortWidth()
    window.addEventListener('resize', updateViewPortWidth)

    return () => {
      window.removeEventListener('resize', updateViewPortWidth)
    }
  }, [isSmallWidthViewport])

  const handleChange = (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => {
    onChange({ editor, editorState, tags })
  }

  return (
    <>
      <StoryEditorToolbarPlugin />
      <div
        className='editor-container tree-view'>
        <MaxLengthPlugin maxLength={100000} />
        <DragDropPaste />
        <AutoFocusPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <EmojisPlugin />
        <KeywordsPlugin />
        {/* <CollaborationPlugin
          id="main"
          username={currentUser?.username || 'User'}
          providerFactory={(id, yjsDocMap) => {
            const doc = new Y.Doc()
            yjsDocMap.set(id, doc)

            console.log(id, yjsDocMap)

            const provider = new WebsocketProvider(
              'ws://localhost:7778',
              id,
              doc
            )

            return provider as any
          }}
          shouldBootstrap={true}
        /> */}
        <HistoryPlugin externalHistoryState={historyState} />
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor" ref={onRef}>
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={<Placeholder>Input your story...</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        {floatingAnchorElem && !isSmallWidthViewport && (
          <>
            <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            <StoryEditorFloatingTextFormatToolbarPlugin anchorElem={floatingAnchorElem} />
          </>
        )}
        <AutocompletePlugin />
        <OnChangePlugin onChange={handleChange} ignoreSelectionChange ignoreHistoryMergeTagChange />
      </div>
    </>
  )
}
