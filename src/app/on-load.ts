import { render } from "@youwol/flux-view";
import { AppView } from "./app.view";

document.body.appendChild(
    render(new AppView())
)

