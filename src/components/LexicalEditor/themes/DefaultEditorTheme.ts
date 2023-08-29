/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from 'lexical'

import './DefaultEditorTheme.css'

const theme: EditorThemeClasses = {
  blockCursor: 'LiterasiinTheme__blockCursor',
  characterLimit: 'LiterasiinTheme__characterLimit',
  code: 'LiterasiinTheme__code',
  codeHighlight: {
    atrule: 'LiterasiinTheme__tokenAttr',
    attr: 'LiterasiinTheme__tokenAttr',
    boolean: 'LiterasiinTheme__tokenProperty',
    builtin: 'LiterasiinTheme__tokenSelector',
    cdata: 'LiterasiinTheme__tokenComment',
    char: 'LiterasiinTheme__tokenSelector',
    class: 'LiterasiinTheme__tokenFunction',
    'class-name': 'LiterasiinTheme__tokenFunction',
    comment: 'LiterasiinTheme__tokenComment',
    constant: 'LiterasiinTheme__tokenProperty',
    deleted: 'LiterasiinTheme__tokenProperty',
    doctype: 'LiterasiinTheme__tokenComment',
    entity: 'LiterasiinTheme__tokenOperator',
    function: 'LiterasiinTheme__tokenFunction',
    important: 'LiterasiinTheme__tokenVariable',
    inserted: 'LiterasiinTheme__tokenSelector',
    keyword: 'LiterasiinTheme__tokenAttr',
    namespace: 'LiterasiinTheme__tokenVariable',
    number: 'LiterasiinTheme__tokenProperty',
    operator: 'LiterasiinTheme__tokenOperator',
    prolog: 'LiterasiinTheme__tokenComment',
    property: 'LiterasiinTheme__tokenProperty',
    punctuation: 'LiterasiinTheme__tokenPunctuation',
    regex: 'LiterasiinTheme__tokenVariable',
    selector: 'LiterasiinTheme__tokenSelector',
    string: 'LiterasiinTheme__tokenSelector',
    symbol: 'LiterasiinTheme__tokenProperty',
    tag: 'LiterasiinTheme__tokenProperty',
    url: 'LiterasiinTheme__tokenOperator',
    variable: 'LiterasiinTheme__tokenVariable'
  },
  embedBlock: {
    base: 'LiterasiinTheme__embedBlock',
    focus: 'LiterasiinTheme__embedBlockFocus'
  },
  hashtag: 'LiterasiinTheme__hashtag',
  heading: {
    h1: 'LiterasiinTheme__h1',
    h2: 'LiterasiinTheme__h2',
    h3: 'LiterasiinTheme__h3',
    h4: 'LiterasiinTheme__h4',
    h5: 'LiterasiinTheme__h5',
    h6: 'LiterasiinTheme__h6'
  },
  image: 'editor-image',
  indent: 'LiterasiinTheme__indent',
  link: 'LiterasiinTheme__link',
  list: {
    listitem: 'LiterasiinTheme__listItem',
    listitemChecked: 'LiterasiinTheme__listItemChecked',
    listitemUnchecked: 'LiterasiinTheme__listItemUnchecked',
    nested: {
      listitem: 'LiterasiinTheme__nestedListItem'
    },
    olDepth: [
      'LiterasiinTheme__ol1',
      'LiterasiinTheme__ol2',
      'LiterasiinTheme__ol3',
      'LiterasiinTheme__ol4',
      'LiterasiinTheme__ol5'
    ],
    ul: 'LiterasiinTheme__ul'
  },
  ltr: 'LiterasiinTheme__ltr',
  mark: 'LiterasiinTheme__mark',
  markOverlap: 'LiterasiinTheme__markOverlap',
  paragraph: 'LiterasiinTheme__paragraph',
  quote: 'LiterasiinTheme__quote',
  rtl: 'LiterasiinTheme__rtl',
  table: 'LiterasiinTheme__table',
  tableAddColumns: 'LiterasiinTheme__tableAddColumns',
  tableAddRows: 'LiterasiinTheme__tableAddRows',
  tableCell: 'LiterasiinTheme__tableCell',
  tableCellActionButton: 'LiterasiinTheme__tableCellActionButton',
  tableCellActionButtonContainer:
    'LiterasiinTheme__tableCellActionButtonContainer',
  tableCellEditing: 'LiterasiinTheme__tableCellEditing',
  tableCellHeader: 'LiterasiinTheme__tableCellHeader',
  tableCellPrimarySelected: 'LiterasiinTheme__tableCellPrimarySelected',
  tableCellResizer: 'LiterasiinTheme__tableCellResizer',
  tableCellSelected: 'LiterasiinTheme__tableCellSelected',
  tableCellSortedIndicator: 'LiterasiinTheme__tableCellSortedIndicator',
  tableResizeRuler: 'LiterasiinTheme__tableCellResizeRuler',
  tableSelected: 'LiterasiinTheme__tableSelected',
  text: {
    bold: 'LiterasiinTheme__textBold',
    code: 'LiterasiinTheme__textCode',
    italic: 'LiterasiinTheme__textItalic',
    strikethrough: 'LiterasiinTheme__textStrikethrough',
    subscript: 'LiterasiinTheme__textSubscript',
    superscript: 'LiterasiinTheme__textSuperscript',
    underline: 'LiterasiinTheme__textUnderline',
    underlineStrikethrough: 'LiterasiinTheme__textUnderlineStrikethrough'
  }
}

export default theme
