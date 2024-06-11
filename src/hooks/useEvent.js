import { useEffect } from "react";

export default function useEvent(e, handler, passive=false) {
    useEffect(() => {
        window.addEventListener(e, handler, passive);

        return function cleanUp() {
            window.removeEventListener(e, handler, passive);
        }
    });
}