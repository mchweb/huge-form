import React from "react";
import Base from "../components/_base";
import Card from "../components/Card";
import Button from "../components/Button";
import Link from "../components/Link";
import List from "../components/List";
import NavPanel from "../components/NavPanel";
import { Tabs, Tab } from "../components/Tabs";
import { Container, Row, Col } from "../components/Grid";
import { BaseField, DropdownField } from "../components/Form";

class Showcase extends React.Component {
  constructor() {
    super();
    this.state = { theme: "default" };
  }
  render() {
    return (
      <Base theme={this.state.theme}>
        <Container>
          <Row>
            <Col size={2}>
              <NavPanel>
                <Card title="Navigation">
                  <Link>Link To First Card</Link>
                  <Link>Link To Second Card</Link>
                  <NavPanel.Footer>
                    <Button fluid>Validate</Button>
                    <Button primary fluid>
                      Submit
                    </Button>
                  </NavPanel.Footer>
                </Card>
              </NavPanel>
            </Col>
            <Col size={5}>
              <Card title="Card Example">
                <Tabs defaultTab="tab1" style={{ zIndex: 1000 }}>
                  <Tab label="First Tab" name="tab1">
                    <Card expandable title="Expandable Card">
                      <BaseField label="Card Content" />
                      <BaseField label="More Card Content" />
                    </Card>
                    <BaseField label="Default Field" />
                    <BaseField
                      label="Icon required field"
                      icon="Search"
                      required
                    />
                    <BaseField label="Disabled Field" disabled />
                    <BaseField
                      label="Calendar field with error"
                      icon="Calendar"
                      hasError
                      description="Please fill in this field"
                    />
                    <BaseField
                      label="Disabled Error"
                      icon="Search"
                      disabled
                      hasError
                    />
                    <BaseField
                      label="Field with warning"
                      hasWarning
                      description="This value has been calculated automatically"
                    />
                    <BaseField label="Busy" isBusy />
                    <BaseField label="Dropdown Field" icon="ChevronDown" />
                    <DropdownField
                      label="Theme"
                      options={["default", "dark"]}
                      onChange={item => {
                        this.setState({ theme: item });
                      }}
                    />
                  </Tab>
                  <Tab label="Another Tab" name="tab2">
                    <List items={["One", "Two", "Three"]} />
                  </Tab>
                  <Tab label="Something more" name="tab3">
                    Static content
                  </Tab>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Container>
      </Base>
    );
  }
}

export default Showcase;
