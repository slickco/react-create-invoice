import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CHeader, CHeaderBrand, CCollapse, CHeaderToggler, CNavItem, CContainer, CHeaderNav, CDropdown, CDropdownToggle, CDropdownItem, CDropdownDivider, CNavLink, CDropdownMenu, CForm, CFormInput, CButton } from '@coreui/bootstrap-react';

export default function InvoiceHeader () {
  const [visible, setVisible] = useState(false)
  return (
  <>
    <header>
      <CContainer fluid>
        {/* <CHeaderBrand href="#">Header</CHeaderBrand> */}
        {/* <CHeaderToggler onClick={() => setVisible(!visible)} /> */}
        <CCollapse className="header-collapse" visible={visible}>
          <nav>
            <CNavItem>
              <CNavLink href="#" active>
                Home
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Link</CNavLink>
            </CNavItem>
            <CDropdown variant="nav-item">
              <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Action</CDropdownItem>
                <CDropdownItem href="#">Another action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Something else here</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CNavItem>
              <CNavLink href="#" disabled>
                Disabled
              </CNavLink>
            </CNavItem>
          </nav>
          <CForm className="d-flex">
            <CFormInput className="me-2" type="search" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
        </CCollapse>
      </CContainer>
    </header>
  </>
)

}