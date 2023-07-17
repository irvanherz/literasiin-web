/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import classNames from 'classnames'
import useThemeContext from 'hooks/useThemeContext'
import { EditorState, LexicalEditor } from 'lexical'
import { JSX } from 'react'
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext'
import { SharedHistoryContext } from './context/SharedHistoryContext'
import StoryEditorNodes from './nodes/StoryEditorNodes'
import StoryEditorComponent from './StoryEditorComponent'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'

export type StoryEditorProps = {
  onReady?: (editor: LexicalEditor) => void
  onChange?: (props: { editorState: EditorState, editor: LexicalEditor, tags: Set<string> }) => void
}

export default function StoryEditor ({ onReady, onChange }: StoryEditorProps): JSX.Element {
  const initialConfig = {
    editorState: null,
    namespace: 'story-editor',
    nodes: [...StoryEditorNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme
  }

  const { theme } = useThemeContext()

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <SharedAutocompleteContext>
          <div className={classNames('editor-shell', `editor-shell-theme-${theme}`)}>
            <StoryEditorComponent onReady={editor => onReady?.(editor)} onChange={props => onChange?.(props)} />
          </div>
        </SharedAutocompleteContext>
      </SharedHistoryContext>
    </LexicalComposer>
  )
}
