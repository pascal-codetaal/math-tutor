import { Suspense, lazy } from "react";
import { ClientOnly } from "remix-utils/client-only";
import { Tldraw } from "@tldraw/tldraw";


const Editor = lazy(() => import("../components/tldraw"));

export default function OrbitTlDraw() {
    return <Suspense><Editor /></Suspense>;
}