import React from "react";
import {
  ModalHeader,
  ModalBody,
  Input,
  Form,
  FormGroup,
  Label,
  Button
} from "reactstrap";

const JoinWaitlist = ({
  product,
  email,
  name,
  waiting,
  handleInputChange,
  handleJoinWaitlistSubmit,
  toggleModal
}) => (
  <>
    <ModalHeader toggle={toggleModal}>
      Join waitlist for {dog.dogName}
    </ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="youremail@email.com"
          />
        </FormGroup>
        {waiting && (
          <Button color="success" disabled>
            Please wait...
          </Button>
        )}
        {!waiting && (
          <Button
            type="submit"
            color="success"
            onClick={handleJoinWaitlistSubmit}
          >
            Join Waitlist
          </Button>
        )}
      </Form>
    </ModalBody>
  </>
);

export default JoinWaitlist;
