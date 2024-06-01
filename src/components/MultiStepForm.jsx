import React, { useState } from 'react';
import '../styles/MultiStepForm.css';// Asegúrate de importar el archivo CSS

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div>
      <form id="msform">
        <ul id="progressbar">
          <li className={step === 1 ? 'active' : ''}>Detalles Personales</li>
          <li className={step === 2 ? 'active' : ''}>Create tu cuenta</li>
        </ul>
        <fieldset style={{ display: step === 1 ? 'block' : 'none' }}>
          <h2 className="fs-title">Detalles Personales</h2>
          <input type="text" name="fname" placeholder="First Name" />
          <input type="text" name="lname" placeholder="Last Name" />
          <input type="text" name="phone" placeholder="Phone" />
          <input type="text" name="address" placeholder="Address" />
          <input type="button" className="next action-button" value="Next" onClick={nextStep} />
        </fieldset>
        <fieldset style={{ display: step === 2 ? 'block' : 'none' }}>
          <h2 className="fs-title">Create tu cuenta</h2>
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="pass" placeholder="Password" />
          <input type="password" name="cpass" placeholder="Confirm Password" />
          <input type="button" className="previous action-button" value="Previous" onClick={prevStep} />
          <input type="submit" className="submit action-button" value="Submit" />
        </fieldset>
      </form>
    </div>
  );
}

export default MultiStepForm;