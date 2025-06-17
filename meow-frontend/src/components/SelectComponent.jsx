import { useState } from "react"

function SelectComponent({ statusFilter,setStatusFilter }) {
    return (
        <div>
            <select name="status" id="status" className="statusSelector" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value) }} >
                <option value="0">To Watch</option>
                <option value="1">Watching</option>
                <option value="2">Watched</option>
            </select>
        </div>
    )
}

export default SelectComponent