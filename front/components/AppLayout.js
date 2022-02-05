import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return(
    <Container>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>Jinu ERP</Navbar.Brand>
          <Nav className="me-auto">
            <Link href="/">
              <Nav.Link>재고현황</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>재고관리</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>입출고현황</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>입고</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>출고</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>제품목록관리</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>거래처</Nav.Link>
            </Link>
            <Link href="/">
              <Nav.Link>거래처관리</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Navbar.Text>@@@님</Navbar.Text>
            <Navbar.Text>로그아웃</Navbar.Text>
          </Nav>
        </Container>
      </Navbar>
      { children }
    </Container>
  )
}

export default AppLayout;