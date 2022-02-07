import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return(
    <Container >
      <Navbar bg="light" variant="light" className="mb-5">
        <Container>
          <Link href="/"><Navbar.Brand>Jinu ERP</Navbar.Brand></Link>
          <Nav className="me-auto">
            <Link href="/statistics" passHref>
              <Nav.Link>통계</Nav.Link>
            </Link>
            <Link href="/inventoryManage" passHref>
              <Nav.Link>재고관리</Nav.Link>
            </Link>
            <Link href="/receivingShippingManage" passHref>
              <Nav.Link>입출고기록</Nav.Link>
            </Link>
            <Link href="/receiving" passHref>
              <Nav.Link>입고</Nav.Link>
            </Link>
            <Link href="/shipping" passHref>
              <Nav.Link>출고</Nav.Link>
            </Link>
            <Link href="/customer" passHref>
              <Nav.Link>거래처</Nav.Link>
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