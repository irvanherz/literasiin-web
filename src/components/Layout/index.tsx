import LayoutBlank from './LayoutBlank'
import LayoutChatbox from './LayoutChatbox'
import LayoutDefault from './LayoutDefault'
import LayoutScaffold from './LayoutScaffold'

type LayoutType = typeof LayoutDefault & {
  Default: typeof LayoutDefault,
  Blank: typeof LayoutBlank
  Scaffold: typeof LayoutScaffold
  Chatbox: typeof LayoutChatbox
}

const Layout: LayoutType = LayoutDefault as LayoutType

Layout.Default = LayoutDefault
Layout.Blank = LayoutBlank
Layout.Scaffold = LayoutScaffold
Layout.Chatbox = LayoutChatbox

export default Layout
