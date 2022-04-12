import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { BenfordsLaw } from 'benfordslaw';
import './App.css';

function App() {
  const [benfordScore, setBenfordScore] = useState();
  const encoder = new TextEncoder()

  function handleSubmit(values) {
    const { story } = values;
    const textArray = [...encoder.encode(story)];
    const benfords = new BenfordsLaw(textArray);
    const probability = benfords.getProbability()
    setBenfordScore(probability);
  }

  return (
    <div className="App">
      <Formik
        initialValues={{
          story: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="story" className='story-label'>Tell me something</label>
          <Field id="story" name="story" placeholder="Enter your text here" as="textarea" className='story-text' />
          <button type="submit" className='story-submit'>Submit</button>
        </Form>
      </Formik>
      {benfordScore && (
        <div>
          <div>score: {benfordScore}</div>
          <div>probably: {benfordScore >= 0.9 ? 'true story' : 'fiction'}</div>
        </div>
        )}
    </div>
  );
}

export default App;
