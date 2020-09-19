import React from 'react'
import LoadingIcon from '../loadingIcon/LoadingIcon'

import './loadingOverlay.css'

export default function LoadingOverlay({messages}) {

  return <div className={"LoadingOverlay"}>
      <div className={"LoadingOverlayMessagesContainer"}>
        <div className={"LoadingOverlayLoadingIcon"}>
          <LoadingIcon />
        </div>
          {messages.map((m,i) =>
            <p key={i}>
              {m}
            </p>
          )}
      </div>
    </div>

}
