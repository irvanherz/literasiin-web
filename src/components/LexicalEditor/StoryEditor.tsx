/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { LexicalComposer } from '@lexical/react/LexicalComposer'
import classNames from 'classnames'
import { EditorState, LexicalEditor } from 'lexical'
import { JSX } from 'react'
import StoryEditorComponent from './StoryEditorComponent'
import { SharedAutocompleteContext } from './context/SharedAutocompleteContext'
import { SharedHistoryContext } from './context/SharedHistoryContext'
import StoryEditorNodes from './nodes/StoryEditorNodes'
import DefaultEditorTheme from './themes/DefaultEditorTheme'

export type StoryEditorProps = {
  className?: string
  onReady?: (editor: LexicalEditor) => void
  onChange?: (props: { editorState: EditorState, editor: LexicalEditor, tags: Set<string> }) => void
}

export default function StoryEditor ({ onReady, onChange, className }: StoryEditorProps): JSX.Element {
  const initialConfig = {
    editorState: null,
    namespace: 'story-editor',
    nodes: [...StoryEditorNodes],
    onError: (error: Error) => {
      throw error
    },
    theme: DefaultEditorTheme
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <SharedAutocompleteContext>
          <div className={classNames('editor-shell rounded-t-lg border outline-none focus-within:outline focus-within:outline-slate-300', className)}>
            <StoryEditorComponent onReady={editor => onReady?.(editor)} onChange={props => onChange?.(props)} />
          </div>
        </SharedAutocompleteContext>
      </SharedHistoryContext>
    </LexicalComposer>
  )
}
