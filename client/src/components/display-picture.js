import { h, html } from "sinuous";
import { Modal } from "./modal";

// $FlowFixMe: ignore until proper inference for css files
import './display-picture.css'

type DisplayPictureProps = {
  src: string,
  size: string,
  popup: boolean
}

const displayPictureHandleClick = event => {
  document.body.appendChild(
    html`
      <${Modal}
        slot=${html`
          <${DisplayPicture}
            src=${event.target.src}
            size="50vmin"
            popup=${false}
          />
        `}
      />
    `
  );
};
export const DisplayPicture = ({
    src,
    size = "50px",
    popup = true
  }: DisplayPictureProps = {}
) => {
  return html`
    <img
      class="DisplayPicture"
      src=${src}
      style=${({
        width: size,
        height: size
      })}
      onclick=${popup ? displayPictureHandleClick : () => {}}
    />
  `;
}
