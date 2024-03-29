/* eslint-disable multiline-ternary */
/* eslint-disable camelcase */
/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND
} from '@lexical/list'
// import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode'
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType
} from '@lexical/rich-text'
import {
  $isParentElementRTL, $setBlocksType
} from '@lexical/selection'
import { $isTableNode } from '@lexical/table'
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow, mergeRegister
} from '@lexical/utils'
import type { LexicalEditor } from 'lexical'
import {
  $createParagraphNode,
  // $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND
} from 'lexical'
import { JSX, useCallback, useEffect, useState } from 'react'
import { IS_APPLE } from '../../shared/environment'

// import catTypingGif from '../../images/cat-typing.gif'
// import { $createStickyNode } from '../../nodes/StickyNode'
import DropDown, { DropDownItem } from '../../ui/DropDown'
import { getSelectedNode } from '../../utils/getSelectedNode'
import { sanitizeUrl } from '../../utils/url'
// import { EmbedConfigs } from '../AutoEmbedPlugin'
// import { InsertPollDialog } from '../PollPlugin'
// import { InsertNewTableDialog, InsertTableDialog } from '../TablePlugin'

const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote'
}

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table'
}

function dropDownActiveClass (active: boolean) {
  if (active) return 'active dropdown-item-active'
  else return ''
}

function BlockFormatDropDown ({
  editor,
  blockType,
  rootType,
  disabled = false
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection()
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIconClassName={'icon block-type ' + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style">
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'paragraph')}
        onClick={formatParagraph}>
        <i className="icon paragraph" />
        <span className="text">Normal</span>
      </DropDownItem>
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'h1')}
        onClick={() => formatHeading('h1')}>
        <i className="icon h1" />
        <span className="text">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'h2')}
        onClick={() => formatHeading('h2')}>
        <i className="icon h2" />
        <span className="text">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'h3')}
        onClick={() => formatHeading('h3')}>
        <i className="icon h3" />
        <span className="text">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'bullet')}
        onClick={formatBulletList}>
        <i className="icon bullet-list" />
        <span className="text">Bullet List</span>
      </DropDownItem>
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'number')}
        onClick={formatNumberedList}>
        <i className="icon numbered-list" />
        <span className="text">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        className={'item ' + dropDownActiveClass(blockType === 'quote')}
        onClick={formatQuote}>
        <i className="icon quote" />
        <span className="text">Quote</span>
      </DropDownItem>
    </DropDown>
  )
}

function Divider (): JSX.Element {
  return <div className="divider" />
}

export default function StoryEditorToolbarPlugin (): JSX.Element {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>('paragraph')
  const [rootType, setRootType] =
    useState<keyof typeof rootTypeToRootName>('root')

  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)
  // const [isCode, setIsCode] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isRTL, setIsRTL] = useState(false)
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
            const parent = e.getParent()
            return parent !== null && $isRootOrShadowRoot(parent)
          })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
      setIsStrikethrough(selection.hasFormat('strikethrough'))
      setIsSubscript(selection.hasFormat('subscript'))
      setIsSuperscript(selection.hasFormat('superscript'))
      // setIsCode(selection.hasFormat('code'))
      setIsRTL($isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }

      const tableNode = $findMatchingParent(node, $isTableNode)
      if ($isTableNode(tableNode)) {
        setRootType('table')
      } else {
        setRootType('root')
      }

      if (elementDOM !== null) {
        const type = $isHeadingNode(element)
          ? element.getTag()
          : element.getType()
        if (type in blockTypeToBlockName) {
          setBlockType(type as keyof typeof blockTypeToBlockName)
        }
      }
    }
  }, [activeEditor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar()
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  }, [editor, $updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      )
    )
  }, [$updateToolbar, activeEditor, editor])

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload
        const { code, ctrlKey, metaKey } = event

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault()
          return activeEditor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl('https://')
          )
        }
        return false
      },
      COMMAND_PRIORITY_NORMAL
    )
  }, [activeEditor, isLink])

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor
        const focus = selection.focus
        const nodes = selection.getNodes()

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node
            }

            if (node.__style !== '') {
              node.setStyle('')
            }
            if (node.__format !== 0) {
              node.setFormat(0)
              $getNearestBlockElementAncestorOrThrow(node).setFormat('')
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true)
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat('')
          }
        })
      }
    })
  }, [activeEditor])

  return (
    <div className="toolbar adaptive-scroll rounded-t-lg">
      <button
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
        type="button"
        className="toolbar-item spaced"
        aria-label="Undo">
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
        type="button"
        className="toolbar-item"
        aria-label="Redo">
        <i className="format redo" />
      </button>
      <Divider />
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
            disabled={!isEditable}
            blockType={blockType}
            rootType={rootType}
            editor={editor}
          />
          <Divider />
        </>
      )}
      <>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }}
          className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
          title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
          type="button"
          aria-label={`Format text as bold. Shortcut: ${
              IS_APPLE ? '⌘B' : 'Ctrl+B'
          }`}>
          <i className="format bold" />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }}
          className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
          title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
          type="button"
          aria-label={`Format text as italics. Shortcut: ${
              IS_APPLE ? '⌘I' : 'Ctrl+I'
          }`}>
          <i className="format italic" />
        </button>
        <button
          disabled={!isEditable}
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }}
          className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
          title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
          type="button"
          aria-label={`Format text to underlined. Shortcut: ${
              IS_APPLE ? '⌘U' : 'Ctrl+U'
          }`}>
          <i className="format underline" />
        </button>
        <DropDown
          disabled={!isEditable}
          buttonClassName="toolbar-item spaced"
          buttonLabel=""
          buttonAriaLabel="Formatting options for additional text styles"
          buttonIconClassName="icon dropdown-more">
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(
                FORMAT_TEXT_COMMAND,
                'strikethrough'
              )
            }}
            className={'item ' + dropDownActiveClass(isStrikethrough)}
            title="Strikethrough"
            aria-label="Format text with a strikethrough">
            <i className="icon strikethrough" />
            <span className="text">Strikethrough</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript')
            }}
            className={'item ' + dropDownActiveClass(isSubscript)}
            title="Subscript"
            aria-label="Format text with a subscript">
            <i className="icon subscript" />
            <span className="text">Subscript</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(
                FORMAT_TEXT_COMMAND,
                'superscript'
              )
            }}
            className={'item ' + dropDownActiveClass(isSuperscript)}
            title="Superscript"
            aria-label="Format text with a superscript">
            <i className="icon superscript" />
            <span className="text">Superscript</span>
          </DropDownItem>
          <DropDownItem
            onClick={clearFormatting}
            className="item"
            title="Clear text formatting"
            aria-label="Clear all text formatting">
            <i className="icon clear" />
            <span className="text">Clear Formatting</span>
          </DropDownItem>
        </DropDown>
      </>
      <Divider />
      <DropDown
        disabled={!isEditable}
        buttonLabel="Align"
        buttonIconClassName="icon left-align"
        buttonClassName="toolbar-item spaced alignment"
        buttonAriaLabel="Formatting options for text alignment">
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
          }}
          className="item">
          <i className="icon left-align" />
          <span className="text">Left Align</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
          }}
          className="item">
          <i className="icon center-align" />
          <span className="text">Center Align</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
          }}
          className="item">
          <i className="icon right-align" />
          <span className="text">Right Align</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
          }}
          className="item">
          <i className="icon justify-align" />
          <span className="text">Justify Align</span>
        </DropDownItem>
        <Divider />
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
          }}
          className="item">
          <i className={'icon ' + (isRTL ? 'indent' : 'outdent')} />
          <span className="text">Outdent</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
          }}
          className="item">
          <i className={'icon ' + (isRTL ? 'outdent' : 'indent')} />
          <span className="text">Indent</span>
        </DropDownItem>
      </DropDown>
      <Divider />
      {/* <DropDown
        disabled={!isEditable}
        buttonLabel="Align"
        buttonIconClassName="icon left-align"
        buttonClassName="toolbar-item spaced alignment"
        buttonAriaLabel="Formatting options for text alignment">
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
          }}
          className="item">
          <i className="icon left-align" />
          <span className="text">AI Fix Grammar</span>
        </DropDownItem>
        <DropDownItem
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
          }}
          className="item">
          <i className="icon paraphraser" />
          <span className="text">AI Paraphrase</span>
        </DropDownItem>
      </DropDown> */}
    </div>
  )
}
