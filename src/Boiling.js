import React from "react";
import './Boiling.css'

export const Boiling = ({celsius}) => {
    if (celsius >= 100) {
        return <p className="hot">Кипение и пар</p>
    }
    if (celsius <= 0) {
        return <p className="cold">Вода замерзла</p>
    }
    return <p className="liquid">Вода жидкая</p>
}
