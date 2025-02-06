import { useState } from 'react'
import {Excalidraw} from "@excalidraw/excalidraw"

function Whiteboard() {
  return(
    <>
      <div style={{ height: "100vh" }}>
        <Excalidraw/>     
      </div>
    </>
  )
}

export default Whiteboard;
