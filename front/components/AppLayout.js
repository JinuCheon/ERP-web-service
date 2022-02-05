import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return(
    <Container>
      <Navbar bg="light" variant="light">
        <Container>
          <Link href="/"><Navbar.Brand>Jinu ERP</Navbar.Brand></Link>
          <Nav className="me-auto">
            <Link href="/statistics">
              <Nav.Link>재고현황</Nav.Link>
            </Link>
            <Link href="/inventoryManage">
              <Nav.Link>재고관리</Nav.Link>
            </Link>
            <Link href="/receivingShippingManage">
              <Nav.Link>입출고현황</Nav.Link>
            </Link>
            <Link href="/receiving">
              <Nav.Link>입고</Nav.Link>
            </Link>
            <Link href="/shipping">
              <Nav.Link>출고</Nav.Link>
            </Link>
            <Link href="/product">
              <Nav.Link>제품목록관리</Nav.Link>
            </Link>
            <Link href="/customer">
              <Nav.Link>거래처</Nav.Link>
            </Link>
            <Link href="/customerManage">
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