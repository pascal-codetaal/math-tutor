import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import "@tldraw/tldraw/ui.css";
const sceneWidth = 200;
const sceneHeight = 200;


export default function TlDrawEditor() {

    return (
        <>
            <div style={{ width: sceneWidth, height: sceneHeight }}>
                <Tldraw />
            </div>

        </>
    );
}