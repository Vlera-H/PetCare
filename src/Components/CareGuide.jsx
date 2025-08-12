import React from 'react';
import { Container, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';
import Sidebar from './Sidebar';
import AppNavbar from './AppNavbar';

const CareGuide = () => {
  return (
    <div className="pc-layout">
      <Sidebar />
      <main className="pc-content">
        <div className="pc-header">
          <h3 className="m-0" style={{ color: '#5c4033' }}>Pet Care Guide</h3>
          <AppNavbar />
        </div>

        <Container fluid className="py-2">
          <Alert variant="info" className="mb-3">
            Një udhëzues i thjeshtë dhe praktik për kujdesin ndaj kafshëve shtëpiake. Zgjidh seksionet më poshtë për këshilla të shpejta.
          </Alert>

          <Row className="g-3">
            <Col lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🛁 Larja</Card.Title>
                  <Card.Text>
                    Si t’i lajmë në mënyrë të sigurt dhe pa stres.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Përdorni shampo të përshtatshme për llojin e kafshës.</ListGroup.Item>
                    <ListGroup.Item>Shmangni ujin shumë të nxehtë ose të ftohtë.</ListGroup.Item>
                    <ListGroup.Item>Thani lehtë me peshqir dhe, sipas nevojës, me tharëse në temperaturë të ulët.</ListGroup.Item>
                    <ListGroup.Item>Shmangni kontaktin e shampos me sytë dhe veshët.</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🚶‍♀️ Ecja</Card.Title>
                  <Card.Text>
                    Rutinë e shëndetshme për shëtitje dhe lojëra.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Përshtat kohëzgjatjen sipas moshës dhe racës.</ListGroup.Item>
                    <ListGroup.Item>Përdorni gjithmonë zinxhir ose parzmore të rehatshme.</ListGroup.Item>
                    <ListGroup.Item>Mbani ujë të freskët gjatë ditëve të nxehta.</ListGroup.Item>
                    <ListGroup.Item>Kontrolloni putrat pas ecjes në terrene të ashpra.</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🍽️ Ushqimi</Card.Title>
                  <Card.Text>
                    Balancimi i vakteve dhe porcioneve të duhura.
                  </Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Zgjidh ushqim cilësor të përshtatshëm për moshën.</ListGroup.Item>
                    <ListGroup.Item>Respekto oraret dhe sasinë e rekomanduar.</ListGroup.Item>
                    <ListGroup.Item>Shmang ushqimet e dëmshme si çokollata, qepa, rrushi.</ListGroup.Item>
                    <ListGroup.Item>Siguro ujë të freskët gjatë gjithë ditës.</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-3 mt-1">
            <Col lg={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>🩺 Këshilla të përgjithshme shëndeti</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Vizita të rregullta te veterineri për vaksinime dhe kontroll.</ListGroup.Item>
                    <ListGroup.Item>Ruan peshën e shëndetshme me aktivitet dhe dietë të balancuar.</ListGroup.Item>
                    <ListGroup.Item>Mbaj kalendar për trajtimet antiparazitare.</ListGroup.Item>
                    <ListGroup.Item>Vëzhgo ndryshimet në sjellje dhe oreks.</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>💡 Truke praktike</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Përdor shpërblime të vogla për trajnime pozitive.</ListGroup.Item>
                    <ListGroup.Item>Krijo një hapësirë të qetë për pushim.</ListGroup.Item>
                    <ListGroup.Item>Rrotullo lodrat për të shmangur mërzinë.</ListGroup.Item>
                    <ListGroup.Item>Përshtat rutinën me ritmin e kafshës tënde.</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default CareGuide;