import { useState } from "react"

function SelectComponent({ setStatusFilter }) {
    const [statusVal, setStatusVal] = useState(0)
    return (
        <div>
            <select name="status" id="status" value={statusVal} onChange={(e) => { setStatusFilter(e.target.value) }} >
                <option value="0">To Watch</option>
                <option value="1">Watching</option>
                <option value="2">Watched</option>
            </select>
        </div>
    )
}

export default SelectComponent