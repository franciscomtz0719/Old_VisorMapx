import React from 'react'
import {
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

const Page404 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">404</h1>
              <h4 className="pt-3">Oh! Lo sentimos.</h4>
              <p className="text-muted float-left">No se encontró la página que busca.</p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Page404
