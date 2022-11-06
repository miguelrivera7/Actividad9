import React, { useState, useRef } from "react";

const FormConverter = (props) => {
  const [converter, setConverter] = useState({});

  const dollarInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const dollarInputValue = dollarInputRef.current.value;

    let ws = new WebSocket("wss://stream.binance.com:9443/ws/btcbusd@trade");

    ws.onmessage = (event) => {
      let stockObject = JSON.parse(event.data);
      setConverter({
        bitcoinValue: stockObject.p,
        dollarToBitcoin: dollarInputValue / stockObject.p,
        dollarToColones: 609.77 * dollarInputValue,
      });
    };
  };

  return (
    <div className="container">
      <h5>
        Ingresa una cantidad en dólares y convierte esa cantidad en Bitcoin y
        Colones Salvadoreños.
      </h5>
      <div className="row">
        <form onSubmit={submitHandler}>
          <div className="container col-md-5" id="conversor">
            <div className="col-md-12">
              <label htmlFor="dolares">Cantidad en dólares ($): </label>
              <input
                type="text"
                className="form-control"
                name="dolares"
                id="dolares"
                ref={dollarInputRef}
              ></input>
            </div>
            <br></br>
            <div className="col-md-12 text-center">
              <button
                type="submit"
                className="btn btn-success text-center"
                id="convertir"
              >
                Convertir
              </button>
            </div>
            <hr></hr>
            <div className="col-md-12">
              <label htmlFor="bitcoin">Cantidad en Bitcoin (฿): </label>
              <input
                type="text"
                className="form-control"
                name="bitcoin"
                id="bitcoin"
                value={converter.dollarToBitcoin}
                readOnly
              ></input>
            </div>
            <br></br>
            <div className="col-md-12">
              <label htmlFor="colones">Cantidad en Colones (₡): </label>
              <input
                type="text"
                className="form-control"
                name="colones"
                id="colones"
                value={converter.dollarToColones}
                readOnly
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormConverter;
