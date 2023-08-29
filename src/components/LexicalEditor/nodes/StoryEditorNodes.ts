/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { Klass, LexicalNode } from 'lexical'

import { ListItemNode, ListNode } from '@lexical/list'
// import { MarkNode } from '@lexical/mark'
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'

import { AutocompleteNode } from './AutocompleteNode'
import { EmojiNode } from './EmojiNode'
import { KeywordNode } from './KeywordNode'
// import { MentionNode } from './MentionNode'

const StoryEditorNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  // CodeNode,
  // NewTableNode,
  // TableNode,
  // TableCellNode,
  // TableRowNode,
  // HashtagNode,
  // CodeHighlightNode,
  // AutoLinkNode,
  // LinkNode,
  // OverflowNode,
  // PollNode,
  // StickyNode,
  // ImageNode,
  // MentionNode,
  EmojiNode,
  // ExcalidrawNode,
  // EquationNode,
  AutocompleteNode,
  KeywordNode,
  HorizontalRuleNode
  // TweetNode,
  // YouTubeNode,
  // FigmaNode,
  // MarkNode
  // CollapsibleContainerNode,
  // CollapsibleContentNode,
  // CollapsibleTitleNode
]

export default StoryEditorNodes
