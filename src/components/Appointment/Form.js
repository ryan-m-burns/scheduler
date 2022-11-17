import React, { useState } from 'react';
import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = props => {
  const {
    onCancel,
    onSave,
    interviewers
  } = props;
  // set state
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // reset form
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  // cancel action
  const cancel = () => {
    reset();
    onCancel();
  };

  // validate that name is entered and interviewer is selected
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }

    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event => setStudent(event.target.value))}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;