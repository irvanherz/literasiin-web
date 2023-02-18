import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'

const StyledPageWidthAdapter = styled(PageWidthAdapter)`
.footer-wrapper {
  padding: 32px 0;
  text-align: center;
}
`
export default function Footer () {
  return (
    <StyledPageWidthAdapter className="adapter">
      <div className="footer-wrapper">Copyright &copy; 2023. Literasiin.com</div>
    </StyledPageWidthAdapter>
  )
}
