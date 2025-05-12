'use client'

import { CSSProperties } from 'react'
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "100px auto"
}

export default function Loading() {
    return (
        <ClipLoader
            color="#3b82f6"
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    )
}   