import styled from 'styled-components'

const Wrapper = styled.span`
position: relative;
overflow: hidden;
display: block;
width: 100%;
height: 4px;
z-index: 0;
background-color: rgb(167, 202, 237);
@keyframes animation-1 {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes animation-2 {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
.p1 {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transition: transform 0.2s linear;
  transform-origin: left;
  background-color: #1976d2;
  width: auto;
  animation: animation-1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

.p2 {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  transition: transform 0.2s linear;
  transform-origin: left;
  background-color: #1976d2;
  width: auto;
  animation: animation-2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
}
    
`
export default function Loader () {
  return (
    <Wrapper>
      <span className="p1"></span>
      <span className="p2"></span>
    </Wrapper>
  )
}
