import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faEdit,
  faTrash,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Row, Col } from 'react-bootstrap';

function ModelsDashboard({ showUserDashboard, selectedUser }) {
  // Dummy data for demonstration
  const models = [
    { 
      id: 1, 
      name: 'Customer', 
      status: 'Active', 
      fields: ['name', 'email', 'phone', 'address'],
      description: 'Stores customer information for the e-commerce platform.'
    },
    { 
      id: 2, 
      name: 'Product', 
      status: 'Active', 
      fields: ['title', 'price', 'category', 'in_stock'],
      description: 'Product catalog for the online store with inventory tracking.'
    },
    { 
      id: 3, 
      name: 'Order', 
      status: 'Active', 
      fields: ['customer_id', 'order_date', 'total_amount', 'status'],
      description: 'Tracks customer orders and their status through the fulfillment process.'
    }
  ];

  return (
    <div className="fade-in">
      <div className="d-flex align-items-center mb-4">
        <Button 
          variant="link" 
          className="text-primary p-0 me-3"
          onClick={showUserDashboard}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <h2 className="fs-4 fw-bold mb-0">Models for {selectedUser}</h2>
      </div>

      <Row xs={1} md={3} className="g-4">
        {models.map(model => (
          <Col key={model.id}>
            <Card className="model-card h-100 border">
              <Card.Header className="bg-light border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="fs-5 fw-semibold mb-0">{model.name}</h3>
                  <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2">
                    {model.status}
                  </span>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <h4 className="text-secondary small fw-medium mb-2">Fields</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {model.fields.map(field => (
                      <span 
                        key={field} 
                        className="badge bg-light text-secondary rounded small"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-secondary small fw-medium mb-2">Description</h4>
                  <p className="small text-secondary mb-0">{model.description}</p>
                </div>
              </Card.Body>
              <Card.Footer className="bg-light d-flex justify-content-end gap-2">
                <Button variant="link" className="text-primary p-0">
                  <FontAwesomeIcon icon={faEdit} className="me-1" /> Edit
                </Button>
                <Button variant="link" className="text-danger p-0">
                  <FontAwesomeIcon icon={faTrash} className="me-1" /> Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

        {/* Add New Model Card */}
        <Col>
          <Card className="model-card h-100 border border-dashed border-2">
            <Card.Body className="d-flex align-items-center justify-content-center text-center p-4">
              <div>
                <div className="icon-bg bg-primary bg-opacity-10 mx-auto mb-3">
                  <FontAwesomeIcon icon={faPlus} className="text-primary" size="lg" />
                </div>
                <h3 className="fs-5 fw-medium text-dark mb-2">Add New Model</h3>
                <p className="text-secondary small mb-0">Create a new data model</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ModelsDashboard;