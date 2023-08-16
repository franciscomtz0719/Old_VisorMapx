import React, { Fragment } from "react";
import "./Notificacion.css";

const Notificacion = ({ titulo, mensaje }) => {
  return (
    <Fragment>
      <div
        class="position-fixed bottom-0 right-0 p-3"
        style="z-index: 5; right: 0; bottom: 0;"
      >
        <div
          id="liveToast"
          class="toast hide"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-delay="2000"
        >
          <div class="toast-header">
            <img src="..." class="rounded mr-2" alt="..." />
            <strong class="mr-auto">{titulo}</strong>

            <button
              type="button"
              class="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">{mensaje}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Notificacion;
