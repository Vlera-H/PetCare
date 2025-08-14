import React from 'react';
import { Container, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './pet.css';
import './careguide.css';

const CareGuide = () => {
  const navigate = useNavigate();
  return (
    <div className="pets-page careguide-page">
      <Container fluid className="py-3 px-0">
        <span className="back-arrow" onClick={() => navigate('/')}>←</span>
        <h1 className="text-center pets-header-title pets-header-large" style={{ marginTop: '0.5rem' }}>Pet Care Guide</h1>

        <div className="pets-canvas">
          <div className="pets-center">
            <Alert className="mb-3 guide-intro">
              A friendly, practical guide to everyday pet care. Browse the sections below for quick, useful tips.
            </Alert>

            <Row className="g-3">
              <Col lg={4}>
                <Card className="h-100 shadow-sm guide-card">
                     <Card.Img
                    variant="top"
                    src="/img/qeni.png"
                    alt="Bathing your pet"
                    style={{ objectFit: 'cover', maxHeight: 180 }}
                  />
                  <Card.Header className="guide-header">Bathing</Card.Header>
               
                  <Card.Body>
                    <Card.Title className="guide-title">🛁 Keep it calm and safe</Card.Title>
                    <ListGroup variant="flush" className="guide-list">
                      <ListGroup.Item>Use species/breed-appropriate shampoo; rinse thoroughly.</ListGroup.Item>
                      <ListGroup.Item>Water should be lukewarm; test on your wrist first.</ListGroup.Item>
                      <ListGroup.Item>Place a non-slip mat to avoid slips in the tub.</ListGroup.Item>
                      <ListGroup.Item>Protect eyes/ears; use cotton balls near ears if recommended.</ListGroup.Item>
                      <ListGroup.Item>Dry with towel; low-heat dryer at a safe distance if needed.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="h-100 shadow-sm guide-card">
                             <Card.Img
               variant="top"
               src="/img/macja2.png"
               alt="Walking your pet"
               style={{ objectFit: 'cover', maxHeight: 180 }}
              />
                  <Card.Header className="guide-header">Walking</Card.Header>
               
                  <Card.Body>
                    <Card.Title className="guide-title">🚶‍♀️ Healthy routine outdoors</Card.Title>
                    <ListGroup variant="flush" className="guide-list">
                      <ListGroup.Item>Match duration to age, health, and breed energy.</ListGroup.Item>
                      <ListGroup.Item>Harness/leash should fit snugly without chafing.</ListGroup.Item>
                      <ListGroup.Item>Bring water and avoid hot pavement at midday.</ListGroup.Item>
                      <ListGroup.Item>Check paws for cuts or debris after rough terrain.</ListGroup.Item>
                      <ListGroup.Item>Use reflective gear for early morning/night walks.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="h-100 shadow-sm guide-card">
                          <Card.Img
               variant="top"
               src="/img/macja.png"
               alt="Feeding your pet"
               style={{ objectFit: 'cover', maxHeight: 180 }}
              />
                  <Card.Header className="guide-header">Feeding</Card.Header>
                  <Card.Body>
                    <Card.Title className="guide-title">🍽️ Balanced meals</Card.Title>
                    <ListGroup variant="flush" className="guide-list">
                      <ListGroup.Item>Choose quality food appropriate to life stage (puppy/kitten, adult, senior).</ListGroup.Item>
                      <ListGroup.Item>Measure portions; follow vet or label guidelines.</ListGroup.Item>
                      <ListGroup.Item>Avoid toxic foods: chocolate, onions/garlic, grapes/raisins, xylitol.</ListGroup.Item>
                      <ListGroup.Item>Offer fresh water at all times; clean bowls daily.</ListGroup.Item>
                      <ListGroup.Item>Introduce new foods gradually over 5–7 days.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row className="g-3 mt-1">
              <Col lg={6}>
                <Card className="h-100 shadow-sm guide-card">
                  <Card.Header className="guide-header">General Health</Card.Header>
                  <Card.Body>
                    <Card.Title className="guide-title">🩺 Everyday wellness</Card.Title>
                    <ListGroup variant="flush" className="guide-list">
                      <ListGroup.Item>Schedule check-ups and vaccinations as advised by your vet.</ListGroup.Item>
                      <ListGroup.Item>Keep parasite prevention (fleas/ticks/heartworm) up to date.</ListGroup.Item>
                      <ListGroup.Item>Monitor weight and body condition; adjust diet and activity.</ListGroup.Item>
                      <ListGroup.Item>Watch for appetite, behavior, or bathroom changes.</ListGroup.Item>
                      <ListGroup.Item>Maintain dental hygiene: brushing or dental chews as recommended.</ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6}>
                <Card className="h-100 shadow-sm guide-card">
                  <Card.Header className="guide-header">Handy Tricks</Card.Header>
                  <Card.Body>
                    <Card.Title className="guide-title">💡 Make life easier</Card.Title>
                    <ListGroup variant="flush" className="guide-list">
                      <ListGroup.Item>Use positive reinforcement with small, frequent rewards.</ListGroup.Item>
                      <ListGroup.Item>Create a cozy, quiet rest area to reduce stress.</ListGroup.Item>
                      <ListGroup.Item>Rotate toys weekly to keep interest high.</ListGroup.Item>
                      <ListGroup.Item>Keep a care journal for meds, symptoms, or routines.</ListGroup.Item>
                      <ListGroup.Item>Adapt daily plans to your pet’s natural rhythm.</ListGroup.Item>
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






























                 <Card.Img
               variant="top"
               src="/img/chatbath.png"
               alt="Bathing your pet"
               style={{ objectFit: 'cover', maxHeight: 180 }}
              />