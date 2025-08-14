import React from 'react';
import { Container, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './pet.css';

const CareGuide = () => {
  const navigate = useNavigate();
  return (
    <div className="pets-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>Pet Care Guide</h1>

        <div className="pets-canvas">
          <img src="/img/c22.png" alt="" className="corner corner-tr" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <img src="/img/c33.png" alt="" className="corner corner-bl" onError={(e) => { e.currentTarget.style.display = 'none'; }} />

          <div className="pets-center">
  <Alert className="mb-3 text-orange border-0 bg-transparent">
  A friendly, practical guide to everyday pet care. Browse the sections below for quick, useful tips.
</Alert>



            <Row className="g-3">
              <Col lg={4}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src="/img/chatbath.png"
                    alt="Bathing your pet"
                    style={{ objectFit: 'cover', maxHeight: 180 }}
                  />
                  <Card.Body>
                    <Card.Title>🛁 Bathing</Card.Title>
                    <Card.Text>
                      How to bathe safely and keep the experience calm.
                    </Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Use a pet-appropriate shampoo for the species/breed.</ListGroup.Item>
                      <ListGroup.Item>Avoid water that is too hot or too cold.</ListGroup.Item>
                      <ListGroup.Item>Dry gently with a towel; use a low-heat dryer if needed.</ListGroup.Item>
                      <ListGroup.Item>Keep shampoo away from eyes and ears.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="h-100 shadow-sm">
                    <Card.Img
                    variant="top"
                    src="/img/chatwalk.png"
                    alt="Walking your pet"
                    style={{ objectFit: 'cover', maxHeight: 180 }}
                  />
                  <Card.Body>
                    <Card.Title>🚶‍♀️ Walking</Card.Title>
                    <Card.Text>
                      Build a healthy routine for walks and play.
                    </Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Adjust duration by age, health, and breed.</ListGroup.Item>
                      <ListGroup.Item>Use a comfortable leash or harness at all times.</ListGroup.Item>
                      <ListGroup.Item>Bring fresh water on hot days.</ListGroup.Item>
                      <ListGroup.Item>Check paw pads after rough terrain.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="h-100 shadow-sm">
                    <Card.Img
                    variant="top"
                    src="/img/chatfood.png"
                    alt="Feeding your pet"
                    style={{ objectFit: 'cover', maxHeight: 180 }}
                  />
                  <Card.Body>
                    <Card.Title>🍽️ Feeding</Card.Title>
                    <Card.Text>
                      Balance meals and portions the right way.
                    </Card.Text>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Choose quality food suited to your pet's age.</ListGroup.Item>
                      <ListGroup.Item>Stick to consistent schedules and portions.</ListGroup.Item>
                      <ListGroup.Item>Avoid harmful foods like chocolate, onions, and grapes.</ListGroup.Item>
                      <ListGroup.Item>Provide fresh water throughout the day.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="g-3 mt-1">
              <Col lg={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>🩺 General Health Tips</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Schedule regular vet visits for vaccines and check-ups.</ListGroup.Item>
                      <ListGroup.Item>Maintain a healthy weight with activity and balanced diet.</ListGroup.Item>
                      <ListGroup.Item>Track parasite prevention on a calendar.</ListGroup.Item>
                      <ListGroup.Item>Watch for changes in behavior and appetite.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>💡 Handy Tricks</Card.Title>
                    <ListGroup variant="flush">
                      <ListGroup.Item>Use small rewards for positive training.</ListGroup.Item>
                      <ListGroup.Item>Create a quiet, cozy rest spot.</ListGroup.Item>
                      <ListGroup.Item>Rotate toys regularly to prevent boredom.</ListGroup.Item>
                      <ListGroup.Item>Adapt routines to your pet’s natural rhythm.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CareGuide;
